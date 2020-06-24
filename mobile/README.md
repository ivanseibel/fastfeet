<h1 align="center">
    <img alt="GoStack" src="https://github.com/ivanseibel/assets/blob/master/img/gostack10/bootcamp-header.png?raw=true" width="200px" />
</h1>

<h3 align="center">
  <img width="250px" src="./src/assets/logo.png" alt="Fastfeet">
  <p>Project: Fastfeet - Delivery Service (mobile)</p>
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
  - [2.1. Persona: Deliveryman user](#21-persona-deliveryman-user)
- [3. Screen Captures](#3-screen-captures)
- [4. Technologies/libraries](#4-technologieslibraries)
- [5. How to run](#5-how-to-run)
- [6. License](#6-license)


# 1. Project General Description

This React Native mobile app is one part of three that implement an application for a delivery service company. This project is one of several constructed during GoStack Bootcamp, a course offered by [Rocketseat](http://www.rocketseat.com.br) that dive deep into one of most popular stacks to software development for web and mobile.

# 2. User stories

## 2.1. Persona: Deliveryman user

You can see this user stories [HERE](https://github.com/ivanseibel/fastfeet/tree/master/backend#22-persona-deliveryman-user).

# 3. Screen Captures

## 3.1. Login

Page to deliverymen login into the system.

<p>
  <img src=".github/assets/screen-login.png" alt="Login" width="60%">
</p>

## 3.2. Deliveries

In this page deliverymen can:

- xxx
- xxx

<p>
  <img src=".github/assets/screen-deliveries.png" alt="Deliveries" width="60%">
</p>

### 3.2.1. Delivery xxx

Page where deliverymen can xxx.

<p>
  <img src=".github/assets/screen-delivery-insert.png" alt="Delivery insert" width="60%">
</p>


# 4. Technologies/libraries



# 5. How to run

Clone this repository:

```bash
$ git clone https://github.com/ivanseibel/fastfeet
```

Get inside the new created folder "fastfeet/mobile"

```bash
$ cd fastfeet/mobile
```

Configure axios baseURL at ./src/services/api.js.

```javascript
import axios from 'axios';

const api = axios.create({
  baseURL: 'http://192.168.1.104:3333',
});

export default api;
```

Install all components:

```bash
$ yarn
```

Run the metro bundler:

```bash
$ yarn start
```

Upload app to emulator/device:

```bash
$ yarn android
```

**ABOUT iOS**

This app is probably 100% iOS compatible, but it cannot be tested. I recommend run the app using Android emulator or physical devices.

**IMPORTANT**

Axios baseURL must be equal to APP_URL const from back-end .env file, or front-end will not show avatars correctly.

You can see the instructions to get up the API [HERE](https://github.com/ivanseibel/fastfeet/tree/master/backend#6-how-to-run).

# 6. License

This project is under MIT license.
