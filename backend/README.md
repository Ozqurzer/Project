# Local Development

To develop locally, first install npm dependencies and then start the application:

```shell
npm install --include=dev
npm run start
```

## Code Formatting

We use [Prettier](https://prettier.io/) for code formatting. Run it with:

```shell
npm run prettier
```

Or, configure your IDE to apply Prettier when saving files.

Prettier also runs in our GitHub pipelines, ensuring consistent code formatting. If it fails, do not merge the Pull Request.

# Environment Setup

- packetsjson.,
- packetens:  "cors": "^2.8.5",
  "dotenv": "^16.3.1",
  "express": "^4.18.2",
  "mongodb": "^5.8.0",
  "mongoose": "^7.4.4",
  "morgan": "^1.10.0",
  "bcrypt": "^5.1.0",
  "nodemon": "^3.0.1"
  "jsonwebtoken": "^9.0.1",
- "cookie-parser": "^1.4.6",
- file: .env, .gitignore, controller, model, routes, server.js,middleware,uploads,util

# GitHub setup

- neu organization in GitHub
- neu repository in GitHub
-

# mongoDB setup

- create schema
- create modul
- create email and neu Account in atlas MongoDB
- create password and nue user for mongoCompass 