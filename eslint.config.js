import nirtamir2 from "@nirtamir2/eslint-config";

export default nirtamir2(
  {
    formatters: true,
    solid: true,
  },
  [
    {
      rules: {
        "sonarjs/no-unstable-nested-components": "off",
        "n/prefer-global/process": "off",
      },
    },
  ],
);
