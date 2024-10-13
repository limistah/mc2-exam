
# MC^2 Exam Solution

This is intended to be a Yarn Mono Repo but faced some issues with the modules, so bear with me with this installation steps.

# Setting Up

## Installation

**For the backend**
```bash
cd apps/backend && yarn
```
**For the frontend**
```bash
cd apps/frontend && yarn
```

## Required ENVs
**For the backend**
```bash
NODE_ENV="development" # Options: 'development', 'production'
PORT="3333"            # The port your server will listen on
MOBULA_API_KEY=b34aaec6-abf3-4600-8f75-58805e63fa95 # generate one at https://admin.mobula.fi/admin/default

```
**For the frontend**
```bash
NUXT_API_HOST=http://localhost:3333 # ensure the port is reflected as the advertised port for the backend service
```

## Running the services

**For the backend**
```bash
cd /apps/backend && yarn start:dev
```


**For the frontend**
```bash
cd /apps/frontend && yarn dev
```

# Viewing the results
## Locally

**For the backend**
```bash
cd /apps/backend && yarn start:dev
```
The visit http://localhost:3333/docs
> Replace the port to match the desired backend port

**For the frontend**
```bash
cd /apps/frontend && yarn dev
```
Then visit http://localhost:3000/transactions?wallet=0x9c34729f5a5fc1d499f669379f9b7ea1de1cf31e
> Replace the wallet to math a desired wallet address

## Deployed version
**For the backend**

**For the frontend**
