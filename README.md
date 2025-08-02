# Blog-Platform-API

Blog-Platform-API is a backend project developed as an assignment for the EBpearls backend traineeship screening. It is built using Node.js, Express.js, and MongoDB.

## Installation

To set up the project locally, run:

```bash
npm install
```

## Running the Project

Start the server with either of these commands:

```bash

npm start
```
or
```bash
node index.js

```

## API Routes & Features

The API is organized into three main routes:

* **Auth**: Handles user authentication (signup, signin).
* **Blog**: Allows creating, updating, deleting, and fetching blog posts.
* **Comment**: Supports adding, updating, and deleting comments on blog posts.

> **Note:** Creating, updating, or deleting blogs and comments requires authentication. This is enforced by middleware that validates the user's bearer token.

## Technologies Used

* Node.js
* Express.js
* MongoDB