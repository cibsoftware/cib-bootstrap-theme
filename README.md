# CIB Bootstrap Theme

`cib-bootstrap-theme` contains the migrated legacy CIB Bootstrap theme, providing a standardized look and feel by extending and overriding Bootstrap default styles with CIB's brand guidelines.

## Table of Contents

- [Project Purpose](#project-purpose)
- [Intended Consumers](#intended-consumers)
- [Project Structure](#project-structure)
- [Installation](#installation)
- [Build Instructions](#build-instructions)
- [Usage](#usage)
  - [Import Compiled CSS](#import-compiled-css)
  - [Import SCSS Entry Point](#import-scss-entry-point)
- [Future Evolution](#future-evolution)

## Project Purpose

This project aims to unify the design and styling across all CIB web applications. By centralizing the Bootstrap theme, we ensure consistency, simplify updates, and reduce duplicate styling efforts. It serves as the foundation for CIB's UI components and applications.

## Intended Consumers

The theme is primarily designed to be consumed by:

- **`cib-common-frontend`**: Shared utilities and core frontend modules.
- **`cib-bootstrap-components`**: A library of reusable UI components based on this theme.

## Project Structure

```text
cib-bootstrap-theme/
├── dist/               # Compiled CSS output
│   └── index.css       # Main theme CSS file
├── src/
│   ├── index.scss      # Public SCSS entry point
│   └── scss/           # Theme implementation (partials)
│       ├── _colors.scss    # Legacy color declarations (from variables.scss)
│       ├── _variables.scss # Legacy Bootstrap variable overrides (from cib-variables.scss)
│       ├── _utilities.scss # Legacy custom patch styles and component overrides (from cib-patch.scss)
│       └── cib-bootstrap.scss # Main integration file (reproduction of legacy loading order)
├── package.json        # Project metadata and build scripts
└── LICENSE             # Project license
```

## Migrated Legacy Structure

This repository now contains the migrated legacy SCSS content:

- **`src/scss/_colors.scss`**: Contains the main Bootstrap color variables (originally from legacy `variables.scss`).
- **`src/scss/_variables.scss`**: Contains Bootstrap variable overrides and theme tokens (originally from legacy `cib-variables.scss`).
- **`src/scss/_utilities.scss`**: Contains additional custom patch styles and component overrides (originally from legacy `cib-patch.scss`).
- **`src/scss/cib-bootstrap.scss`**: New integration file that reproduces the original loading order:
    1. Colors
    2. Variables
    3. Bootstrap
    4. Patch/Utilities

## Installation

To install the theme in your project, use npm or yarn:

```bash
npm install @cib/bootstrap-theme
```

Or:

```bash
yarn add @cib/bootstrap-theme
```

## Build Instructions

If you need to build the CSS from source manually:

1.  **Clone the repository.**
2.  **Install dependencies:**
    ```bash
    npm install
    ```
3.  **Run the build script:**
    ```bash
    npm run build
    ```

The compiled CSS will be generated in the `dist/` directory.

## Usage

### Import Compiled CSS

If you want to use the pre-compiled CSS directly in your JavaScript or TypeScript file (e.g., in a React or Angular project):

```javascript
import '@cib/bootstrap-theme/dist/index.css';
```

Or in your main CSS file:

```css
@import "~@cib/bootstrap-theme/dist/index.css";
```

### Import SCSS Entry Point

To leverage SCSS variables and mixins in your own styles, import the main SCSS file:

```scss
// In your styles.scss
@import "@cib/bootstrap-theme/src/index";
```

*Note: Depending on your build system (Webpack, Vite, etc.), you might need to adjust the path or use a prefix like `~`.*

## Future Evolution

This project is the first step towards a broader **CIB Design System**. Future updates will include:

- Deeper integration with design tokens.
- Expanded utility classes for more granular control.
- Documentation for design principles and accessibility guidelines.
- Migration to a more modular design system architecture as the library grows.

## License

Apache-2.0
