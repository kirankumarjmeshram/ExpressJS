# Express.js Request and Response Object Properties

## Request (`req`) Object

### `req.params`

* **Type** : Object
* **Description** : Contains route parameters. These are named segments of the URL, defined in the route path by a colon (`:`), and their values are populated based on the actual URL requested by the client.
* **Example** : For a route defined as `/users/:userId`, `req.params.userId` will contain the value provided in the URL.

### `req.query`

* **Type** : Object
* **Description** : Contains query string parameters. These are key-value pairs appended to the URL after a question mark (`?`).
* **Example** : For a URL `/search?term=node`, `req.query.term` will be `'node'`.

### `req.body`

* **Type** : Object
* **Description** : Contains data sent in the body of the request. This is usually used with POST, PUT, or PATCH requests and is populated by middleware such as `body-parser` or `express.json()`.
* **Example** : If a POST request sends JSON data `{ "name": "John" }`, `req.body.name` will be `'John'`.

### `req.headers`

* **Type** : Object
* **Description** : Contains the headers sent by the client.
* **Example** : `req.headers['content-type']` might be `'application/json'`.

### `req.method`

* **Type** : String
* **Description** : Contains the HTTP method of the request (e.g., 'GET', 'POST', 'PUT', 'DELETE').
* **Example** : `req.method` for a GET request will be `'GET'`.

### `req.url`

* **Type** : String
* **Description** : Contains the full URL of the request.
* **Example** : If the request URL is `/users/123`, `req.url` will be `/users/123`.

## Response (`res`) Object

### `res.status(code)`

* **Type** : Function
* **Description** : Sets the HTTP status code for the response.
* **Example** : `res.status(404)` sets the status code to 404 (Not Found).

### `res.send(body)`

* **Type** : Function
* **Description** : Sends a response body and automatically sets the `Content-Type` based on the input.
* **Example** : `res.send('Hello World')` sends a plain text response.

### `res.json(obj)`

* **Type** : Function
* **Description** : Sends a JSON response.
* **Example** : `res.json({ name: 'John' })` sends a JSON object.

### `res.redirect(url)`

* **Type** : Function
* **Description** : Redirects the client to a different URL.
* **Example** : `res.redirect('/login')` redirects the client to the `/login` page.

### `res.set(field, value)`

* **Type** : Function
* **Description** : Sets a response header.
* **Example** : `res.set('Content-Type', 'application/json')` sets the `Content-Type` header to `application/json`.

### `res.cookie(name, value, [options])`

* **Type** : Function
* **Description** : Sets a cookie.
* **Example** : `res.cookie('token', '123456')` sets a cookie named `token` with the value `123456`.

## Summary

These properties and methods are essential for handling HTTP requests and generating responses in a web application built with Express.js. They provide a convenient way to access and manipulate various parts of the HTTP request and response cycle.
