import { useState, useMemo, useCallback, memo, FC, ChangeEvent } from 'react';
import { ReactIframe } from '@dimetrix/react-iframe';
import Counter from './components/Counter';
import Form from './components/Form';
import StyledBox from './components/StyledBox';
import './index.css';

type ComponentType = 'counter' | 'form' | 'styled';

const App: FC = () => {
  const [selectedComponent, setSelectedComponent] = useState<ComponentType>('counter');
  const [width, setWidth] = useState('100%');
  const [height, setHeight] = useState('400px');
  const [sandbox, setSandbox] = useState('allow-scripts allow-same-origin');
  const [showControls, setShowControls] = useState(true);
  const [autoHeight, setAutoHeight] = useState(true); // Default is now true
  const [minHeight, setMinHeight] = useState('0');
  const [maxHeight, setMaxHeight] = useState('');

  // Memoize component getter to avoid recreating function on every render
  const getComponent = useCallback(() => {
    switch (selectedComponent) {
      case 'counter':
        return Counter;
      case 'form':
        return Form;
      case 'styled':
        return StyledBox;
      default:
        return Counter;
    }
  }, [selectedComponent]);

  // Memoize the component reference
  const ComponentToRender = useMemo(() => getComponent(), [getComponent]);

  // Memoize handlers
  const handleComponentChange = useCallback((e: ChangeEvent<HTMLSelectElement>) => {
    setSelectedComponent(e.target.value as ComponentType);
  }, []);

  const handleWidthChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setWidth(e.target.value);
  }, []);

  const handleHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setHeight(e.target.value);
  }, []);

  const handleSandboxChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setSandbox(e.target.value);
  }, []);

  const handleControlsToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setShowControls(e.target.checked);
  }, []);

  const handleAutoHeightToggle = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setAutoHeight(e.target.checked);
  }, []);

  const handleMinHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMinHeight(e.target.value);
  }, []);

  const handleMaxHeightChange = useCallback((e: ChangeEvent<HTMLInputElement>) => {
    setMaxHeight(e.target.value);
  }, []);

  // Memoize onLoad handler
  const handleIframeLoad = useCallback(() => {
    console.log('Iframe loaded successfully');
  }, []);

  // Memoize iframe style
  const iframeStyle = useMemo(
    () => ({
      border: 'none',
      display: 'block' as const,
    }),
    []
  );

  return (
    <div className="max-w-[1200px] mx-auto p-5 bg-gray-100 min-h-screen">
      <h1 className="text-gray-800 mb-2.5">React Iframe Component Demo</h1>
      <p className="text-gray-600 mb-8">
        This demo showcases the ReactIframe component, which renders React components
        inside an isolated iframe with full support for all standard iframe attributes.
      </p>

      <div className="bg-white rounded-lg p-5 mb-8 shadow-sm">
        <h3 className="mt-0 text-gray-800 mb-4">Configuration Controls</h3>
        <div className="mb-5 p-4 bg-gray-50 rounded space-y-2.5">
          <label className="block mb-2.5 font-medium">
            Component to render:
            <select 
              value={selectedComponent} 
              onChange={handleComponentChange}
              className="ml-2.5 px-2.5 py-1.5 border border-gray-300 rounded"
            >
              <option value="counter">Counter (State Management)</option>
              <option value="form">Form (User Interaction)</option>
              <option value="styled">Styled Box (CSS Isolation)</option>
            </select>
          </label>

          <label className="block mb-2.5 font-medium">
            Width:
            <input
              type="text"
              value={width}
              onChange={handleWidthChange}
              placeholder="e.g., 100%, 500px"
              className="ml-2.5 px-2.5 py-1.5 border border-gray-300 rounded"
            />
          </label>

          <label className="block mb-2.5 font-medium">
            Height:
            <input
              type="text"
              value={height}
              onChange={handleHeightChange}
              placeholder="e.g., 400px, 50vh"
              className="ml-2.5 px-2.5 py-1.5 border border-gray-300 rounded"
            />
          </label>

          <label className="block mb-2.5 font-medium">
            Sandbox attributes:
            <input
              type="text"
              value={sandbox}
              onChange={handleSandboxChange}
              placeholder="e.g., allow-scripts allow-same-origin"
              className="ml-2.5 px-2.5 py-1.5 border border-gray-300 rounded w-[300px]"
            />
          </label>

          <label className="flex items-center gap-2 mb-2.5 font-medium">
            <input
              type="checkbox"
              checked={showControls}
              onChange={handleControlsToggle}
              className="w-4 h-4"
            />
            Show controls
          </label>

          <label className="flex items-center gap-2 mb-2.5 font-medium">
            <input
              type="checkbox"
              checked={autoHeight}
              onChange={handleAutoHeightToggle}
              className="w-4 h-4"
            />
            Auto Height (enabled by default, responsive, no scrollbars)
          </label>

          {autoHeight && (
            <>
              <label className="block mb-2.5 font-medium">
                Min Height (px):
                <input
                  type="number"
                  value={minHeight}
                  onChange={handleMinHeightChange}
                  placeholder="0"
                  min="0"
                  className="ml-2.5 px-2.5 py-1.5 border border-gray-300 rounded w-[100px]"
                />
              </label>

              <label className="block mb-2.5 font-medium">
                Max Height (px, optional):
                <input
                  type="number"
                  value={maxHeight}
                  onChange={handleMaxHeightChange}
                  placeholder="No limit"
                  min="0"
                  className="ml-2.5 px-2.5 py-1.5 border border-gray-300 rounded w-[100px]"
                />
              </label>
            </>
          )}
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 mb-8 shadow-sm">
        <h3 className="mt-0 text-gray-800 mb-4">Rendered Component</h3>
        <div className="bg-blue-50 p-4 rounded mb-4 border-l-4 border-blue-500">
          <strong>Current Configuration:</strong>
          <br />
          Component: <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-sm">{selectedComponent}</code> | Width: <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-sm">{width}</code>
          {autoHeight ? (
            <>
              {' '}
              | Height: <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-sm">Auto (min: {minHeight}px{maxHeight ? `, max: ${maxHeight}px` : ''})</code>
            </>
          ) : (
            <>
              {' '}
              | Height: <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-sm">{height}</code>
            </>
          )}
          <br />
          Sandbox: <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-sm">{sandbox || 'none'}</code>
          {autoHeight && ' | Auto Height: Enabled'}
        </div>
        <div className="border-2 border-gray-300 rounded overflow-hidden mt-4">
          <ReactIframe
            component={ComponentToRender}
            width={width}
            height={autoHeight ? undefined : height}
            autoHeight={autoHeight}
            minHeight={autoHeight ? parseInt(minHeight) || 0 : undefined}
            maxHeight={autoHeight && maxHeight ? parseInt(maxHeight) : undefined}
            sandbox={sandbox}
            title="React Component Demo"
            style={iframeStyle}
            onLoad={handleIframeLoad}
          />
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 mb-8 shadow-sm">
        <h3 className="mt-0 text-gray-800 mb-4">Alternative Usage Examples</h3>

        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">Using children prop:</h4>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            <code className="font-mono text-sm">{`<ReactIframe width="100%">
  <Counter />
</ReactIframe>`}</code>
          </pre>
          <p className="text-sm text-gray-600 mt-2.5">
            Auto-height is enabled by default, so no height prop is needed.
          </p>
        </div>

        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">Using component prop:</h4>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            <code className="font-mono text-sm">{`<ReactIframe 
  component={Counter}
  width="100%" 
  sandbox="allow-scripts allow-same-origin"
/>`}</code>
          </pre>
          <p className="text-sm text-gray-600 mt-2.5">
            Auto-height is enabled by default, so no height prop is needed. The iframe will automatically adjust to content.
          </p>
        </div>

        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">With all iframe props:</h4>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            <code className="font-mono text-sm">{`<ReactIframe 
  component={MyComponent}
  width="500px"
  sandbox="allow-scripts allow-same-origin"
  allow="camera; microphone"
  referrerPolicy="no-referrer"
  loading="lazy"
  title="My Component"
  className="my-iframe"
  onLoad={(e) => console.log('Loaded', e)}
  onError={(e) => console.error('Error', e)}
/>`}</code>
          </pre>
          <p className="text-sm text-gray-600 mt-2.5">
            Note: Auto-height is enabled by default. To use a fixed height, set <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-xs">autoHeight={'{false}'}</code> and provide a <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-xs">height</code> prop.
          </p>
        </div>

        <div className="mb-5">
          <h4 className="text-lg font-semibold mb-2">Auto-height (enabled by default):</h4>
          <pre className="bg-gray-100 p-4 rounded overflow-auto">
            <code className="font-mono text-sm">{`<ReactIframe 
  component={MyComponent}
  width="100%"
  minHeight={100}
  maxHeight={800}
  sandbox="allow-scripts allow-same-origin"
/>`}</code>
          </pre>
          <p className="text-sm text-gray-600 mt-2.5">
            Auto-height is enabled by default and automatically adjusts the iframe height to match content, preventing scrollbars. You can disable it with <code className="bg-black/5 px-1.5 py-0.5 rounded font-mono text-xs">autoHeight={'{false}'}</code>.
          </p>
        </div>
      </div>

      <div className="bg-white rounded-lg p-5 mb-8 shadow-sm">
        <h3 className="mt-0 text-gray-800 mb-4">Features</h3>
        <ul className="leading-relaxed space-y-2">
          <li>
            <strong>Full React Support:</strong> All React features work normally (hooks, state,
            effects, context)
          </li>
          <li>
            <strong>Style Isolation:</strong> CSS is scoped to the iframe, preventing style
            conflicts
          </li>
          <li>
            <strong>Complete iframe API:</strong> All standard HTML iframe attributes and events
            are supported
          </li>
          <li>
            <strong>TypeScript:</strong> Full type safety with proper iframe prop types
          </li>
          <li>
            <strong>Flexible API:</strong> Accept components as children or via component prop
          </li>
          <li>
            <strong>Event Handling:</strong> All iframe events supported (onLoad, onError, etc.)
          </li>
          <li>
            <strong>Auto Height:</strong> Automatically adjust iframe height to match content,
            preventing vertical scrollbars (optional)
          </li>
        </ul>
      </div>
    </div>
  );
};

export default memo(App);
