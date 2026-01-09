---
description: Workflow for diagnosing and fixing build and lint errors
---

# Build and Fix Cycle Workflow

This workflow outlines the steps to identify, diagnose, and resolve build and linting errors in the project.

## 1. Run Build to Identify Issues

Start by running the full build command to see if there are any errors.

```bash
pnpm build
```

## 2. Analyze TypeScript Errors

If the build fails during the `tsc` (TypeScript Compiler) step:

### Option A: View Errors Directly

Run `tsc` directly to see the output in the terminal.

```bash
npx tsc -p tsconfig.app.json
```

### Option B: Capture Errors to File (Recommended for many errors)

If the output is too long, capture it to a file for easier analysis.

```bash
cmd /c "npx tsc -p tsconfig.app.json > build_errors.txt 2>&1"
```

### Common Fixes

- **Type Mismatches**: Ensure DTOs match the backend response and frontend interfaces match the DTOs.
- **Missing Properties**: Check if new required fields were added to types but missing in mappers or objects.
- **Mapper Updates**: Update `mappers.ts` files to handle new fields or type changes.

## 3. Analyze ESLint Errors

If the build fails during the `eslint` step:

### Capture Lint Errors

Run the lint command and capture output to identifying specific rules being violated.

```bash
cmd /c "pnpm lint > lint_errors.txt 2>&1"
```

### Auto-Fix

Attempt to automatically fix simple style issues (like import order, sorting props).

```bash
pnpm lint --fix
```

### Manual Fixes

For errors that cannot be auto-fixed (e.g., `react-hooks/exhaustive-deps`, unused variables), manually edit the files.

## 4. Verification

After applying fixes, run the build command again to verify success.

```bash
pnpm build
```

If successful, the command should exit with code 0 and generate the `dist` folder.

## 5. Cleanup

After a successful build, remove any temporary error log files generated during the process.

```bash
cmd /c "del build_errors.txt build_errors_*.txt lint_errors.txt"
```
