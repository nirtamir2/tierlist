import nirtamir2 from "@nirtamir2/eslint-config";

export default nirtamir2(
  {
    formatters: true,
    solid: true,
    react: true,
  },
  [
    {
      rules: {
        "n/prefer-global/process": ["error", "always"],

        // Solid.js specific
        "sonarjs/no-unstable-nested-components": "off", // for Show callbacks
        "sonarjs/jsx-no-constructed-context-values": "off", // Not valid for Solid.js context - only in react
        "@typescript-eslint/no-non-null-assertion": "off", // let ref: HtmlDivElement = null!
        "prefer-const": "off", // let ref: HtmlDivElement = null!
      },
    },
    {
      rules: {
        // Solid.js react rules off
        "react/no-unknown-property": "off",
        "@eslint-react/prefer-destructuring-assignment": "off",
        "react-refresh/only-export-components": "off",
        "react/jsx-no-constructed-context-values": "off",
        "@eslint-react/no-unstable-context-value": "off",
      },
    },
    {
      files: ["src/entry-client.tsx"],
      rules: {
        "ssr-friendly/no-dom-globals-in-module-scope": "off",
      },
    },
  ],
);
