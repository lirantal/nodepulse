# NodePulse

> NodePulse is a live Node.js dashboard

## Build Setup

```bash
# install dependencies
$ yarn install

# serve with hot reload at localhost:8080
$ yarn dev

# build for production and launch server
$ yarn build
$ yarn start

# generate static project
$ yarn generate
```

## Google Cloud Run

### Initialize

Login with glcoud:

```bash
gcloud auth login
```

Follow that with ensuring the nodepulse project is set to active:

```
gcloud config set project nodepulse
```

### Build docker image locally

```
docker build . -t nodepulse
```
