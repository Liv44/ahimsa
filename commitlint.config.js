// commitlint.config.js
module.exports = {
    extends: ['@commitlint/config-conventional'],
    rules: {
        'type-enum': [2, 'always', ['feat', 'fix', 'docs', 'chore', 'refactor', 'test', 'style']],
        'subject-case': [2, 'never', ['sentence-case', 'start-case', 'pascal-case']],
        'scope-empty': [2, 'never']
    }
};
