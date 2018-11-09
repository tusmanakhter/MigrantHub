module.exports = {
    "env": {
        "node": true,
        "mocha": true,
    },
    "extends": "airbnb-base",
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }],
        "linebreak-style": 0,
        "indent": ["error", 2],
        "no-underscore-dangle": 0,
        "consistent-return": 0,
    }
};