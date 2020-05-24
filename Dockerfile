FROM node:lts-alpine

ARG BUILD_ENV
ARG HOME_DIR=/home/node/app

ENV NPM_CONFIG_PREFIX=$HOME_DIR/.npm-global
ENV PATH=$PATH:$HOME_DIR/.npm-global/bin

USER node
RUN mkdir -p $HOME_DIR
WORKDIR $HOME_DIR

COPY --chown=node:node package.json yarn.lock $HOME_DIR/
RUN yarn install --frozen-lockfile
COPY --chown=node:node . $HOME_DIR

RUN yarn run build

CMD [ "yarn", "run", "start" ]