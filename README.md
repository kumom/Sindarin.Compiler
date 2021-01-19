# Sindarin.Compiler

A compiler & static analysis playground with configurable semantics
and visualization.

## Build

 * Prerequisites:
   * Parcel 1.x — `npm i -g parcel@1.12.4`
   * NWjs (SDK flavor recommended) — `npm i -g nw@sdk`

   These two are of significant size, hence are not included as project-level dependencies (in `package.json`) and you are recommended to install them globally.

 * Development build:
   ```
   % npm i
   % npm run watch
   % nw &
   ```

 * Production build:
   ```
   % npm run build
   ```