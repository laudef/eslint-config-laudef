const { extends: absolutePathsToRuleFiles } = require('eslint-config-airbnb-base');

const rulesModifications = require('./rulesModifications');

const originalRules = absolutePathsToRuleFiles.reduce((rulesCopied, absolutePathToRuleFile) => ({
  ...rulesCopied,
  // eslint-disable-next-line global-require, import/no-dynamic-require
  ...require(absolutePathToRuleFile).rules,
}), {});

const rulesToOverwriteWith = Object.entries(rulesModifications).reduce(
  (rulesMerged, [ruleName, ruleModification]) => {
    let targetRule = originalRules[ruleName];

    targetRule = typeof targetRule === 'string'
      ? [targetRule]
      : targetRule.slice();
    // eslint-disable-next-line no-param-reassign
    if (typeof ruleModification === 'string') ruleModification = [ruleModification];

    let mergedRule = ruleModification.reduce(
      (partiallyMergedRule, argModification, i) => {
        if (argModification == null) return partiallyMergedRule;

        const targetArg = partiallyMergedRule[i];
        const targetArgIsOption = (targetArg
          && typeof targetArg === 'object'
          && Object.keys(targetArg).length > 0);
        const newArg = targetArgIsOption
          ? { ...targetArg, ...argModification }
          : argModification;

        return Object.assign(
          partiallyMergedRule.slice(),
          { [i]: newArg },
        );
      },
      targetRule,
    );

    if (mergedRule.length === 1) [mergedRule] = mergedRule;

    return {
      ...rulesMerged,
      [ruleName]: mergedRule,
    };
  },
  {},
);

const completeRules = { ...originalRules, ...rulesToOverwriteWith };

module.exports = {
  extends: [
    'airbnb-base',
  ],
  rules: completeRules,
};
