<h1 align="center">
    <img alt="GoStack" src="https://github.com/ivanseibel/assets/blob/master/img/gostack10/bootcamp-header.png?raw=true" width="200px" />
</h1>

<h3 align="center">
  <img width="250px" src="../frontend/src/assets/logo.png" alt="Fastfeet">
  <p>Project: Fastfeet - Delivery Service (back-end)</p>
</h3>

<p align="center">
  <img alt="GitHub language count" src="https://img.shields.io/github/languages/count/ivanseibel/fastfeet">

  <a href="https://github.com/ivanseibel">
    <img alt="Made by Ivan Seibel" src="https://img.shields.io/badge/Made%20by-Ivan%20Seibel-blue">
  </a>

  <img alt="License" src="https://img.shields.io/github/license/ivanseibel/fastfeet?color=blue">

  <a href="https://github.com/ivanseibel/fastfeet/stargazers">
    <img alt="Stargazers" src="https://img.shields.io/github/stars/ivanseibel/fastfeet">
  </a>
</p>

# Index

- [1. Project General Description](#1-project-general-description)
- [2. User stories](#2-user-stories)
  - [2.1. Persona: Admin user](#21-persona-admin-user)
  - [2.2. Persona: Deliveryman user](#22-persona-deliveryman-user)
- [3. Non-functional Requirements](#3-non-functional-requirements)
- [4. Routes](#4-routes)
  - [4.1. Authentication](#41-authentication)
  - [4.2. Users](#42-users)
  - [4.3. Recipients](#43-recipients)
  - [4.4. Deliverymen](#44-deliverymen)
  - [4.5. Deliveries](#45-deliveries)
  - [4.6. Delivery Problems](#46-delivery-problems)
  - [4.7. Avatars](#47-avatars)
  - [4.8. Signatures](#48-signatures)
- [5. Technologies/libraries](#5-technologieslibraries)
- [6. How to run](#6-how-to-run)
- [7. License](#7-license)


# 1. Project General Description

This API is one part of three that implement an application for a delivery service company. This project is one of several constructed during GoStack Bootcamp, a course offered by [Rocketseat](http://www.rocketseat.com.br) that dive deep into one of most popular stacks to software development for web and mobile.

# 2. User stories

### 2.1. Persona: Admin user

- As administrator, I want to get access to the restricted screens of the system using my email and password.
- As administrator, I want to register a new recipient with the following information: name and full address.
- As administrator, I want to update the recipient registration information.
- As administrator, I want to delete a specific recipient.
- As administrator, I want to search for a recipient by his name.
- As administrator, I want to see a list of all registered recipients.
- As administrator, I want to register a new deliveryman with the following information: avatar, name and email.
- As administrator, I want to update the deliveryman registration information.
- As administrator, I want to delete a specific deliveryman.
- As administrator, I want to search for a delivery person by his name.
- As administrator, I want to see a list of all registered deliverers.
- As administrator, I want to register a new delivery with the following information: recipient, deliveryman and product.
- As administrator, I want to update the delivery registration information.
- As administrator, I want to exclude a specific delivery.
- As administrator, I want to search for a delivery by its product description.
- As administrator, I want to see a list of all deliveries registered with or without related problems.
- As administrator, I want to see a list of all delivery problems.
- As administrator, I want to see a detailed description of the problem for a specific delivery.
- As administrator, I want to cancel a specific delivery with one or more problems.

### 2.2. Persona: Deliveryman user

- As deliveryman, I want to get access to the restricted screens of the system using my ID.
- As deliveryman, I want to see deliveries attributed to me that I need to delivery.
- As deliveryman, I want to inform that a specific delivery was retired to be delivered.
- As deliveryman, I want to inform that a specific delivery was delivered.
- As deliveryman, I want to register an issue related with a spedific delivery.
- As deliveryman, I want to receive an email notification when one of my deliveries was canceled.


# 3. Non-functional Requirements

- An admin user must be created as the first user with default informations.
- Authenticity of the sessions must be validated usig some token security technology.
- Only Administrators and Deliverymen have a user to access the system.
- The delivery start date must be registered as soon as the product is removed by the delivery person, and withdrawals can only be made between 08:00 and 18:00.

# 4. Routes

## 4.1. Authentication

### POST: /sessions:

Create a new session with security token if user data are correct.

**Body request example:**

```json
{
  "email": "someuser@fastfeet.com",
  "password": "122448"
}
```

**Response example (200 OK):**

```json
{
  "user": {
    "id": 1,
    "name": "Some User",
    "email": "someusern@fastfeet.com",
    "admin": true
  },
  "token": "eyJhbGdiOiJIUI6IkpXVCJ9.eyJpZCI6M3MDA0OTN9.jp2iEYi9jcqUf57G1RsCIkS"
}
```

## 4.2. Users

### POST /users

Create a new user.

**Body request example:**

```json
{
  "name": "User1",
  "email": "user1@gmail.com",
  "password": "123456"
}
```

**Response example (200 OK):**

```json
{
  "id": 2,
  "name": "User1",
  "email": "user1@gmail.com",
  "admin": false
}
```

### PUT /users

Update user data.

**Body request example:**

```json
{
  "name": "User1",
  "avatar_id": 2,
  "oldPassword": "123456",
  "password": "000000",
  "confirmPassword": "000000"
}
```

**Response example (200 OK):**

```json
{
  "id": 1,
  "name": "User1",
  "admin": true
}
```

### GET /users

Get a list of users.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 20 records per page.

**Response example (200 OK):**

```json
[
  {
    "id": 2,
    "name": "User1",
    "email": "user1@gmail.com",
    "admin": false
  },
  {
    "id": 1,
    "name": "User1",
    "email": "admin@fastfeet.com",
    "admin": true
  }
]
```

## 4.3. Recipients

### POST: /recipients

Create a new recipient.

**Body request example:**

```json
{
  "name": "John Wayne",
  "street": "Colt Street",
  "number": 38,
  "complement": "Near cemetery",
  "state": "TX",
  "city": "Black Bull",
  "postal_code": "57160000"
}
```

**Response example (200 OK):**

```json
{
  "id": 1,
  "name": "John Wayne",
  "street": "Colt Street",
  "number": 38,
  "complement": "Near cemetery",
  "state": "TX",
  "city": "Black Bull",
  "postal_code": "57160000",
  "updatedAt": "2020-05-15T19:49:35.954Z",
  "createdAt": "2020-05-15T19:49:35.954Z"
}
```

### PUT: /recipients/:id

Update data of a specific recipient.

**Body request example:**
```json
{
  "name": "John Wayne",
  "street": "Colt Street",
  "number": 38,
  "complement": "Near cemetery",
  "state": "TX",
  "city": "Black Bull",
  "postal_code": "57160000"
}
```

**Response example (200 OK):**

```json
{
  "id": "1",
  "name": "John Wayne"
}
```

### GET: /recipients

Get a list of recipients.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 10 records per page.
- q (default = null): Recipient name text filter.

**Response example (200 OK):**
```json
{
  "count": 1,
  "rows": [
    {
      "id": 3,
      "name": "Jack Bauer",
      "street": "Twenty Four Hours St",
      "number": 24,
      "complement": "It's time",
      "state": "24",
      "city": "Fast City",
      "postal_code": "99999132"
    }
  ]
}
```

## 4.4. Deliverymen

### POST /deliverymen

Create a new deliveryman.

**Body request example:**

```json
{
  "name": "Deliveryman 2",
  "email": "deliveryman2@gmail.com"
  }
```

**Response example (200 OK):**

```json
{
  "id": 1,
  "name": "Deliveryman 2",
  "email": "deliveryman2@gmail.com",
  "updatedAt": "2020-03-04T17:41:42.380Z",
  "createdAt": "2020-03-04T17:41:42.380Z",
  "avatar_id": null
}
```

### PUT /deliverymen/:id

Update deliveryman data.

**Body request example:**

```json
{
  "name": "Deliveryman 01",
  "email": "deliveryman01@gmail.com"
}
```

**Response example (200 OK):**

```json
{
  "id": "1",
  "name": "Deliveryman 01"
}
```

### GET /deliverymen

Get a list of deliverymen.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 10 records per page.
- q (default = null): Deliveryman name text filter.

**Response example (200 OK):**

```json
{
  "count": 1,
  "rows": [
    {
      "id": 1,
      "name": "Deliveryman 01",
      "email": "deliveryman01@gmail.com",
      "createdAt": "2020-05-15T19:46:52.101Z",
      "updatedAt": "2020-05-25T21:28:55.400Z",
      "avatar_id": 1,
      "avatar": {
        "url": "http://localhost:3333/files/avatar.jpeg",
        "name": "original-name.jpeg",
        "path": "avatar.jpeg"
      }
    }
  ]
}
```

### DELETE /deliverymen/:id

Delete a specific deliveryman.

**Response example (200 OK):**

```json
{
  "id": 3,
  "name": "Deliveryman 3",
  "email": "deliveryman3@gmail.com",
  "createdAt": "2020-05-25T21:36:14.024Z",
  "updatedAt": "2020-05-25T21:36:14.024Z",
  "avatar_id": null
}
```

### GET /deliverymen/:id/deliveries

Get a deliveries list of a specific deliveryman.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 10 records per page.
- status (default = null):
  - 'canceled': get only canceled deliveries
  - 'delivered': get only delivered deliveries
  - 'pendent': get only deliveries not canceled and not delivered
  - null: get all deliveries.

**Response example (200 OK):**

```json
[
  {
    "id": 1,
    "product": "Leather Hat",
    "canceled_at": null,
    "start_date": "2020-05-21T21:49:00.000Z",
    "end_date": null,
    "recipient": {
      "id": 1,
      "name": "John Wayne"
    },
    "deliveryman": {
      "id": 1,
      "name": "Deliveryman 01"
    },
    "signature": null
  },
]
```

## 4.5. Deliveries

### POST /deliveries

Create a new delivery.

**Body request example:**

```json
{
  "product": "Coffee Mug",
  "deliveryman_id": 1,
  "recipient_id": 1
}
```

**Response example (200 OK):**

```json
{
  "id": 2,
  "product": "Coffee Mug",
  "recipient_id": 1,
  "deliveryman_id": 1
}
```

### PUT /deliveries/:id

Update delivery data.

**Body request example:**

```json
{
  "product": "Mouse",
  "deliveryman_id": 1,
  "recipient_id": 1
}
```

**Response example (200 OK):**

```json
{
  "status": "pendent",
  "id": 2,
  "product": "Mouse",
  "canceled_at": null,
  "start_date": "2020-05-21T21:49:00.000Z",
  "end_date": null,
  "createdAt": "2020-05-21T21:56:19.159Z",
  "updatedAt": "2020-05-26T17:59:29.550Z",
  "recipient_id": 1,
  "deliveryman_id": 1,
  "signature_id": null
}
```

### GET /deliveries

Get a deliveries list.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 10 records per page.
- q (default = null): Product name text filter.

**Response example (200 OK):**

```json
{
  "count": 1,
  "rows": [
    {
      "status": "pendent",
      "id": 1,
      "product": "Leather Hat",
      "end_date": null,
      "canceled_at": null,
      "start_date": "2020-05-21T21:49:00.000Z",
      "recipient": {
        "id": 1,
        "name": "John Wayne",
        "city": "Black Bull",
        "state": "TX"
      },
      "deliveryman": {
        "id": 1,
        "name": "Deliveryman 01",
        "avatar": {
          "url": "http://localhost:3333/files/avatar.jpeg",
          "path": "avatar.jpeg"
        }
      }
    }
  ]
}
```

### GET /deliveries/:id

Get data from a specific delivery.

**Response example (200 OK):**

```json
{
  "status": "pendent",
  "id": 2,
  "product": "Mouse",
  "canceled_at": null,
  "start_date": "2020-05-21T21:49:00.000Z",
  "end_date": null,
  "recipient": {
    "id": 1,
    "name": "John Wayne",
    "street": "Colt Street",
    "number": 38,
    "complement": "Near cemetery",
    "state": "TX",
    "city": "Black Bull",
    "postal_code": "57160000"
  },
  "deliveryman": {
    "id": 1,
    "name": "Deliveryman 01",
    "email": "deliveryman01@gmail.com",
    "createdAt": "2020-05-15T19:46:52.101Z",
    "updatedAt": "2020-05-25T21:28:55.400Z",
    "avatar_id": 1
  },
  "signature": null
}
```

### DELETE /deliveries/:id

Delete a specific delivery.

**Response example (200 OK):**

```json
{
  "status": "pendent",
  "id": 4,
  "product": "Coffee Mug",
  "canceled_at": null,
  "start_date": null,
  "end_date": null,
  "createdAt": "2020-05-26T18:07:48.644Z",
  "updatedAt": "2020-05-26T18:07:48.644Z",
  "recipient_id": 1,
  "deliveryman_id": 1,
  "signature_id": null
}
```

### PUT /deliveries/:id/start

Deliveryman start delivery process for a specific delivery.

**Body request example:**

```json
{
  "start_date": "2020-05-26T15:14:00-03:00"
}
```

**Response example (200 OK):**

```json
{
  "status": "pendent",
  "id": 1,
  "product": "Leather Hat",
  "canceled_at": null,
  "start_date": "2020-05-26T18:14:00.000Z",
  "end_date": null,
  "createdAt": "2020-05-15T19:50:33.956Z",
  "updatedAt": "2020-05-26T18:15:02.194Z",
  "recipient_id": 1,
  "deliveryman_id": 1,
  "signature_id": null
}
```

### PUT /deliveries/:id/end

Deliveryman end delivery process for a specific delivery.

**Body request example:**

```json
{
  "end_date": "2020-05-26T15:20:00-03:00"
}
```

**Response example (200 OK):**

```json
{
  "status": "delivered",
  "id": 1,
  "product": "Leather Hat",
  "canceled_at": null,
  "start_date": "2020-05-26T18:14:00.000Z",
  "end_date": "2020-05-26T18:20:00.000Z",
  "createdAt": "2020-05-15T19:50:33.956Z",
  "updatedAt": "2020-05-26T18:37:21.592Z",
  "recipient_id": 1,
  "deliveryman_id": 1,
  "signature_id": null
}
```

## 4.6. Delivery Problems

### POST /delivery/:id/problems

Create a new delivery problem to a specific delivery.

**Body request example:**

```json
{
  "description": "This problem is very important as well!"
}
```

**Response example (200 OK):**

```json
{
  "id": 4,
  "description": "This problem is very important as well!",
  "delivery_id": "2",
  "updatedAt": "2020-05-26T18:50:34.052Z",
  "createdAt": "2020-05-26T18:50:34.052Z",
  "DeliveryId": 2
}
```

### GET /delivery/problems

Get all delivery problems.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 10 records per page.
- q (default = null): Problem description text filter.

**Response example (200 OK):**

```json
{
  "count": 2,
  "rows": [
    {
      "id": 2,
      "product": "Mouse",
      "problem": [
        {
          "id": 3,
          "description": "Lorem ipsum dolor sit amet, consectetur ... "
        },
        {
          "id": 4,
          "description": "This problem is very important as well!"
        }
      ]
    }
  ]
}
```

### GET /delivery/:id/problems

Get all problems from a specific delivery.

**Query options:**

- page (default = 1): Page number, with a fixed limit of 10 records per page.
- q (default = null): Problem description text filter.

**Response example (200 OK):**

```json
{
  "count": 2,
  "rows": [
    {
      "id": 2,
      "product": "Mouse",
      "problem": [
        {
          "id": 3,
          "description": "Lorem ipsum dolor sit amet, consectetur ... "
        },
        {
          "id": 4,
          "description": "This problem is very important as well!"
        }
      ]
    }
  ]
}
```

### DELETE /problem/:id/cancel-delivery

Cancel a specific delivery with problem.

**Response example (200 OK):**

```json
{
  "status": "canceled",
  "id": 2,
  "product": "Coffee Mug",
  "canceled_at": "2020-05-23T18:33:38.145Z",
  "start_date": "2020-05-21T21:49:00.000Z",
  "end_date": null,
  "createdAt": "2020-05-21T21:56:19.159Z",
  "updatedAt": "2020-05-23T18:33:38.146Z",
  "recipient_id": 1,
  "deliveryman_id": 1,
  "signature_id": null,
  "recipient": {
    "name": "John Wayne"
  },
  "deliveryman": {
    "name": "Ivan",
    "email": "ivan@fastfeet.com"
  },
  "problem": [
    {
      "id": 3,
      "description": "Lorem ipsum dolor sit amet, consectetur ... "
    }
  ]
}
```
## 4.7. Avatars

### POST /avatars

Create a new deliveryman avatar.

**Content-Type: multipart/form-data**

file: data

**Response example (200 OK):**

```json
{
  "url": "http://localhost:3333/files/file.jpeg",
  "id": 1,
  "name": "original-name.jpeg",
  "path": "file.jpeg",
  "updatedAt": "2020-03-04T17:42:02.895Z",
  "createdAt": "2020-03-04T17:42:02.895Z"
}
```

### PUT /avatars/:id

Update the avatar file for a specific deliveryman avatar.

**Content-Type: multipart/form-data**

file: data

**Response example (200 OK):**

```json
{
  "url": "http://localhost:3333/files/file.jpeg",
  "id": 1,
  "name": "original-name.jpeg",
  "path": "file.jpeg",
  "updatedAt": "2020-03-04T17:42:02.895Z",
  "createdAt": "2020-03-04T17:42:02.895Z"
}
```

## 4.8. Signatures

### POST /signatures

Create a new signature.

**Content-Type: multipart/form-data**

file: data

**Response example (200 OK):**

```json
{
  "url": "http://localhost:3333/files/file.jpeg",
  "id": 1,
  "name": "original-name.jpeg",
  "path": "file.jpeg",
  "updatedAt": "2020-03-04T17:42:02.895Z",
  "createdAt": "2020-03-04T17:42:02.895Z"
}
```

### PUT /signatures/:id

Update the signature file for a specific signature.

**Content-Type: multipart/form-data**

file: data

**Response example (200 OK):**

```json
{
  "url": "http://localhost:3333/files/file.jpeg",
  "id": 1,
  "name": "original-name.jpeg",
  "path": "file.jpeg",
  "updatedAt": "2020-03-04T17:42:02.895Z",
  "createdAt": "2020-03-04T17:42:02.895Z"
}
```

# 5. Technologies/libraries

## 5.1. Technologies

### 5.1.1. Databases

- PostgreSQL: API data persistency.
- Redis: Queue data management persistency.

## 5.2. Libraries
- Prettier: Code formatter.
- Eslint: Code patterns identifier.
- Nodemon: Live reload.
- Sucrase: An alternative to Babel that allows super-fast development builds. In this project sucrase was applied to be able to use `import from` syntax, instead of the `require` syntax, and `export` in instead of `module.exports`.
- Sentry: Express error tracking.
- Bee-queue: Redis-backed job queue to queue non-priority jobs like email sent and error tracking.
- Cors: providing a Connect/Express middleware that can be used to enable CORS with various options.
- Date-fns: Modern JavaScript date utility library.
- Dotenv: A zero-dependency module that loads environment variables from a .env file into process.env.
- Express: Server framework for Node.js to build web applications and API's.
- Express-async-errors: Async/await error handling support for express.js.
- Express-handlebars: View engine for Express to create emails with dynamic html.
- Jsonwebtoken: JWT to code and decode web tokens.
- Multer: Handle multipart/form-data to upload signature and avatar files.
- Nodemailer: Allow easy email sending.
- Nodemailer-express-handlebars: Handlebars integration with nodemailer.
- Pg: PostgreSQL client for Node.js.
- Pg-hstore: A node package for serializing and deserializing JSON data to hstore format.
- Sequelize: Promise-based ORM to persist data into a PostgreSQL database.
- Youch: Pretty error reporting.
- Yup: Data validation.

# 6. How to run

Clone this repository:

$ git clone https://github.com/ivanseibel/fastfeet

Get inside the new created folder "fastfeet/backend"

```bash
$ cd fastfeet/backend
```

Configure your .env file using template .env.template.

Install all components:

```bash
$ yarn
```

Run the app:

```bash
$ yarn dev
```

Run the queue management:

```bash
$ yarn dev:queue
```

# 7. License

This project is under MIT license.
