import { 
  useRef, 
  useEffect, 
  useCallback, 
  useMemo,
  useState,
  ReactNode, 
  ComponentType,
  memo,
  FC,
  createElement,
  isValidElement,
  SyntheticEvent
} from 'react';
import { createRoot } from 'react-dom/client';
import { ReactIframeProps } from './types';
import { createIframeDocument, mountReactComponent, setupAutoHeight } from './utils';

const ReactIframeComponent: FC<ReactIframeProps> = ({
  component,
  children,
  componentProps,
  onLoad,
  autoHeight = true,
  minHeight = 0,
  maxHeight,
  height,
  style,
  ...iframeProps
}) => {
  const iframeRef = useRef<HTMLIFrameElement>(null);
  const cleanupRef = useRef<(() => void) | null>(null);
  const autoHeightCleanupRef = useRef<(() => void) | null>(null);
  const isMountedRef = useRef(true);
  const [dynamicHeight, setDynamicHeight] = useState<number | undefined>(undefined);

  // Memoize the element to render to avoid unnecessary re-renders
  // Include componentProps in dependencies to ensure updates when props change
  const elementToRender = useMemo<ReactNode>(() => {
    if (component) {
      const Component = component as ComponentType<Record<string, unknown>>;
      return createElement(Component, componentProps || {});
    } else if (children) {
      if (isValidElement(children)) {
        return children;
      } else if (typeof children === 'function') {
        // Handle render prop pattern
        const renderFunction = children as (props: Record<string, unknown>) => ReactNode;
        return renderFunction(componentProps || {});
      } else {
        return children;
      }
    }
    return null;
  }, [component, children, componentProps]);

  // Memoize the onLoad callback to prevent unnecessary re-mounts
  const stableOnLoad = useCallback(
    (event: SyntheticEvent<HTMLIFrameElement, Event>) => {
      if (onLoad) {
        onLoad(event);
      }
    },
    [onLoad]
  );

  // Handle height updates for autoHeight
  const handleHeightChange = useCallback((newHeight: number) => {
    if (isMountedRef.current) {
      setDynamicHeight(newHeight);
    }
  }, []);

  const handleLoad = useCallback(
    (event: SyntheticEvent<HTMLIFrameElement, Event>) => {
      const iframe = iframeRef.current;
      if (!iframe || !isMountedRef.current) return;

      try {
        const iframeWindow = iframe.contentWindow;
        const iframeDocument = iframe.contentDocument;

        if (!iframeWindow || !iframeDocument) {
          console.warn('Cannot access iframe content - may be blocked by CORS or sandbox restrictions');
          stableOnLoad(event);
          return;
        }

        // Set up iframe document
        createIframeDocument(iframeWindow);

        // Check if we have something to render
        if (!elementToRender) {
          console.warn('ReactIframe: No component or children provided');
          stableOnLoad(event);
          return;
        }

        // Clean up previous mount if exists
        if (cleanupRef.current) {
          cleanupRef.current();
          cleanupRef.current = null;
        }

        // Mount React component
        if (isValidElement(elementToRender)) {
          cleanupRef.current = mountReactComponent(
            iframeWindow,
            elementToRender,
            createRoot
          );
        } else {
          console.warn('ReactIframe: Invalid React element to render');
        }

        // Set up auto-height if enabled (default behavior)
        if (autoHeight) {
          // Clean up previous auto-height observer if exists
          if (autoHeightCleanupRef.current) {
            autoHeightCleanupRef.current();
            autoHeightCleanupRef.current = null;
          }

          // Set up auto-height observer
          // Use requestAnimationFrame to ensure DOM is ready, then set up observer
          const setupObserver = () => {
            if (iframe && iframe.contentWindow && isMountedRef.current) {
              autoHeightCleanupRef.current = setupAutoHeight(
                iframe,
                iframeWindow,
                handleHeightChange,
                minHeight,
                maxHeight
              );
            }
          };

          // Try immediately first
          requestAnimationFrame(() => {
            requestAnimationFrame(setupObserver);
          });
        }

        // Call user's onLoad handler
        stableOnLoad(event);
      } catch (error) {
        console.error('ReactIframe: Error mounting component', error);
        stableOnLoad(event);
      }
    },
    [elementToRender, stableOnLoad, autoHeight, minHeight, maxHeight, handleHeightChange]
  );

  // Cleanup on unmount
  useEffect(() => {
    isMountedRef.current = true;
    return () => {
      isMountedRef.current = false;
      if (cleanupRef.current) {
        cleanupRef.current();
        cleanupRef.current = null;
      }
      if (autoHeightCleanupRef.current) {
        autoHeightCleanupRef.current();
        autoHeightCleanupRef.current = null;
      }
    };
  }, []);

  // Re-mount when element changes
  useEffect(() => {
    const iframe = iframeRef.current;
    if (iframe && iframe.contentWindow && iframe.contentDocument && elementToRender) {
      // Only trigger re-render if iframe is already loaded
      if (iframe.contentDocument.readyState === 'complete') {
        handleLoad({} as SyntheticEvent<HTMLIFrameElement, Event>);
      }
    }
  }, [elementToRender, handleLoad]);

  // Handle autoHeight toggle
  useEffect(() => {
    const iframe = iframeRef.current;
    if (!iframe || !iframe.contentWindow || !iframe.contentDocument) return;

    // If autoHeight is disabled, clean up observers and reset dynamic height
    if (!autoHeight) {
      if (autoHeightCleanupRef.current) {
        autoHeightCleanupRef.current();
        autoHeightCleanupRef.current = null;
      }
      setDynamicHeight(undefined);
      return;
    }

    // If autoHeight is enabled and iframe is loaded, set up observer
    if (autoHeight && iframe.contentDocument.readyState === 'complete') {
      // Clean up previous observer if exists
      if (autoHeightCleanupRef.current) {
        autoHeightCleanupRef.current();
        autoHeightCleanupRef.current = null;
      }

      // Set up new observer
      const setupObserver = () => {
        if (iframe && iframe.contentWindow && isMountedRef.current) {
          autoHeightCleanupRef.current = setupAutoHeight(
            iframe,
            iframe.contentWindow,
            handleHeightChange,
            minHeight,
            maxHeight
          );
        }
      };

      requestAnimationFrame(() => {
        requestAnimationFrame(setupObserver);
      });
    }
  }, [autoHeight, minHeight, maxHeight, handleHeightChange]);

  // Determine final height value
  const finalHeight = useMemo(() => {
    if (autoHeight) {
      // Use dynamic height if available, otherwise use minHeight or a default
      if (dynamicHeight !== undefined) {
        return `${dynamicHeight}px`;
      }
      // Use minHeight as initial height while waiting for measurement
      // If height prop is provided, use it as initial value, otherwise use minHeight or default
      return height || (minHeight > 0 ? `${minHeight}px` : '100px');
    }
    // When autoHeight is disabled, use the height prop or undefined
    return height;
  }, [autoHeight, dynamicHeight, height, minHeight]);

  // Merge styles with default border: 0
  const mergedStyle = useMemo(() => {
    const baseStyle = {
      border: 0,
      ...style,
    };

    if (autoHeight) {
      return {
        ...baseStyle,
        height: finalHeight,
        overflow: 'hidden',
      };
    }

    return {
      ...baseStyle,
      height: finalHeight,
      overflow: style?.overflow,
    };
  }, [style, finalHeight, autoHeight]);

  return (
    <iframe
      ref={iframeRef}
      onLoad={handleLoad}
      height={finalHeight}
      style={mergedStyle}
      scrolling={autoHeight ? 'no' : undefined}
      {...iframeProps}
    />
  );
};

// Memoize the component to prevent unnecessary re-renders when props haven't changed
export const ReactIframe = memo(ReactIframeComponent);

ReactIframe.displayName = 'ReactIframe';

export default ReactIframe;
