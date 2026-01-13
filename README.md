# React Iframe

<div align="center">

**A fully configurable React component that renders React components inside an isolated iframe with complete style isolation and full React functionality.**

[![npm version](https://img.shields.io/npm/v/@dimetrix/react-iframe.svg)](https://www.npmjs.com/package/@dimetrix/react-iframe)
[![npm downloads](https://img.shields.io/npm/dm/@dimetrix/react-iframe.svg)](https://www.npmjs.com/package/@dimetrix/react-iframe)
[![TypeScript](https://img.shields.io/badge/TypeScript-5.9-blue.svg)](https://www.typescriptlang.org/)
[![React](https://img.shields.io/badge/React-17%20%7C%2018%20%7C%2019-61dafb.svg)](https://react.dev/)
[![License](https://img.shields.io/badge/license-MIT-green.svg)](LICENSE)
[![Bundle Size](https://img.shields.io/bundlephobia/minzip/@dimetrix/react-iframe)](https://bundlephobia.com/package/@dimetrix/react-iframe)

[Documentation](#-documentation) • [Examples](#-usage-examples) • [Installation](#-installation) • [Contributing](#-contributing)

</div>

---

## ✨ Features

- 🎯 **Full React Support** - All React features work normally (hooks, state, effects, context, suspense)
- 🎨 **Complete Style Isolation** - CSS is scoped to the iframe, preventing style conflicts with parent page
- 📏 **Auto Height** - Automatically adjust iframe height to match content (no scrollbars, enabled by default)
- 🔧 **Complete iframe API** - All standard HTML iframe attributes and events are supported
- 💪 **TypeScript** - Full type safety with proper iframe prop types and IntelliSense support
- 🎭 **Flexible API** - Accept components as children or via `component` prop
- ♿ **Accessibility** - All ARIA attributes and accessibility features supported
- ⚡ **Performance Optimized** - Built with React best practices (memo, useMemo, useCallback)
- 🎨 **Tailwind CSS Ready** - Tailwind CSS is automatically injected into the iframe for styling
- 🔒 **Security** - Full support for sandbox attributes and security policies

## 📦 Installation

```bash
npm install @dimetrix/react-iframe
```

**Peer Dependencies:**
- `react` ^17.0.0 || ^18.0.0 || ^19.0.0
- `react-dom` ^17.0.0 || ^18.0.0 || ^19.0.0

## 🚀 Quick Start

### Basic Usage

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';
import MyComponent from './MyComponent';

function App() {
  return (
    <ReactIframe
      component={MyComponent}
      width="100%"
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

> **Note:** `autoHeight` is enabled by default, so no `height` prop is needed. The iframe will automatically adjust to match its content height.

### Using Children

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';

function App() {
  return (
    <ReactIframe width="100%">
      <MyComponent />
    </ReactIframe>
  );
}
```

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
| `...iframeProps` | `React.IframeHTMLAttributes` | - | All standard HTML iframe attributes (see below) |

> **Important:** Either `component` or `children` must be provided, but not both.

### Standard Iframe Attributes

All standard HTML iframe attributes are supported and passed through to the underlying iframe element:

#### Common Attributes

| Attribute | Type | Description |
|-----------|------|-------------|
| `sandbox` | `string` | Security sandbox attributes (e.g., `"allow-scripts allow-same-origin"`) |
| `allow` | `string` | Feature policy (e.g., `"camera; microphone; geolocation"`) |
| `allowFullScreen` | `boolean` | Allow fullscreen mode |
| `referrerPolicy` | `string` | Referrer policy (`"no-referrer"`, `"strict-origin-when-cross-origin"`, etc.) |
| `loading` | `"lazy" \| "eager"` | Lazy loading behavior |
| `name` | `string` | Frame name for targeting |
| `width` | `string \| number` | Width (ignored when `autoHeight` is `true`) |
| `height` | `string \| number` | Height (ignored when `autoHeight` is `true`) |
| `title` | `string` | Accessibility title |
| `className` | `string` | CSS class name |
| `style` | `CSSProperties` | Inline styles |

#### Event Handlers

All standard React event handlers are supported:

- `onLoad` - Fired when iframe loads
- `onError` - Fired on iframe error
- `onFocus`, `onBlur` - Focus events
- `onMouseEnter`, `onMouseLeave` - Mouse events
- And all other standard React event handlers

#### Data & ARIA Attributes

- All `data-*` attributes
- All `aria-*` attributes

## 💡 Usage Examples

### Example 1: Basic Component Rendering

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';
import Counter from './Counter';

function App() {
  return (
    <ReactIframe
      component={Counter}
      width="100%"
      sandbox="allow-scripts allow-same-origin"
      title="Counter Component"
    />
  );
}
```

### Example 2: Passing Props to Component

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';
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
    />
  );
}
```

### Example 3: Auto Height with Constraints

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';
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

### Example 4: Disabling Auto Height

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';
import MyComponent from './MyComponent';

function App() {
  return (
    <ReactIframe
      component={MyComponent}
      width="100%"
      height="400px"
      autoHeight={false}
      sandbox="allow-scripts allow-same-origin"
    />
  );
}
```

### Example 5: Advanced Configuration

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';
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

### Example 6: Using Children with Tailwind CSS

```tsx
import { ReactIframe } from '@dimetrix/react-iframe';

function App() {
  return (
    <ReactIframe width="100%">
      <div className="p-4 bg-blue-500 text-white rounded-lg">
        <h1 className="text-2xl font-bold">Hello from iframe!</h1>
        <p className="mt-2">Tailwind CSS works automatically inside the iframe.</p>
      </div>
    </ReactIframe>
  );
}
```

Tailwind CSS is automatically injected into the iframe, so you can use Tailwind utility classes directly in your components.

### Example 7: Dynamic Content with State

```tsx
import { useState } from 'react';
import { ReactIframe } from '@dimetrix/react-iframe';
import Counter from './Counter';

function App() {
  const [count, setCount] = useState(0);

  return (
    <ReactIframe
      component={Counter}
      componentProps={{ 
        initialCount: count,
        onCountChange: setCount 
      }}
      width="100%"
    />
  );
}
```

## 🔍 How It Works

1. **Iframe Creation**: The component creates an iframe element with your specified attributes
2. **Document Setup**: Sets up the iframe's document structure with basic HTML, Tailwind CSS, and styles
3. **React Rendering**: Uses the parent window's ReactDOM to render your component into the iframe
4. **Style Isolation**: All styles are scoped to the iframe, preventing conflicts with the parent page
5. **Auto Height** (if enabled): Uses `ResizeObserver` and `MutationObserver` to detect content size changes and adjust the iframe height accordingly with `requestAnimationFrame` throttling for optimal performance

### Technical Details

- **React Mounting**: Uses `ReactDOM.createRoot` to mount React components into the iframe's document
- **Style Injection**: Tailwind CSS is automatically injected via CDN into the iframe's `<head>`
- **Height Calculation**: Auto-height uses computed styles to account for margins and padding, ensuring accurate measurements
- **Performance**: Observers are throttled using `requestAnimationFrame` to minimize performance impact
- **Cleanup**: All observers and event listeners are properly cleaned up when the component unmounts

## 🎯 Common Use Cases

### Widget Embedding
Embed React components as isolated widgets in third-party websites without style conflicts.

```tsx
<ReactIframe
  component={MyWidget}
  width="100%"
  sandbox="allow-scripts allow-same-origin"
/>
```

### Component Sandboxing
Test or preview components in isolation without affecting the parent application.

```tsx
<ReactIframe
  component={ComponentToTest}
  width="100%"
  sandbox="allow-scripts allow-same-origin"
/>
```

### Style Isolation
Render components with their own CSS that won't interfere with the parent page styles.

```tsx
<ReactIframe width="100%">
  <StyledComponent />
</ReactIframe>
```

### Dynamic Content
Display content that changes size dynamically with automatic height adjustment.

```tsx
<ReactIframe
  component={DynamicContent}
  width="100%"
  minHeight={200}
  maxHeight={1000}
/>
```

## 🛠️ TypeScript

Full TypeScript support is included. Import types as needed:

```tsx
import { ReactIframe, ReactIframeProps } from '@dimetrix/react-iframe';

// Use the type for props
const props: ReactIframeProps = {
  component: MyComponent,
  width: '100%',
  autoHeight: true,
};

// Type-safe component
function MyApp() {
  return <ReactIframe {...props} />;
}
```

## 🌐 Browser Support

Works in all modern browsers that support:

- React 17, 18, or 19
- HTML5 iframes
- ES6+ JavaScript
- `ResizeObserver` (for auto-height feature, with fallback for older browsers)

### Browser Compatibility

| Browser | Version |
|---------|---------|
| Chrome | 64+ |
| Firefox | 69+ |
| Safari | 13.1+ |
| Edge | 79+ |

## 📚 Examples

See the [`example/`](./example/) directory for a complete demo application showcasing:

1. **Counter Component** - Demonstrates React state management inside an iframe
2. **Form Component** - Shows user interaction and form handling
3. **Styled Box Component** - Illustrates CSS isolation and Tailwind CSS usage

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

// ❌ May not work - too restrictive for auto-height
sandbox="allow-scripts"
```

### Auto Height Limitations

- Auto-height requires access to the iframe's content, so ensure `sandbox` includes `allow-same-origin` if used
- The feature uses `ResizeObserver` with optimized `requestAnimationFrame` throttling
- Performance is optimized to minimize reflows and repaints
- Height calculation accounts for margins and padding automatically

### Component Props

- Props passed via `componentProps` are passed directly to your component
- The component receives these props as normal React props
- Changes to `componentProps` will trigger re-renders inside the iframe
- Props are compared using shallow equality, so use memoization for complex objects

### Style Isolation

- All styles are isolated within the iframe
- Tailwind CSS is automatically available via CDN
- Custom CSS can be injected programmatically if needed
- CSS variables can be passed through for theming

## 🐛 Troubleshooting

### Iframe content not accessible

If you see warnings about not being able to access iframe content:

1. **Check your `sandbox` attribute** - Ensure `allow-same-origin` is included:
   ```tsx
   sandbox="allow-scripts allow-same-origin"
   ```

2. **Verify CORS settings** - If loading from a different origin, check CORS headers

3. **Check browser console** - Look for specific error messages

### Auto-height not working

1. **Ensure `autoHeight={true}`** is set (it's the default)
2. **Verify `sandbox` includes `allow-same-origin`**:
   ```tsx
   sandbox="allow-scripts allow-same-origin"
   ```
3. **Check that content is actually changing size** - Use browser DevTools to inspect
4. **Try setting explicit `minHeight`** to see if the feature is working:
   ```tsx
   <ReactIframe minHeight={200} ... />
   ```

### Styles not applying

Styles inside the iframe are isolated. If you need to share styles:

1. **Use Tailwind CSS** - It's automatically available in the iframe
2. **Inject styles programmatically** into the iframe document
3. **Use CSS variables** that can be passed through for theming
4. **Include styles within your component** using CSS-in-JS or style tags

### Performance issues

If you experience performance issues:

1. **Disable auto-height** if not needed: `autoHeight={false}`
2. **Use `minHeight` and `maxHeight`** to limit height calculations
3. **Memoize component props** to prevent unnecessary re-renders
4. **Check for memory leaks** - ensure components properly cleanup

## 🔒 Security Considerations

- Always use the `sandbox` attribute to restrict iframe capabilities
- Be cautious with `allow-same-origin` - only use when necessary
- Consider using `referrerPolicy` to control referrer information
- Review the `allow` attribute to limit feature access
- Test your security settings thoroughly

## 📝 License

MIT License - see [LICENSE](./LICENSE) file for details.

## 🤝 Contributing

Contributions are welcome! Please feel free to submit a Pull Request.

1. Fork the repository
2. Create your feature branch (`git checkout -b feature/amazing-feature`)
3. Commit your changes (`git commit -m 'Add some amazing feature'`)
4. Push to the branch (`git push origin feature/amazing-feature`)
5. Open a Pull Request

### Development Setup

```bash
# Clone the repository
git clone https://github.com/idimetrix/react-iframe.git
cd react-iframe

# Install dependencies
npm install

# Run development server
npm run dev

# Build the library
npm run build

# Run type checking
npm run typecheck
```

## 📄 Changelog

### 1.0.0

- ✨ Initial release
- 🎯 Full iframe prop propagation
- 📏 Auto-height feature (enabled by default)
- 💪 TypeScript support
- ⚡ React 17/18/19 compatibility
- 🎨 Tailwind CSS integration
- 🔧 Performance optimizations
- 📚 Comprehensive documentation

---

<div align="center">

Made with ❤️ for the React community

**[Report Bug](https://github.com/idimetrix/react-iframe/issues)** • **[Request Feature](https://github.com/idimetrix/react-iframe/issues)** • **[View on NPM](https://www.npmjs.com/package/@dimetrix/react-iframe)**

</div>
