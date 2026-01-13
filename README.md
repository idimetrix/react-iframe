# React Iframe

<div align="center">

**A fully configurable React component that renders React components inside an isolated iframe with complete style isolation and full React functionality.**

[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%20%7C%2018%20%7C%2019-61dafb.svg)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)

</div>

## ✨ Features

- 🎯 **Full React Support** - All React features work normally (hooks, state, effects, context)
- 🎨 **Style Isolation** - CSS is scoped to the iframe, preventing style conflicts with parent page
- 🔧 **Complete iframe API** - All standard HTML iframe attributes and events are supported
- 📏 **Auto Height** - Automatically adjust iframe height to match content (no scrollbars)
- 💪 **TypeScript** - Full type safety with proper iframe prop types
- 🎭 **Flexible API** - Accept components as children or via `component` prop
- ♿ **Accessibility** - All ARIA attributes supported
- ⚡ **Performance** - Optimized with React best practices (memo, useMemo, useCallback)

## 📦 Installation

```bash
npm install @idimetrix/react-iframe
```

**Peer Dependencies:**
- `react` ^17.0.0 || ^18.0.0 || ^19.0.0
- `react-dom` ^17.0.0 || ^18.0.0 || ^19.0.0

## 🚀 Quick Start

### Basic Usage

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';
import MyComponent from './MyComponent';

function App() {
  return (
    <ReactIframe
      component={MyComponent}
      width="100%"
      height="400px"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

### Using Children

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';

function App() {
  return (
    <ReactIframe width="100%">
      <MyComponent />
    </ReactIframe>
  );
}
```

> **Note:** `autoHeight` is enabled by default, so no `height` prop is needed.

## 📖 Documentation

### Props

The `ReactIframe` component extends all standard HTML iframe attributes and adds the following props:

| Prop | Type | Default | Description |
|------|------|---------|-------------|
| `component` | `ComponentType<Record<string, unknown>>` | - | React component to render inside the iframe (alternative to `children`) |
| `children` | `ReactNode` | - | React component(s) to render inside the iframe (alternative to `component`) |
| `componentProps` | `Record<string, unknown>` | `{}` | Props to pass to the component rendered inside the iframe |
| `autoHeight` | `boolean` | `true` | Automatically adjust iframe height to match content height (enabled by default) |
| `minHeight` | `number` | `0` | Minimum height in pixels when `autoHeight` is enabled |
| `maxHeight` | `number` | `undefined` | Maximum height in pixels when `autoHeight` is enabled |
| `...iframeProps` | `React.IframeHTMLAttributes` | - | All standard HTML iframe attributes |

> **Note:** Either `component` or `children` must be provided, but not both.

### Standard Iframe Attributes

All standard HTML iframe attributes are supported and passed through:

**Common Attributes:**
- `sandbox` - Security sandbox attributes (e.g., `"allow-scripts allow-same-origin"`)
- `allow` - Feature policy (e.g., `"camera; microphone; geolocation"`)
- `allowFullScreen` - Allow fullscreen mode
- `referrerPolicy` - Referrer policy (`"no-referrer"`, `"strict-origin-when-cross-origin"`, etc.)
- `loading` - Lazy loading (`"lazy"` or `"eager"`)
- `name` - Frame name
- `width`, `height` - Dimensions (ignored when `autoHeight` is `true`)
- `title` - Accessibility title
- `className`, `style` - Styling

**Event Handlers:**
- `onLoad` - Fired when iframe loads
- `onError` - Fired on iframe error
- `onFocus`, `onBlur` - Focus events
- All other standard React event handlers

**Data & ARIA Attributes:**
- All `data-*` attributes
- All `aria-*` attributes

## 💡 Usage Examples

### Example 1: Basic Component Rendering

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';
import Counter from './Counter';

function App() {
  return (
    <ReactIframe
      component={Counter}
      width="100%"
      height="300px"
      sandbox="allow-scripts allow-same-origin"
      title="Counter Component"
    />
  );
}
```

### Example 2: Passing Props to Component

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';
import UserProfile from './UserProfile';

function App() {
  return (
    <ReactIframe
      component={UserProfile}
      componentProps={{
        userId: 123,
        showEmail: true,
        theme: 'dark'
      }}
      width="100%"
      height="500px"
    />
  );
}
```

### Example 3: Auto Height (Responsive)

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';
import DynamicContent from './DynamicContent';

function App() {
  return (
    <ReactIframe
      component={DynamicContent}
      width="100%"
      minHeight={200}
      maxHeight={1000}
      // autoHeight is enabled by default
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

The `autoHeight` prop automatically adjusts the iframe height to match its content, preventing vertical scrollbars. This is especially useful for dynamic content that changes size.

### Example 4: Advanced Configuration

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';
import MyComponent from './MyComponent';

function App() {
  const handleLoad = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    console.log('Iframe loaded successfully', event);
  };

  const handleError = (event: React.SyntheticEvent<HTMLIFrameElement>) => {
    console.error('Iframe error', event);
  };

  return (
    <ReactIframe
      component={MyComponent}
      width="600px"
      height="400px"
      sandbox="allow-scripts allow-same-origin allow-forms"
      allow="camera; microphone; geolocation"
      referrerPolicy="no-referrer"
      loading="lazy"
      title="My Isolated Component"
      className="my-iframe-class"
      style={{ border: '2px solid #ccc', borderRadius: '8px' }}
      onLoad={handleLoad}
      onError={handleError}
      data-testid="my-component-iframe"
      aria-label="Isolated React component"
    />
  );
}
```

### Example 5: Using Children with Render Props

```tsx
import { ReactIframe } from '@idimetrix/react-iframe';

function App() {
  return (
    <ReactIframe
      width="100%"
      height="400px"
      componentProps={{ initialCount: 10 }}
    >
      {(props) => <Counter initialCount={props.initialCount} />}
    </ReactIframe>
  );
}
```

## 🔍 How It Works

1. **Iframe Creation**: The component creates an iframe element with your specified attributes
2. **Document Setup**: Sets up the iframe's document structure with basic HTML and styles
3. **React Rendering**: Uses the parent window's ReactDOM to render your component into the iframe
4. **Style Isolation**: All styles are scoped to the iframe, preventing conflicts with the parent page
5. **Auto Height** (if enabled): Uses `ResizeObserver` and `MutationObserver` to detect content size changes and adjust the iframe height accordingly

## 🎯 Common Use Cases

### Widget Embedding
Embed React components as isolated widgets in third-party websites without style conflicts.

### Component Sandboxing
Test or preview components in isolation without affecting the parent application.

### Style Isolation
Render components with their own CSS that won't interfere with the parent page styles.

### Dynamic Content
Display content that changes size dynamically with automatic height adjustment.

## 🛠️ TypeScript

Full TypeScript support is included. Import types as needed:

```tsx
import { ReactIframe, ReactIframeProps } from '@idimetrix/react-iframe';

// Use the type for props
const props: ReactIframeProps = {
  component: MyComponent,
  width: '100%',
  height: '400px',
  autoHeight: true,
};
```

## 🌐 Browser Support

Works in all modern browsers that support:
- React 17, 18, or 19
- HTML5 iframes
- ES6+ JavaScript
- `ResizeObserver` (for auto-height feature, with fallback for older browsers)

## 📚 Examples

See the [`example/`](./example/) directory for a complete demo application showcasing:

1. **Counter Component** - Demonstrates React state management inside an iframe
2. **Form Component** - Shows user interaction and form handling
3. **Styled Box Component** - Illustrates CSS isolation

To run the example:

```bash
cd example
npm install
npm run dev
```

## ⚠️ Important Notes

### Sandbox Restrictions

When using the `sandbox` attribute, ensure you include `allow-same-origin` if you need to access the iframe's content:

```tsx
// ✅ Good - allows script execution and same-origin access
sandbox="allow-scripts allow-same-origin"

// ❌ May not work - too restrictive
sandbox="allow-scripts"
```

### Auto Height Limitations

- Auto-height requires access to the iframe's content, so ensure `sandbox` includes `allow-same-origin` if used
- The feature uses `ResizeObserver` with a fallback to polling for older browsers
- Performance is optimized with `requestAnimationFrame` throttling

### Component Props

- Props passed via `componentProps` are passed directly to your component
- The component receives these props as normal React props
- Changes to `componentProps` will trigger re-renders inside the iframe

## 🐛 Troubleshooting

### Iframe content not accessible

If you see warnings about not being able to access iframe content:

1. Check your `sandbox` attribute - ensure `allow-same-origin` is included
2. Verify CORS settings if loading from a different origin
3. Check browser console for specific error messages

### Auto-height not working

1. Ensure `autoHeight={true}` is set
2. Verify `sandbox` includes `allow-same-origin`
3. Check that content is actually changing size
4. Try setting explicit `minHeight` to see if the feature is working

### Styles not applying

Styles inside the iframe are isolated. If you need to share styles:

1. Inject styles programmatically into the iframe document
2. Use CSS variables that can be passed through
3. Include styles within your component

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

## 📄 Changelog

### 1.0.0
- Initial release
- Full iframe prop propagation
- Auto-height feature
- TypeScript support
- React 17/18/19 compatibility

---

<div align="center">

Made with ❤️ for the React community

</div>
