// This configuration only applies to the package manager root.
/** @type {import("eslint").Linter.Config} */
module.exports = {
  ignorePatterns: ["apps/**", "packages/**"],
  extends: [
    "@workspace/eslint-config/library.js",
    "plugin:prettier/recommended" // 👈 adds Prettier rules + turns off ESLint formatting conflicts
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  plugins: ["prettier"],
  rules: {
    "prettier/prettier": "error" // 👈 makes Prettier formatting show up as ESLint errors
  },
}
