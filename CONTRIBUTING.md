# Contributing to React Iframe

Thank you for your interest in contributing to React Iframe! This document provides guidelines and instructions for contributing.

## Getting Started

1. **Fork the repository**
2. **Clone your fork:**
   ```bash
   git clone https://github.com/your-username/react-iframe.git
   cd react-iframe
   ```

3. **Install dependencies:**
   ```bash
   npm install
   cd example && npm install && cd ..
   ```

4. **Verify setup:**
   ```bash
   npm run typecheck:all
   npm run build
   ```

## Development Workflow

### Running the Example App

```bash
npm run example:dev
```

This starts the example application at `http://localhost:5173` where you can test your changes.

### Making Changes

1. Create a new branch:
   ```bash
   git checkout -b feature/your-feature-name
   # or
   git checkout -b fix/your-bug-fix
   ```

2. Make your changes following the code style:
   - Use TypeScript with strict mode
   - Follow React best practices (useMemo, useCallback, memo)
   - Add proper type annotations
   - Write clear, self-documenting code

3. Test your changes:
   ```bash
   npm run typecheck:all
   npm run build
   npm run example:dev  # Test in the example app
   ```

4. Update documentation if needed:
   - Update README.md for new features
   - Update CHANGELOG.md with your changes
   - Add JSDoc comments for new functions/components

## Code Style

- **TypeScript**: Strict mode enabled, no `any` types
- **Formatting**: Prettier configuration provided (`.prettierrc`)
- **React**: Use hooks, memo, useMemo, useCallback for optimization
- **Naming**: Use descriptive names, follow camelCase for variables/functions

## Commit Messages

Follow conventional commit format:

```
type(scope): subject

body (optional)

footer (optional)
```

Types:
- `feat`: New feature
- `fix`: Bug fix
- `docs`: Documentation changes
- `style`: Code style changes (formatting, etc.)
- `refactor`: Code refactoring
- `test`: Adding tests
- `chore`: Maintenance tasks

Examples:
```
feat(autoHeight): add minHeight and maxHeight props
fix(types): correct ReactIframeProps interface
docs(readme): add troubleshooting section
```

## Pull Request Process

1. **Before submitting:**
   - Ensure all checks pass: `npm run typecheck:all`
   - Build succeeds: `npm run build`
   - Example app works: `npm run example:dev`
   - Update CHANGELOG.md
   - Update README.md if needed

2. **Create Pull Request:**
   - Use the PR template
   - Describe your changes clearly
   - Reference related issues
   - Add screenshots if UI changes

3. **Review Process:**
   - Maintainers will review your PR
   - Address any feedback
   - Ensure CI checks pass

## Reporting Issues

Use the GitHub issue templates:
- **Bug Report**: For reporting bugs
- **Feature Request**: For suggesting new features

Include:
- Clear description
- Steps to reproduce (for bugs)
- Expected vs actual behavior
- Environment details (React version, browser, etc.)
- Code examples

## Development Tips

### Testing Locally

```bash
# Type check
npm run typecheck:all

# Build library
npm run build

# Run example app
npm run example:dev

# Watch mode for type checking
npm run typecheck:watch
```

### Understanding the Codebase

- **src/ReactIframe.tsx**: Main component implementation
- **src/types.ts**: TypeScript type definitions
- **src/utils.ts**: Utility functions (mounting, auto-height)
- **example/**: Demo application with examples

### Adding New Features

1. Update types in `src/types.ts` if needed
2. Implement feature in `src/ReactIframe.tsx` or `src/utils.ts`
3. Add example in `example/src/App.tsx` or create new component
4. Update documentation
5. Update CHANGELOG.md

## Questions?

Feel free to open an issue for questions or discussions about contributions.

Thank you for contributing to React Iframe! 🎉
