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

### Create an application credentials

To access the google APIs for secrets and otherwise, we'll need to
create a local application credentials:

```
gcloud auth application-default login
```

And follow with your google account on GCP for access granting.

## GitHub Actions CI

### Docker Hub image build

The following YAML builds the docker image and pushes it to Docker Hub as a public image.

Create the `DOCKER_USERNAME` and `DOCKER_PASSWORD` secrets on the repository's settings page.
Grab the tokens for these from the Docker account settings page.

```yaml
name: Publish Docker
on:
  push:
    branches:
      - master
jobs:
  build:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@master
      - uses: docker/build-push-action@v1
        name: Build and push Docker images
        with:
          username: ${{ secrets.DOCKER_USERNAME }}
          password: ${{ secrets.DOCKER_PASSWORD }}
          repository: lirantal/nodepulse
          tags: latest
```

### Secrets setup

We'll need to work with some sensitive API keys such as the GitHub token.
To keep them same, we'll store and access them via Secrets Manager.

1. To begin with, enable the Secrets Manager on GCP
2. Once you obtained the GitHub token let's create it as a secret:

```sh
echo "GITHUB_TOKEN_GOES_HERE" | gcloud secrets create \
  --data-file=- --replication-policy=automatic github-token
```

We called this secret `github-token` and this is what we'll use to identify and access it in the future.

3. We'll need to find out the default IAM service account that will be used by the running container:

```sh
gcloud iam service-accounts list
```

It will show up on the list with a name of `Default compute service account`.
For example:

```
989220244463-compute@developer.gserviceaccount.com
```

4. Grant access only to this secret:

```sh
gcloud secrets add-iam-policy-binding github-token --member=serviceAccount:989220244463-compute@developer.gserviceaccount.com \
  --role=roles/secretmanager.secretReader --project=nodepulse
```

### Build and Deploy to Google Cloud

#### Setup

The following is the first time only setup that needs to be done to provide access
to the GitHub CI to deploy new container images.

Enable the Google Cloud Run APIs on the project:

1. Visit https://console.cloud.google.com/flows/enableapi?apiid=cloudbuild.googleapis.com,run.googleapis.com
2. Choose the project from the drop-down list and hit continue

Create a service account to be used on the GitHub Action so we can deploy the image built to Google Cloud Run as a service container:

```sh
# nodepulse-deployer is the service account name
gcloud iam service-accounts create nodepulse-deployer

# provide the service-account the `run.admin` role to allow it to deploy
# see: https://cloud.google.com/run/docs/reference/iam/roles
gcloud projects add-iam-policy-binding nodepulse --member "serviceAccount:nodepulse-deployer@nodepulse.iam.gserviceaccount.com" --role "roles/run.admin"

# provide the service-account the `builder editor` and `builder viewer`
# role so it can create and update images to google container registry
gcloud projects add-iam-policy-binding nodepulse --member "serviceAccount:nodepulse-deployer@nodepulse.iam.gserviceaccount.com" --role "roles/cloudbuild.builds.editor"
gcloud projects add-iam-policy-binding nodepulse --member "serviceAccount:nodepulse-deployer@nodepulse.iam.gserviceaccount.com" --role "roles/cloudbuild.builds.viewer"

# and then grant it the following membership and role
# so it can assume this user for the runtime service
gcloud projects add-iam-policy-binding nodepulse --member "serviceAccount:nodepulse-deployer@nodepulse.iam.gserviceaccount.com" --role="roles/iam.serviceAccountUser"

# allow the service account to view/create storage assets (the container images)
gcloud projects add-iam-policy-binding nodepulse --member "serviceAccount:nodepulse-deployer@nodepulse.iam.gserviceaccount.com" --role="roles/storage.objectAdmin"

# allow the service account to view logs required for the container build
gcloud projects add-iam-policy-binding nodepulse --member "serviceAccount:nodepulse-deployer@nodepulse.iam.gserviceaccount.com" --role="roles/viewer"

# export the service-account details to a file called gcloud_auth.json
# as follows:
gcloud iam service-accounts keys create gcloud_auth.json --iam-account nodepulse-deployer@nodepulse.iam.gserviceaccount.com --project nodepulse
```

Then update the GitHub repository's secrets with the following
keys and values:

```
# the contents of gcloud_auth.json file
RUN_SA_KEY=

# the cloud service name
CLOUD_RUN_SERVICE_NAME=nodepulse-ssr
```

#### Deploy to Google Cloud Run from CI

Create a `.github/workflows/deploy.yml` file that includes the following to build and deploy the image on a push to `master` branch.

```
# Copyright 2019 Google, LLC.
#
# Licensed under the Apache License, Version 2.0 (the "License");
# you may not use this file except in compliance with the License.
# You may obtain a copy of the License at
#
#    http://www.apache.org/licenses/LICENSE-2.0
#
# Unless required by applicable law or agreed to in writing, software
# distributed under the License is distributed on an "AS IS" BASIS,
# WITHOUT WARRANTIES OR CONDITIONS OF ANY KIND, either express or implied.
# See the License for the specific language governing permissions and
# limitations under the License.

name: Build and Deploy to Cloud Run

on:
  push:
    branches:
      - master

env:
  PROJECT_ID: ${{ secrets.RUN_PROJECT }}
  RUN_REGION: us-central1
  SERVICE_NAME: ${{ secrets.CLOUD_RUN_SERVICE_NAME }}

jobs:
  setup-build-deploy:
    name: Setup, Build, and Deploy
    runs-on: ubuntu-latest

    steps:
      - name: Checkout
        uses: actions/checkout@v2

      # Setup gcloud CLI
      - uses: GoogleCloudPlatform/github-actions/setup-gcloud@master
        with:
          version: '290.0.1'
          service_account_key: ${{ secrets.RUN_SA_KEY }}
          project_id: ${{ secrets.RUN_PROJECT }}

      # Build and push image to Google Container Registry
      - name: Build
        run: |-
          gcloud builds submit \
            --quiet \
            --tag "gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA"

      # Deploy image to Cloud Run
      - name: Deploy
        run: |-
          gcloud run deploy "$SERVICE_NAME" \
            --quiet \
            --region "$RUN_REGION" \
            --image "gcr.io/$PROJECT_ID/$SERVICE_NAME:$GITHUB_SHA" \
            --platform "managed" \
            --allow-unauthenticated
```

#### Deploy to Google Cloud Run from local dev

To experiment with building and deploying the container from localhost
so that you can avoid the cumbersome and delay of git pushes to the
remote registry you can use the following:

```sh
# build the image:
gcloud builds submit \
            --quiet \
            --tag "gcr.io/nodepulse/nodepulse-ssr"

# deploy it:
gcloud run deploy nodepulse-ssr \
          --quiet \
          --region us-central1 \
          --image "gcr.io/nodepulse/nodepulse-ssr" \
          --platform "managed" \
          --allow-unauthenticated
```

### Connect to Firebase Hosting

We can connect the Cloud Run service to Firebase Hostin, which will allow
us to use the capability of short URLs, such as:

```
https://nodepulse.web.app
```

At this point, that's the only reason to connect Firebase Hosting capabilities
into the current GCP project.

In the root directory, run:

```sh
firebase init
```

In the interactive CLI choose:

1. Hosting project
2. Use existing project, and select `nodepulse`
3. Confirm the `public/` directory for resources

The CLI will scaffold default index files in the `public/` directory
which we need to remove. We have to remove them because if these files
exist then the rewrite rules won't affect the top-level domain request
such as hits to `nodepulse.web.app`.

```sh
rm public/*
```

Then update `firebase.json` to include the rewrite rules to forward
all requests to files not found to the Cloud Run Service:

```json
{
  "hosting": {
    "public": "public",
    "ignore": ["firebase.json", "**/.*", "**/node_modules/**"],
    "rewrites": [
      {
        "source": "**",
        "run": {
          "serviceId": "nodepulse-ssr",
          "region": "us-central1"
        }
      }
    ]
  }
}
```

And deploy it:

```sh
firebase deploy
```
