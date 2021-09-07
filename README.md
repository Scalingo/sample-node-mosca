# Sample Application with NodeJS and Mosca

A sample of this application is running at: https://node-mosca.is-easy-on-scalingo.com/

## Running Locally

First, you need to have a working NodeJS environment:

https://nodejs.org/en/download/

### NPM

This application uses `npm` to manage its dependencies. Install them with:

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

## Deploy via Git

Create an application on https://scalingo.com with a MongoDB and a TCP Gateway addon, then:

```shell
scalingo --app my-app git-setup
git push scalingo master
```

Then scale the TCP container:
```shell
scalingo -a my-app scale tcp:1
```

And that's it!

## Deploy via One-Click

[![Deploy to Scalingo](https://cdn.scalingo.com/deploy/button.svg)](https://my.scalingo.com/deploy)

## Links

- https://www.mosca.io/
- https://nodejs.org/en/
