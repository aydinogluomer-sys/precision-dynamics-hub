import js from "@eslint/js";
import globals from "globals";
import reactHooks from "eslint-plugin-react-hooks";
import reactRefresh from "eslint-plugin-react-refresh";
import tseslint from "typescript-eslint";

export default tseslint.config(
  { ignores: ["dist"] },
  {
    extends: [js.configs.recommended, ...tseslint.configs.recommended],
    files: ["**/*.{ts,tsx}"],
    languageOptions: {
      ecmaVersion: 2020,
      globals: globals.browser,
    },
    plugins: {
      "react-hooks": reactHooks,
      "react-refresh": reactRefresh,
    },
    rules: {
      ...reactHooks.configs.recommended.rules,
      "react-refresh/only-export-components": ["warn", { allowConstantExport: true }],
      "@typescript-eslint/no-unused-vars": "off",
      "no-restricted-syntax": [
        "warn",
        {
          selector:
            "Literal[value=/(#[0-9a-fA-F]{3,8}\\b|rgba?\\(\\s*\\d+|hsla?\\(\\s*\\d+)/]",
          message:
            "Hardcoded color tespit edildi. CSS token kullan: var(--heat-molten) veya alpha('heatMolten', 0.25).",
        },
        {
          selector:
            "TemplateElement[value.raw=/(#[0-9a-fA-F]{3,8}\\b|rgba?\\(\\s*\\d+|hsla?\\(\\s*\\d+)/]",
          message:
            "Template literal içinde hardcoded color. CSS token kullan.",
        },
        {
          selector: "Property[key.name='zIndex'] > Literal[value=/^[0-9]+$/]",
          message:
            "Numeric zIndex literal yasak. SECTION_Z[<key>] kullan.",
        },
      ],
    },
  },
  {
    files: [
      "src/index.css",
      "src/styles/**",
      "src/lib/tokens.ts",
      "**/*.stories.*",
      "**/*.test.*",
      "e2e/**",
      "tailwind.config.ts",
      "vite.config.ts",
    ],
    rules: { "no-restricted-syntax": "off" },
  },
);
