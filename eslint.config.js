import nirtamir2 from "@nirtamir2/eslint-config";

export default nirtamir2(
  {
    formatters: true,
    solid: true,
  },
  [
    {
      rules: {
        "n/prefer-global/process": "off",

        // Solid.js specific
        "sonarjs/no-unstable-nested-components": "off", // for Show callbacks
        "@typescript-eslint/no-non-null-assertion": "off", // let ref: HtmlDivElement = null!
        "prefer-const": "off", // let ref: HtmlDivElement = null!
      },
    },
  ],
);
