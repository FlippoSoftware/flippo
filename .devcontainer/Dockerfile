FROM ubuntu:24.04

# Установка зависимостей
RUN apt-get update && apt-get install -y curl

# Установка Node.js
RUN curl -fsSL https://deb.nodesource.com/setup_20.x -o nodesource_setup.sh
RUN bash nodesource_setup.sh
RUN apt-get install -y nodejs

# Установка git
RUN apt-get install -y git

# Установка pnpm
ENV PNPM_HOME="${HOME}/.local/share/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.7.0
RUN pnpm config set -g store-dir "${HOME}/.local/share/pnpm/store"

# Установка TypeScript
RUN pnpm add -g typescript