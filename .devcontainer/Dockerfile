FROM mcr.microsoft.com/devcontainers/typescript-node:1-20-bookworm

# Установка зависимостей
RUN apt-get update && apt-get install -y curl

# Установка git
RUN apt-get install -y git

# Установка pnpm
ENV HOME=/home/node
ENV PNPM_HOME=$HOME/.local/share/pnpm
ENV PATH=$PNPM_HOME:$PATH

RUN npm install -g pnpm@10.7.0
RUN pnpm config set -g store-dir "${HOME}/.local/share/pnpm/store"
RUN chown -R node:node "$PNPM_HOME"

USER node