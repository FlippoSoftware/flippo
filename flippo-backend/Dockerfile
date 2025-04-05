FROM node:20 AS base

ENV PNPM_HOME="/pnpm"
ENV PATH="$PNPM_HOME:$PATH"
RUN corepack enable

# backend-base
FROM base AS backend-base
WORKDIR /flippo/backend

COPY . .
RUN pnpm install --frozen-lockfile

# backend-dev
FROM backend-base AS backend-dev
CMD ["pnpm", "run", "dev:server"]

# backend-build
FROM backend-base AS backend-build
RUN pnpm run build

# backend-prod
FROM base AS backend-prod
COPY --from=backend-build /flippo/backend/build /app
WORKDIR /app
CMD ["node", "/app/app.js"]