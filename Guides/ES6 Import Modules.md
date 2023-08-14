# ES6 Import Modules

In JavaScript, we used to import / export libraries using the `require` and `module.exports` syntax

```JS
const express = require('express');

// Some Function
const greeting = 'Hello';

module.exports = greeting;
```

In ES6, we use the import / export syntax

```JS
import { message } from './es6-export-named';

const greeting = 'Hello';

export default greeting;
```

It is not advisable to mix and match the 2 syntaxes. Since ES6 is the new version and a lot of documentation is written in ES6, we should strive to use ES6. 

To enable ES6 modules in Node JS, we can do either of the following:
- Add `"type": "module" ` to `package.json`. This allows node to enable ES6 modules in all JS files.
- Save the JS files with `.mjs` extension. 

# Babel

https://www.robinwieruch.de/minimal-node-js-babel-setup/

Babel is a transpiler that translates our code to plain JS. If we use advanced JS features in our code, Babel will convert it to plain, vanilla JS that is understood by all browsers.

Babel is useful as it allows us to mix and match ES6 syntax and the older 'require' syntax. 

For more details see `index.js` in the Babel folder. 

### Using Babel with Nodemon
The Nodemon library will auto-restart our server when it detects any code changes in JS files. 

We install the nodemon library, the core babel library and the most commonly used babel preset. 

```
npm install nodemon --save-dev
npm install @babel/core @babel/node --save-dev
npm install @babel/preset-env --save-dev
```

In `package.json`, we modify our npm start script so that it uses nodemon to watch for code changes and babel to transpile code. 

```JSON
 "scripts": {
    "start": "nodemon --exec babel-node src/index.js",
    "test": "echo \"Error: no test specified\" && exit 1"
  },
```

In the project's root folder, we create a `.babelrc` file and define Babel config

```
{
  "presets": [
    "@babel/preset-env"
  ]
}
```




