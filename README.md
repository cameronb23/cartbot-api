# CartBot-API

Backend server for the CartBot discord bot.


## Installation
- Clone or download ZIP of most recent codebase
- Run `npm install` or `yarn` to install packages
- Run `npm run dev` or `yarnpkg dev` to launch

## Configuration

You need to provide multiple environment variables for the API to function correctly. A list is as follows:

- `MONGO_URL`: The mongo:// url that directs to your MongoDB backend
- `REDIS_URL`: The redis:// url that directs to your Redis backend for key caching
- `STRIPE_TOKEN`: The _private_ token associated with your Stripe account to accept payments
- `DISCORD_TOKEN`: A secret key so the Discord bot can interact with the web API.
