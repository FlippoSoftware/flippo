FROM node:20 AS base
ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN npm install -g pnpm@10.7.0

# frontend-base
FROM base AS frontend-base
WORKDIR /flippo/frontend

COPY . .
RUN pnpm install

# frontend-dev
FROM frontend-base AS frontend-dev
CMD ["pnpm", "run", "dev"]

# frontend-build
FROM frontend-base AS frontend-build
RUN pnpm run build

# prod
FROM base AS frontend-prod
COPY --from=frontend-build /flippo/frontend/build .
