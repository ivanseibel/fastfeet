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

# Topics

- [Project General Description](#project-general-description)
- [User stories](#user-stories)
- [Non-functional Requirements](#non-functional-requirements)

# Project General Description

This API is one part of three that implement an application for a delivery service company. This project is one of several constructed during GoStack Bootcamp, a course offered by [Rocketseat](http://www.rocketseat.com.br) that dive deep into one of most popular stacks to software development for web and mobile.

# User stories

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

**POST: /recipients:**

Create a new session with security token if user data are correct.

Body request example:

```json
{
	"email": "someuser@fastfeet.com",
	"password": "122448"
}
```

Response example:
```json
{
  "user": {
    "id": 1,
    "name": "Some User",
    "email": "someusern@fastfeet.com",
    "admin": false
  },
  "token": "eyJhbGdiOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6MSwiaWF0IjhxNTkwMDk1NjkzLCJleHAiOjE1OTA3MDA0OTN9.jp2iEYi9jcqUf57G1RsCIkScMUh-wftOpyKm2H5h5lQ"
}
```

**POST: /recipients**

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

Response example:
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

### Status: under construction :construction: :construction_worker:
