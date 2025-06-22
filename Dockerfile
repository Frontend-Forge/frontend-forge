FROM node:22

WORKDIR  /app

COPY . .

RUN corepack enable && corepack prepare pnpm@latest --activate

RUN pnpm install

EXPOSE 3000


CMD ["pnpm", "run", "dev"]