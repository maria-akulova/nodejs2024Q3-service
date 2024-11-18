# Home Library Service: Part1 (Rest Service)

## Prerequisites

- Node.js - 22.9.0 required

## Create .env file
```
cp .env.example .env
```

## Downloading

```
git clone https://github.com/maria-akulova/nodejs2024Q3-service.git
```

## Installing NPM modules

```
npm install
```

## Running application

```
npm start
```

## Start app in dev/watch mode in docker container
```
docker compose up
```

## Docker container
```
docker pull mariaakulova2024/nodejs2024q3-library-service:v1
```

After starting the app on port (4000 as default) you can open
in your browser OpenAPI documentation by typing http://localhost:4000/doc/.
For more information about OpenAPI/Swagger please visit https://swagger.io/.

## Testing

Run application and only after that open new terminal and enter:

To run all tests without authorization

```
npm run test
```

To run only one of all test suites

```
npm run test -- <path to suite>
```
## Misc
### Docker container vulnerability scan
Install Snyk: `npm install -g snyk`

Authenticate: `snyk auth`

To scan docker image vulnerability execute:
```
npm run docker:scan
```

See more about Snyk: https://snyk.io/
### Auto-fix and format

```
npm run lint
```

```
npm run format
```

### Debugging in VSCode

Press <kbd>F5</kbd> to debug.

### Notes

For building there is applied new SWC builder.

The new script was added to auto-generate new services
```
npm run generate
```