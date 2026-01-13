# Publishing Guide

## Pre-publish Checklist

- [ ] Update version in `package.json`
- [ ] Update `CHANGELOG.md` with new version
- [ ] Run `npm run typecheck:all` to verify types
- [ ] Run `npm run build` to build the library
- [ ] Test the example app: `npm run example:dev`
- [ ] Verify `npm pack --dry-run` shows correct files

## Publishing Steps

1. **Update version:**
   ```bash
   npm version patch  # for bug fixes (1.0.0 -> 1.0.1)
   npm version minor  # for new features (1.0.0 -> 1.1.0)
   npm version major  # for breaking changes (1.0.0 -> 2.0.0)
   ```

2. **Build and verify:**
   ```bash
   npm run build
   npm pack --dry-run
   ```

3. **Publish to NPM:**
   ```bash
   npm publish
   ```

   For first-time publishing:
   ```bash
   npm publish --access public
   ```

4. **Create Git tag (if using Git):**
   ```bash
   git tag v1.0.0
   git push origin v1.0.0
   ```

## Package Contents

The published package includes:
- `dist/` - Built library and type definitions
- `README.md` - Documentation
- `CHANGELOG.md` - Version history
- `LICENSE` - MIT License
- `package.json` - Package metadata

Source files and examples are excluded via `.npmignore`.
