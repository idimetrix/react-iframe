import { ReactElement } from 'react';
import { createRoot } from 'react-dom/client';

/**
 * Creates and sets up the iframe document structure
 */
export function createIframeDocument(iframeWindow: Window): void {
  const doc = iframeWindow.document;
  
  // Set up basic HTML structure if not already present
  if (!doc.documentElement) {
    doc.open();
    doc.write('<!DOCTYPE html><html><head></head><body></body></html>');
    doc.close();
  }
  
  // Add Tailwind CSS and basic styles for better default appearance
  if (!doc.querySelector('link[data-tailwind]')) {
    // Inject Tailwind CSS via CDN for iframe content
    const tailwindLink = doc.createElement('link');
    tailwindLink.rel = 'stylesheet';
    tailwindLink.href = 'https://cdn.jsdelivr.net/npm/tailwindcss@3.4.1/dist/tailwind.min.css';
    tailwindLink.setAttribute('data-tailwind', 'true');
    doc.head.appendChild(tailwindLink);

    // Add base styles for iframe document
    const style = doc.createElement('style');
    style.textContent = `
      * {
        box-sizing: border-box;
      }
      html {
        margin: 0;
        padding: 0;
        border: 0;
        height: 100%;
        overflow: hidden;
      }
      body {
        margin: 0;
        padding: 0;
        border: 0;
        overflow: hidden;
        font-family: -apple-system, BlinkMacSystemFont, 'Segoe UI', 'Roboto', 'Oxygen',
          'Ubuntu', 'Cantarell', 'Fira Sans', 'Droid Sans', 'Helvetica Neue',
          sans-serif;
        -webkit-font-smoothing: antialiased;
        -moz-osx-font-smoothing: grayscale;
      }
      #react-root {
        margin: 0;
        padding: 0;
      }
    `;
    doc.head.appendChild(style);
  }
}

/**
 * Mounts a React component inside the iframe using the parent's ReactDOM
 * ReactDOM can render into any document's elements, not just the current document
 */
export function mountReactComponent(
  iframeWindow: Window,
  element: ReactElement,
  createRootFn: typeof createRoot
): () => void {
  const doc = iframeWindow.document;
  const container = doc.body;
  
  // Clear previous content
  container.innerHTML = '';
  
  // Create root element
  const rootElement = doc.createElement('div');
  rootElement.id = 'react-root';
  container.appendChild(rootElement);
  
  // Use parent ReactDOM to render into iframe's document
  // This works because ReactDOM can render into any DOM element,
  // regardless of which document it belongs to
  const root = createRootFn(rootElement);
  root.render(element);
  
  return () => {
    root.unmount();
  };
}

/**
 * Gets the scroll height of the iframe content
 * Accounts for margins, padding, and ensures no scrollbars
 */
export function getIframeContentHeight(iframeWindow: Window): number {
  const doc = iframeWindow.document;
  if (!doc || !doc.body) return 0;
  
  const html = doc.documentElement;
  const body = doc.body;
  
  // Get computed styles to account for any margins/padding
  const bodyStyle = iframeWindow.getComputedStyle(body);
  const htmlStyle = iframeWindow.getComputedStyle(html);
  
  // Calculate total height including margins
  const bodyHeight = body.scrollHeight;
  const htmlHeight = html.scrollHeight;
  
  // Account for margins that might affect total height
  const bodyMarginTop = parseFloat(bodyStyle.marginTop) || 0;
  const bodyMarginBottom = parseFloat(bodyStyle.marginBottom) || 0;
  const htmlMarginTop = parseFloat(htmlStyle.marginTop) || 0;
  const htmlMarginBottom = parseFloat(htmlStyle.marginBottom) || 0;
  
  // Calculate total content height
  const bodyTotalHeight = bodyHeight + bodyMarginTop + bodyMarginBottom;
  const htmlTotalHeight = htmlHeight + htmlMarginTop + htmlMarginBottom;
  
  // Use the maximum to ensure we capture all content
  const contentHeight = Math.max(
    bodyTotalHeight,
    htmlTotalHeight,
    body.offsetHeight,
    html.offsetHeight
  );
  
  // Return with a small buffer to prevent scrollbars from appearing
  // Round up to ensure we don't cut off any content
  return Math.ceil(contentHeight);
}

/**
 * Sets up a ResizeObserver to watch for content height changes in the iframe
 */
export function setupAutoHeight(
  iframe: HTMLIFrameElement,
  iframeWindow: Window,
  onHeightChange: (height: number) => void,
  minHeight: number = 0,
  maxHeight?: number
): () => void {
  const doc = iframeWindow.document;
  if (!doc || !doc.body) {
    return () => {};
  }

  let rafId: number | null = null;
  let lastHeight = 0;

  const updateHeight = () => {
    if (!iframe || !iframeWindow) return;
    
    const contentHeight = getIframeContentHeight(iframeWindow);
    let newHeight = Math.max(contentHeight, minHeight);
    
    if (maxHeight !== undefined) {
      newHeight = Math.min(newHeight, maxHeight);
    }
    
    // Only update if height actually changed to avoid infinite loops
    if (Math.abs(newHeight - lastHeight) > 1) {
      lastHeight = newHeight;
      onHeightChange(newHeight);
    }
  };

  // Initial height calculation
  updateHeight();

  // Use ResizeObserver if available
  if (typeof ResizeObserver !== 'undefined') {
    const resizeObserver = new ResizeObserver(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateHeight);
    });

    resizeObserver.observe(doc.body);
    
    // Also observe the root element if it exists
    const rootElement = doc.getElementById('react-root');
    if (rootElement) {
      resizeObserver.observe(rootElement);
    }

    // Fallback: also listen to mutations for cases where ResizeObserver might miss changes
    const mutationObserver = new MutationObserver(() => {
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
      rafId = requestAnimationFrame(updateHeight);
    });

    mutationObserver.observe(doc.body, {
      childList: true,
      subtree: true,
      attributes: true,
      attributeFilter: ['style', 'class'],
    });

    return () => {
      resizeObserver.disconnect();
      mutationObserver.disconnect();
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  } else {
    // Fallback for browsers without ResizeObserver
    const intervalId = setInterval(updateHeight, 100);
    return () => {
      clearInterval(intervalId);
      if (rafId !== null) {
        cancelAnimationFrame(rafId);
      }
    };
  }
}
