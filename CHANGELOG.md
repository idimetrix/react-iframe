# Changelog

All notable changes to this project will be documented in this file.

The format is based on [Keep a Changelog](https://keepachangelog.com/en/1.0.0/),
and this project adheres to [Semantic Versioning](https://semver.org/spec/v2.0.0.html).

## [1.0.0] - 2024-01-13

### Added
- Initial release of React Iframe component
- Full support for all standard HTML iframe attributes
- `component` prop for rendering React components inside iframe
- `children` prop as alternative to `component` prop
- `componentProps` prop for passing props to rendered components
- `autoHeight` feature for automatic height adjustment (enabled by default)
- `minHeight` and `maxHeight` props for auto-height constraints
- Complete TypeScript support with strict type checking
- Style isolation within iframe
- React 17, 18, and 19 compatibility
- Comprehensive example application with three demo components
- Full documentation with usage examples
- Tailwind CSS v4 support in iframe content
- Zero custom CSS classes - all styling uses Tailwind utilities

### Features
- **Full React Support**: All React features work normally (hooks, state, effects, context)
- **Style Isolation**: CSS scoped to iframe, preventing style conflicts
- **Complete iframe API**: All standard HTML iframe attributes and events supported
- **Auto Height**: Automatically adjust iframe height to match content (no scrollbars) - **enabled by default**
- **TypeScript**: Full type safety with proper iframe prop types
- **Performance**: Optimized with React best practices (memo, useMemo, useCallback)
- **Accessibility**: All ARIA attributes supported
- **Tailwind CSS**: Full Tailwind CSS v4 support in iframe content via CDN
- **Default Border**: Iframe border set to 0 by default for cleaner appearance

### Changed
- `autoHeight` prop now defaults to `true` (previously `false`)
- Improved height calculation to account for margins and padding
- Enhanced auto-height timing using `requestAnimationFrame` for better accuracy
- Updated to use Tailwind CSS v4 with `@tailwindcss/postcss` plugin

### Technical Details
- Built with Vite 7.3.1
- TypeScript 5.9.3 with strict mode enabled
- React 19.2.3 support (backward compatible with React 17 & 18)
- Tailwind CSS 4.1.18 with PostCSS integration
- Uses ResizeObserver and MutationObserver for auto-height feature
- Proper cleanup on component unmount
- Optimized re-renders with React.memo and hooks
- Direct imports only (no namespace imports)

[1.0.0]: https://github.com/your-username/react-iframe/releases/tag/v1.0.0
