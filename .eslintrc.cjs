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
    "@typescript-eslint/indent": "off",
    "@typescript-eslint/no-explicit-any": "off",
    "@typescript-eslint/no-unused-vars": "off",
    "@typescript-eslint/quotes": "off",
    "indent": ["warn", 2, {"ignoredNodes": ["ConditionalExpression"]}],
    "quotes": ["warn", "double"],
    "semi": ["warn", "always", {"omitLastInOneLineBlock": true}],
  },
}
