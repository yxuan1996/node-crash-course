# Node Crash Course

https://www.youtube.com/playlist?list=PL4cUxeGkcC9jsz4LDYc6kv3ymONOKxwBU

Full code: https://github.com/iamshaunjp/node-crash-course/tree/lesson-12

Based on the Net Ninja Youtube Playlist

## 1-basics

### Globals
Node Globals are objects that are available in all modules. They include timers as well as access to the filesystem. 

#### Timers
Delay by 3 seconds `setTimeout()`
```JS
global.setTimeout(() => {
   console.log('in the timeout');
}, 3000);
```

Run every 1 second using `setInterval()`
```JS
const int = setInterval(() => {
  console.log('in the interval');
}, 1000);
```

Stop the `setInterval()` loop after 3 seconds using `clearInterval()`
```JS
setTimeout(() => {
  console.log('stop the Interval');
  clearInterval(int);
}, 3000);
```

#### Directory and Files
Get Directory Path
```JS
console.log(__dirname);
```

Get Current Node Filename
```JS
console.log(__filename);
```

### Import Export
- In `people.js` we create some data and export it. 
- In `modules.js` we import the data using the `require` statement. 

### Filesystem
First we import the filesystem module, which allows us to perform a variety of tasks on files. 
```JS
const fs = require('fs');
```

- Read Files
- Write to Files
- Directories
- Delete Files

See `files.js`

### Streaming Data
Streams are used to transfer a large piece of data in chunks called buffers. 
This allows us to start using the data before the entire transfer completes. 
Examples: Youtube streaming video is loaded in chunks. 

See `streams.js`

- Create a stream (CreateWriteStream)
- Read from a stream (CreateReadStream)

## 2-server

Note that the code below does not send any response to the browser. It only logs requests to the console. 

```JS
const http = require('http');

const server = http.createServer((req, res) => {
  // Log a message to the console whenever a request comes in
  console.log('request made');
});

// args are [port number, hostname]
server.listen(3000, 'localhost', () => {
  console.log('listening for requests on port 3000');
});
```

## 3-Requests and Responses

All requests and responses should be handled within `http.createServer()`

Obtaining the route and method of incoming requests
```JS
console.log(req.url, req.method);
```

### Respond with HTML file

First, we set the content header type
```JS
res.setHeader('Content-Type', 'text/html');
```

- We import filesystem and use it to read the contents of a HTML file. 
- Next, we use `res.write()` to write the data that we want to respond with. 
- We use `res.end()` once we have finished writing all of the response data. 

```JS
 fs.readFile('./views/index.html', (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    res.write(data);
    res.end();
  });
```

### Routing
Using a switch statement, we inspect the incoming request url and route it the appropriate response. 

We also see how we can redirect pages (/about-us)

```JS
  // routing
  let path = './views/';
  switch(req.url) {
    case '/':
      path += 'index.html';
      res.statusCode = 200;
      break;
    case '/about':
      path += 'about.html';
      res.statusCode = 200;
      break;
    case '/about-us':
      res.statusCode = 301;
      res.setHeader('Location', '/about');
      res.end();
      break;
    default:
      path += '404.html';
      res.statusCode = 404;
  }

  // send html
  fs.readFile(path, (err, data) => {
    if (err) {
      console.log(err);
      res.end();
    }
    //res.write(data);
    res.end(data);
  });
```

## 4-NPM

Browse NPM packages and documentation here: https://www.npmjs.com/

Useful utility library - Lodash

### Creating an NPM Project

First, we create an empty folder/directory and start our npm project
```
npm init --yes
```

Installing Modules
```
npm install express
```

Install Package Globally
```
npm install -g nodemon
```

## 5-Express JS (Important)

Express JS is the easier and preferred way of setting up a node server, since it makes things like routing a lot easier. 

First, we install the express JS module

```
npm install --save express
```

Then in app.js file or wherever you want to use it add this code snippet
```javascript
const express = require('express');
app = express();

//listen for requests
app.listen(PORT_NUMBER);

```

### Basic Anatomy of a route
We use `app.get()` to define a route, and response by sending a HTML file. If we are using relative paths, we need to provide the root path as the second argument. 

```JS
app.get('/', (req, res) => {
  res.sendFile('./views/index.html', { root: __dirname });
});
```

We use `res.redirect()` for redirects. 

`app.use()` will be used for any route that is not defined. We will use it to return our 404 page.
Since node runs line-by-line, `app.use()` has to be placed last, or else it will run first and skip the other routes.  


## 6-View Engines
View Engines, aka Templating Engines, allow us to inject dynamic content and variables into HTML templates before sending them to the browser. 

We will be using the EJS engine. 

```
npm install ejs
```

After initializing an express app, we set the templating engine as ejs. By default, it looks for views in the `views` folder. 
```JS
app.set('view engine', 'ejs');
```

If we want to use another folder to store our views, we need to set the new folder
```JS
app.set('views', 'NEW_FOLDER');
```

### Passing Data Into Views
We pass parameters into an ejs template and render it. The parameters are usually in JSON form / /key value pairs. 

`res.render('TEMPLATE_NAME', {DATA_TO_BE_PASSED})`

```JS
app.get('/', (req, res) => {
  const blogs = [
    {title: 'Yoshi finds eggs', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'Mario finds stars', snippet: 'Lorem ipsum dolor sit amet consectetur'},
    {title: 'How to defeat bowser', snippet: 'Lorem ipsum dolor sit amet consectetur'},
  ];
  res.render('index', { title: 'Home', blogs });
});
```

### Retrieving Values from inside the EJS File

We can use use script tags in EJS files `<% code goes here  %>` to run JS code (No output). This is useful for if else statements and control flows. 

We use `<%= code goes here %>` to output the value of the expression in the HTML template. 

```HTML
<head>
  <title><%= title %></title>
</head>
```

- Input: JSON list
- We iterate through each element in the list and output it into a HTML component. 
- We use if else conditionals to control the rendering.

```HTML
<% if (blogs.length > 0) { %>
  <% blogs.forEach(blog => { %>
    <a class="single" href="/blogs/<%= blog._id %>">
      <h3 class="title"><%= blog.title %></h3>
      <p class="snippet"><%= blog.snippet %></p>
    </a>
  <% }) %>
<% } else { %>
  <p>There are no blogs to display...</p>
<% } %>

```

### Partials 

Partials are reusable code snippets / components that can be reused in EJS files

Including Partials
```
<%- include("./partials/nav.ejs") %>
```

## 7-Middleware

Middleware is code that runs on a server in between getting a request and returning a response. 

In general, we use `app.use(function)` to run middleware code. This will run for all routes. 

To run middleware for specific routes only, we use `app.get('/', function)`

Middleware use cases:
- Log details of every request
- Authentication check for protected routes
- parse JSON data from requests

### next()
When using middleware `app.use()`, the server will get stuck as it does not know what is the next route to take. To solve this problem, we add an extra `next` argument to `app.use()`, and call the `next()` function after running all of the middleware. 

Note that we can chain multiple middleware, one after another. 

```JS
app.use((req, res, next) => {
  console.log('new request made:');
  console.log('host: ', req.hostname);
  console.log('path: ', req.path);
  console.log('method: ', req.method);
  next();
});

app.use((req, res, next) => {
  console.log('in the next middleware');
  next();
});
```

### 3rd Party Middleware

https://blog.logrocket.com/express-middleware-a-complete-guide/
Important, has CORS guide

#### Morgan

Morgan is a middleware that generates logs for each incoming request

```
npm install morgan
```

```JS
const morgan = require("morgan")

const app = express();

// Middlewares
app.use(morgan("dev"))
```

#### Helmet

Helmet is a middleware that protects express JS apps by securing HTTP response headers. 

```
npm install helmet
```

```JS
const helmet = require("helmet");
const app = express();
app.use(helmet());
```

#### CORS

```
npm install cors
```

```JS
const cors = require("cors");
const app = express();
app.use(cors())
```


Using `app.use(cors())` allows requests from any origin. 

We can also whitelist certain domains and ports

```JS
// whitelist
const whitelist = ['http://localhost:3000', 'http://localhost:3001']
const corsOptions = {
  origin: function (origin, callback) {
    if (whitelist.indexOf(origin) !== -1) {
      callback(null, true)
    } else {
      callback(new Error('Not allowed by CORS'))
    }
  }
}
app.use(cors(corsOptions));
```

#### Express Rate Limit
Rate limiting helps prevent brute force attacks on the server or DDoS attackers. It prevents repeated API requests from the same IP address. 

```
npm install --save express-rate-limit
```

```JS
const rateLimit = require("express-rate-limit");

const limiter = rateLimit({
    windowMs: 60 * 1000, // 1 minute
    max: 2, // limit each IP to 2 requests per windowMs
    message: "Too many accounts created from this IP, please try again after a minute"
  });
```

We can choose to apply our rate limiter to all requests or specific requests
```JS
//  apply to all requests
app.use(limiter); 

// only apply to requests that begin with /api/
app.use("/api/", limiter);
```

#### Server Favicon
```
npm install serve-favicon
```

```JS
var favicon = require('serve-favicon')

app.use(favicon('favicon.ico'))
```

#### Serve Static Files

By default, files that are stored in the Node JS server are not exposed to the public. 

This can be problematic when we want to link static files, such as CSS stylesheets, or enable public document downloads. 

We use a built-in express middleware to expose the `public` folder to the public

```JS
app.use(express.static('public'));
```

Next, we create a `public` folder in the main directory of the project.

When linking a CSS file in our EJS, we use the following code. We do not need to specify `/public/` as EJS will automatically look for the file in the public folder. 

```HTML
<link rel='stylesheet' href='/styles.css' >
```

We can also access any file in the public folder from the browser
```
localhost:3000/styles.css
```

## 8-MongoDB
We will use MongoDB as a noSQL database for our project. 

First, we create a free database cluster in MongoDB and create a new collection (table), 

### Connecting to the Database
We install the Mongoose ORM and use it to connect to our Database
```
npm install mongoose
```

```JS
const mongoose = require('mongoose');

const app = express();

// Connect using the connection string
// Replace <password> with the correct password
const dbURI = "mongodb+srv://nodeadmin:<password>@nodecrashcourse.g8nrrcw.mongodb.net/?retryWrites=true&w=majority";

// Connect with the Connection String URL
// Second argument is to suppress the deprecation warnings
// We want to listen to incoming requests only after connecting to the database, therefore, we place app.listen in the then() function. 
mongoose.connect(dbURI, { useNewUrlParser: true, useUnifiedTopology: true })
  .then(result => app.listen(3000))
  .catch(err => console.log(err));

```

### Defining the Schema
In `./models/blog.js` we define the data schema. The schema allows us to define data types and validations. 

### Getting and Setting Data

#### Set (Create) a new Data entry
To get or set data on MongoDb collections, you need to first import your model files into your app.js file

1) Import the model schema that we have defined previously, such as `Blog`:
````JS
const Blog = require('./models/blog');
````

2) Inside `app.get('/add-blog')`, when we receive an incoming request to this route, we create an instance of the model object. 
````JS
const blog = new Blog({
    title: 'new blog',
    snippet: 'about my new blog',
    body: 'more about my new blog'
  })
````

3) Save the newly created document to DB using `.save()` method provided by Mongoose library
```JS
blog.save()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
```

#### Select all data
```JS
app.get('/all-blogs', (req, res) => {
  Blog.find()
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
```

#### Select one data by id
```JS
app.get('/single-blog', (req, res) => {
  Blog.findById('5ea99b49b8531f40c0fde689')
    .then(result => {
      res.send(result);
    })
    .catch(err => {
      console.log(err);
    });
});
```

## 9-POST and DELETE

### POST Requests
We use POST requests to handle form data submissions. 

First, we create a form in `create.ejs`. Be sure to define the following:
- action path
- method='POST'
- id for the inputs

```HTML
<div class="create-blog content">
    <form action="/blogs" method="POST">
      <label for="title">Blog title:</label>
      <input type="text" id="title" name="title" required>
      <label for="snippet">Blog snippet:</label>
      <input type="text" id="snippet" name="snippet" required>
      <label for="body">Blog body:</label>
      <textarea id="body" name="body" required></textarea>
      <button>Submit</button>
    </form>
</div>
```

In `app.js`, we use the urlencoded middleware. This allows us to pass JSON objects as parameters. 
```JS
app.use(express.urlencoded({ extended: true }));
```

Lastly we create a POST route in `app.js` and create a new database object from the form data. 

```JS
app.post('/blogs', (req, res) => {
  // console.log(req.body);
  const blog = new Blog(req.body);

  blog.save()
    .then(result => {
      res.redirect('/blogs');
    })
    .catch(err => {
      console.log(err);
    });
});
```

### Route Parameters

Route Parameters refers to the dynamic part of the route

Route Parameter example:
```
localhost:3000/blogs/:id
```

- In `index.ejs` we iterate over each blog post and display each blog item. 
- We wrap each blog item with `<a>` links, using the blog id as the hyperlink. 

```HTML
<a class="single" href="/blogs/<%= blog._id %>">
  <h3 class="title"><%= blog.title %></h3>
  <p class="snippet"><%= blog.snippet %></p>
</a>
```

- When a blog item is clicked, the route `/blogs/:id` is triggered. 
- We obtain the id from the route parameters, and use it to query the database. 
- The blog data that is returned is passed into the `details.ejs` template. 

```JS
app.get('/blogs/:id', (req, res) => {
  const id = req.params.id;
  Blog.findById(id)
    .then(result => {
      res.render('details', { blog: result, title: 'Blog Details' });
    })
    .catch(err => {
      console.log(err);
    });
});;
```

### Delete Requests

- In `details.ejs`, we create an `<a>` link to delete a particular blog entry. 
- We specify the blog id as a data attribute in the `<a>` link. 
- In Javascript, we query for the `<a>` link and add an event listener to it. 
- When the link is clicked, we call the DELETE `/blogs/:id` route in app.js and redirect to the main blogs page. 
- We use the `fetch()` function to make an API call using an AJAX request. 
- Note that when we use an AJAX request, we cannot use `res.send()` or `res.redirect()` in app.js. Instead, we need to send JSON or text data back to the browser. We will handle the redirect in the browser side JS (`.then()`) after the request is completed. 

details.ejs
```JS
<div class="details content">
    <h2><%= blog.title %></h2>
    <div class="content">
      <p><%= blog.body %></p>
    </div>
    <a class="delete" data-doc="<%= blog._id %>">delete</a>
</div>


// Javascript section
const trashcan = document.querySelector('a.delete');

trashcan.addEventListener('click', (e) => {
  const endpoint = `/blogs/${trashcan.dataset.doc}`;

  fetch(endpoint, {
    method: 'DELETE',
  })
  .then(response => response.json())
  .then(data => window.location.href = data.redirect)
  .catch(err => console.log(err));
});
```

app.js
```JS
app.delete('/blogs/:id', (req, res) => {
  const id = req.params.id;
  
  Blog.findByIdAndDelete(id)
    .then(result => {
      res.json({ redirect: '/blogs' });
    })
    .catch(err => {
      console.log(err);
    });
});

```

## 10-Express Router and MVC

### Router
Routers allow us to tidy up our code by moving all related routes (/blogs) to a separate router file. 

We create a folder named `routes` and create the `blogRoutes.js` file. 

- We import express, import the router and then define the routes. 
- For each of the route, we replace `app.get()` with `router.get()`
- Lastly we export the router so that it can used elsewhere. 

blogRoutes.js
```JS
// Import Express
const express = require('express');

// Import Router
const router = express.Router();

// Define blog routes
router.get('/create', blogController.blog_create_get);
router.get('/', blogController.blog_index);
router.post('/', blogController.blog_create_post);
router.get('/:id', blogController.blog_details);
router.delete('/:id', blogController.blog_delete);

// Export the Router
module.exports = router;
```

In `app.js` we import `blogRoutes.js` and make all of the blog related routes (/blogs) use the router. 

```JS
// Import the Routes File
const blogRoutes = require('./routes/blogRoutes');

// blog routes
app.use('/blogs', blogRoutes);
```

### Controllers
Similar to what we did with routers, we create the controllers folder and move some of our code to `blogController.js`

New flow for incoming requests
- Incoming requests are directed to our Routes file.
- The Routes file calls the appropriate controller function based on the request path. 
- The controller function acts as an interface between the model and the view. It queries the database model and returns data to the view, or it gets input data and saves it into the database model. 

## Additional Notes

### Useful Libraries

Express Async Handler
```
npm i express-async-handler
```

Express Async Handler allows you to use Async functions in Express Routes / controllers. It also simplifies error handling, since we do not need to deal with try / catch blocks. 

```JS
express.get('/', asyncHandler(async (req, res, next) => {
    const bar = await foo.findAll();
    res.send(bar)
}))
```

https://zellwk.com/blog/async-await-express/


