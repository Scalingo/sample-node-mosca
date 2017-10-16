Sample Application with NodeJS and Mosca
========================================

Running Locally
---------------

First, you need to have a working NodeJS environment:

https://nodejs.org/en/download/

### NPM

This go application is using npm to manage
its dependencies. To install them run:

```sh
npm install
```

### Execute

#### Web server
```sh
npm start
```

#### MQTT server
```sh
npm run start-tcp
```

Deploying on Scalingo
---------------------

Create an application on https://scalingo.com with a MongoDB and an TCP addon, then:

```
git remote add scalingo git@scalingo.com:<name_of_your_app>.git
git push scalingo master

scalingo -a <name_of_your_app> scale tcp:1
```

And that's it!

The application is running at this url: https://sample-node-mosca.scalingo.io/

Deploy in one click
-------------------

[![Deploy to Scalingo](https://cdn.scalingo.com/deploy/button.svg)](https://my.scalingo.com/deploy)

Links
-----

http://www.mosca.io/
https://nodejs.org/en/
