# Tailwind + DaisyUI Set up

In this guide we will install Tailwind CSS and Daisy UI. 

https://tailwindcss.com/

Tailwind Component Libaries
- https://daisyui.com/
- https://tailwind-elements.com/
- https://tailwindcomponents.com/

Based on: https://daily.dev/blog/how-to-use-tailwindcss-with-node-js-express-and-pug#add-tailwindcss

## Steps
- First, we install Express and create an Express App.
- We install the EJS templating engine and use it in our app. This will automatically search for ejs files in the views folder. 

app.js
```JS
  app.set('view engine', 'ejs');
```

- We expose the public folder so that it is publicly accessible. This folder will be used to serve static content such as CSS and JS.

app.js
```JS
app.use(express.static(path.join(__dirname, 'public')))
```

- We install tailwind + other dependencies

```
npm install tailwindcss postcss autoprefixer postcss-cli
```

- We install DaisyUI

```
npm i -D daisyui@latest
```

- We run the following command. This creates a tailwind.config.js file

```
npx tailwindcss init
```

- We modify the tailwind.config.js file so that it looks for ejs files in our views folder. This will allow it to apply tailwind styles to the folder. We also add the DaisyUI plugin. 

tailwind.config.js
```JS
/** @type {import('tailwindcss').Config} */
module.exports = {
  content: ["./views/*.{html,js,ejs}"],
  theme: {
    extend: {},
  },
  plugins: [require("daisyui")],
}
```

- We create the following files. All files should be in the main directory unless the folders are specified. 

postcss.config.js
```JS
module.exports = {
  plugins: [
    require('tailwindcss'),
    require('autoprefixer'),
  ]
}
```

public/styles/tailwind.css
```
@tailwind base;
@tailwind components;
@tailwind utilities;
```

public/styles/style.css (Empty file)

- We add the following to the scripts portion of our `package.json` file. Then, we can run `npm run tailwind:css` to build our custom CSS file and output it to `style.css`. 

```
"tailwind:css": "postcss public/styles/tailwind.css -o public/styles/style.css"
```

- In our EJS files, we import the output CSS file as a stylesheet. Since we have already exposed the public folder in the previous steps, we cannot reference the full path (public/styles/style.css). Instead we must use the relative path to the public folder (styles/style.css)

  ```HTML
  <link href="/styles/style.css" rel="stylesheet">
  ```
