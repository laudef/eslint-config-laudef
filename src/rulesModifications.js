const regexToPatternString = function regexToPatternString(regex) {
  // TODO: add check for flags

  return regex.toString().replace(/(^\/|\/$)/g, '');
};

const rulesModifications = {
  indent: [null, null, {
    MemberExpression: 'off',
  }],
  'linebreak-style': 'off',
  'max-len': [null, null, null, {
    // Ignore, for example, the following lines:
    // const shortFunctionName = function longFunctionName(
    // exports.shortMethodName = function longMethodName(
    //   shortMethodName: function longMethodName(
    ignorePattern: regexToPatternString(/^.+(=|:)\sfunction\s.+\($/),
    ignoreStrings: false,
    ignoreTemplateLiterals: false,
  }],
  'newline-per-chained-call': 'off',
  'no-console': 'off',
  'no-unused-vars': ['error', { argsIgnorePattern: '^next$' }],
};

module.exports = rulesModifications;
