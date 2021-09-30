// @ts-ignore
module.exports = {
  env: {
    "browser": true,
  },
  plugins: ["@typescript-eslint"],
  extends: [
    "eslint:recommended",
    "plugin:@typescript-eslint/eslint-recommended",
    "plugin:@typescript-eslint/recommended",
    "plugin:react/recommended",
  ],
  parser: "@typescript-eslint/parser",
  parserOptions: {
    tsconfigRootDir: __dirname,
    project: "./tsconfig.json",
    ecmaFeatures: {
      "jsx": true
    }
  },
  rules: {
    "@typescript-eslint/ban-ts-comment": "off",
    "@typescript-eslint/explicit-module-boundary-types": "off",
    "@typescript-eslint/member-delimiter-style": ["warn", {"multiline": {"delimiter": "semi"}}],
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-non-null-assertion": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/quotes": "off",
    "arrow-parens": ["warn", "always"],
    "indent": ["warn", 2, {"ignoredNodes": ["ConditionalExpression"]}],
    "max-len": "off",
    "no-irregular-whitespace": "off",
    "quotes": ["warn", "double", {"allowTemplateLiterals": true, "avoidEscape": true}],
    "react/display-name": "off",
    "semi": ["warn", "always", {"omitLastInOneLineBlock": true}],
  },
}
