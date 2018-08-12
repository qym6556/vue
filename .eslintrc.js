// https://eslint.org/docs/user-guide/configuring

module.exports = {
  root: true,
  parserOptions: {
    parser: 'babel-eslint'
  },
  env: {
    browser: true,
  },
  extends: [
    // https://github.com/vuejs/eslint-plugin-vue#priority-a-essential-error-prevention
    // consider switching to `plugin:vue/strongly-recommended` or `plugin:vue/recommended` for stricter rules.
    'plugin:vue/essential', 
    // https://github.com/standard/standard/blob/master/docs/RULES-en.md
    'standard'
    ],
  // required to lint *.vue files
  plugins: [
  'vue'
  ],
  // add your custom rules here
  rules: {
    // allow async-await
    'generator-star-spacing': 'off',
    // allow debugger during development
    'no-debugger': process.env.NODE_ENV === 'production' ? 'error' : 'off',
    "no-mixed-spaces-and-tabs": [0],
    "no-console":[0],
    "no-continue": [0],
    "no-multi-spaces": [0],
    "no-spaced-func":[0],
    "no-trailing-spaces":[0],
    "array-bracket-spacing":[0],
    "comma-spacing": [0],
    "key-spacing": [0, { "beforeColon": false, "afterColon": false }],
    "semi-spacing": [0, {"before": false, "after": true}],
    "space-in-parens": [0, "never"],
    "space-infix-ops": [0],
    "keyword-spacing":[0],
    "space-unary-ops": [0, { "words": true, "nonwords": false }],
    "spaced-comment": [0],
    "no-tabs": "off",
    "space-infix-ops":[0],
    "key-spacing": [0],
    "spaced-comment":[0],
    "eol-last":[0],
    "indent":[0],
    "space-before-function-paren": [0, "always"],
    "space-before-blocks": [0, "always"],
    "semi": [0, "always"],
    "quotes": [0],
    "arrow-spacing": [0],
    "comma-dangle": [0],
    "padded-blocks": [0],
    "eqeqeq": [0],
    "no-new": [0]
  }
}
