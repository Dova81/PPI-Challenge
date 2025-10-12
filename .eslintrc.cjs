module.exports = {
  root: true,
  extends: ["next/core-web-vitals", "eslint:recommended", "plugin:react/recommended", "prettier"],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    ecmaVersion: 2024,
    sourceType: "module",
    ecmaFeatures: {
      jsx: true,
    },
  },
  plugins: ["@typescript-eslint"],
  rules: {
    // project-specific rules
    "react/react-in-jsx-scope": "off",
  // Use the TypeScript version of the rule
  "no-unused-vars": "off",
  "@typescript-eslint/no-unused-vars": ["error", { "argsIgnorePattern": "^_", "varsIgnorePattern": "^_" }],
  },
  settings: {
    react: {
      version: "detect",
    },
  },
};
