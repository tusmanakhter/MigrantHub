module.exports = {
    "env": {
        "browser": true,
        "jest": true
    },
    "extends": "airbnb",
    "parser": "babel-eslint",
    "rules": {
        "react/jsx-filename-extension": [1, { "extensions": [".js", ".jsx"] }],
        "linebreak-style": 0,
        "no-underscore-dangle": 0,
        "consistent-return": 0,
        "import/no-extraneous-dependencies": ["error", {"devDependencies": true, "optionalDependencies": true, "peerDependencies": false}]
    }
};