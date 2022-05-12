# Docs

## Local setup

If using macOS, consider running `brew bundle` to automate installation of some dependencies. See [`Brewfile`](./Brewfile).

### Install dependencies
```bash
npm install
```

### Create .env file
```bash
cp .env.example .env
```

Set values as needed.

### Setup MongoDB

Download MongoDB locally. You can either:
- Download MongoDB Community Server from the 
[offical website](https://www.mongodb.com/try/download).
- If using macOS, run `brew bundle` or see [docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/).

Once installed, run the Mongo daemon ([see docs](https://www.mongodb.com/docs/manual/tutorial/install-mongodb-on-os-x/#run-mongodb-community-edition)).

### Setup Redis

- Install and run Redis
