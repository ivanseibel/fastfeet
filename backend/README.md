<h1 align="center">
    <img alt="GoStack" src="https://github.com/ivanseibel/assets/blob/master/img/gostack10/bootcamp-header.png?raw=true" width="200px" />
</h1>

<h3 align="center">
  <img width="250px" src="../frontend/src/assets/logo.png" alt="Fastfeet">
  <p>Project: Fastfeet - Delivery Service (backend)</p>
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

### Status: :construction_worker: :construction: under construction :construction: :construction_worker:

# Topics

- [1. Project General Description](#1.-project-general-description)
- [2. User stories](#2.-user-stories)
- [3. Non-functional Requirements](#3.-non-functional-requirements)
- [4. Routes](#4.-routes)
  - [4.1. Authentication](#4.1.-authentication)
  - [4.2. Users](#4.2.-users)
  - [4.3. Recipients](#4.3.-recipients)
  - [4.4. Deliverymen](#4.4.-deliverymen)

# 1. Project General Description

This API is one part of three that implement an application for a delivery service company. This project is one of several constructed during GoStack Bootcamp, a course offered by [Rocketseat](http://www.rocketseat.com.br) that dive deep into one of most popular stacks to software development for web and mobile.

# 2. User stories

### Persona: Users

- As an user, I want to get access to the restricted screens of the system using my email and password.

### Persona: Admin user

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

### Persona: Deliveryman user

- As deliveryman, I want to see deliveries attributed to me that I need to delivery.
- As deliveryman, I want to inform that a specific delivery was retired to be delivered.
- As deliveryman, I want to inform that a specific delivery was delivered.
- As deliveryman, I want to register an issue related with a spedific delivery.
- As deliveryman, I want to receive an email notification when one of my deliveries was canceled.


# Non-functional Requirements

- An admin user must be created as the first user with default informations.
- Authenticity of the sessions must be validated usig some token security technology.
- Only Administrators and Deliverymen have a user to access the system.
- The delivery start date must be registered as soon as the product is removed by the delivery person, and withdrawals can only be made between 08:00 and 18:00.

# Routes

## Authentication

### POST: /sessions:

Create a new session with security token if user data are correct.

Body request example:

```json
{
  "email": "someuser@fastfeet.com",
  "password": "122448"
}
```

Response example (200 OK):

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

## Users

### POST /users

Create a new user.

Body request example:

```json
{
  "name": "User1",
  "email": "user1@gmail.com",
  "password": "123456"
}
```

Response example (200 OK):

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

Body request example:

```json
{
  "name": "User1",
  "avatar_id": 2,
  "oldPassword": "123456",
  "password": "000000",
  "confirmPassword": "000000"
}
```

Response example (200 OK):

```json
{
  "id": 1,
  "name": "User1",
  "admin": true
}
```

### GET /users

Get a list of users.

Query options:

- p (default = 1): Page number, with a fixed limit of 20 records per page.

Response example (200 OK):

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

## Recipients

### POST: /recipients

Create a new recipient.

Body request example:

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

Response example (200 OK):

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

Body request example:
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

Response example (200 OK):

```json
{
  "id": "1",
  "name": "John Wayne"
}
```

### GET: /recipients

Get a list of recipients.

Query options:

- p (default = 1): Page number, with a fixed limit of 10 records per page.
- q (default = null): Recipient name text filter.

Response example (200 OK):
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

## Deliverymen

### POST /deliverymen

Body request example:

```json
{
  "name": "Deliveryman 2",
  "email": "deliveryman2@gmail.com"
  }
```

Response example (200 OK)

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

Body request example:

```json
```

Response example (200 OK)

```json
```

### GET /deliverymen

Body request example:

Response example (200 OK)

```json
```

### DELETE /deliverymen/:id

Body request example:

Response example (200 OK)

```json
```

### GET /deliverymen/:id/deliveries

Body request example:

Response example (200 OK)

```json
```



