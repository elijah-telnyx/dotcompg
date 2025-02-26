ARG NODE_VERSION=20.7.0-alpine

FROM node:${NODE_VERSION}

RUN mkdir -p /home/node/cache-monitor

WORKDIR /home/node/cache-monitor

# Copy project files for build
COPY ./ /home/node/cache-monitor/

RUN mkdir node_modules && npm ci

# static envs by args
ARG BUILD_NUMBER
ENV BUILD_NUMBER $BUILD_NUMBER

ENV NODE_ENV 'production'
ENV RUNTIME_ENV 'production'

# User + mkdir + `--chown=node:node` must be set to get around `EACCES: permission denied` errors
# See https://github.com/nodejs/docker-node/issues/740

USER node
ARG PORT
EXPOSE $PORT

# start server
ENTRYPOINT ["/home/node/cache-monitor/docker-entrypoint.sh"]
