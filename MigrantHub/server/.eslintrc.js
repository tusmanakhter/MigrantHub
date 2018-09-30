module.exports = {
    "env": {
        "node": true
    },
    "extends": "airbnb-base",
    "rules": {
        "no-unused-vars": ["error", { "argsIgnorePattern": "next" }]
    }
};