module.exports = {
    "env":{
        "browser":true,
        "node":true,
        "commonjs":true,
        "es6":true
    },
    "extends":"eslint:recommended",
    "parser":"babel-eslint",
    "parserOptions":{
        "ecmaVersion":"7",
        "sourceType":"module",
        "ecmaFeatures":{
            "jsx":true,
            "legacyDecorators": true
        }
    },
    "plugins":[
        "react"
    ]
};
