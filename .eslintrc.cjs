/** @type {import("@types/eslint").Linter.Config} */
module.exports = {
  root: true,
  settings: {
    // next: {
    //   rootDir: "src",
    // },
    react: {
      version: "detect",
    },
  },
  parser: "@typescript-eslint/parser",
  parserOptions: {
    project: true,
  },
  extends: [
    "nirtamir2",
    "nirtamir2/recommended",
    "nirtamir2/typescript",
    "nirtamir2/react",
    // "nirtamir2/astro",
    // "nirtamir2/query",
    // "nirtamir2/solid",
    // "nirtamir2/security",
    // "nirtamir2/compat",
    // "nirtamir2/jest",
    // "nirtamir2/storybook",
    // "nirtamir2/i18n",
    // "nirtamir2/query",
    "nirtamir2/tailwindcss",
    "nirtamir2/next", // should be after recommended react and typescript
  ],
  rules: {},
};
