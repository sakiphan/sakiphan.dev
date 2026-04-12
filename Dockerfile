# Stage 1: Install dependencies
FROM oven/bun:1.3-alpine AS deps
WORKDIR /app

COPY package.json bun.lockb ./
RUN bun install --frozen-lockfile

# Stage 2: Build the application
FROM oven/bun:1.3-alpine AS builder
WORKDIR /app

COPY --from=deps /app/node_modules ./node_modules
COPY . .

# Build arguments for env vars needed at build time
ARG CONTENTFUL_SPACE_ID
ARG CONTENTFUL_ACCESS_TOKEN
ARG CONTENTFUL_PREVIEW_ACCESS_TOKEN
ARG NEXT_PUBLIC_SUPABASE_URL
ARG NEXT_PUBLIC_SUPABASE_ANON_KEY
ARG NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN
ARG NEXT_PUBLIC_TINYBIRD_TOKEN
ARG SUPABASE_URL
ARG SUPABASE_SERVICE_ROLE_KEY

ENV CONTENTFUL_SPACE_ID=$CONTENTFUL_SPACE_ID
ENV CONTENTFUL_ACCESS_TOKEN=$CONTENTFUL_ACCESS_TOKEN
ENV CONTENTFUL_PREVIEW_ACCESS_TOKEN=$CONTENTFUL_PREVIEW_ACCESS_TOKEN
ENV NEXT_PUBLIC_SUPABASE_URL=$NEXT_PUBLIC_SUPABASE_URL
ENV NEXT_PUBLIC_SUPABASE_ANON_KEY=$NEXT_PUBLIC_SUPABASE_ANON_KEY
ENV NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN=$NEXT_PUBLIC_RAINDROP_ACCESS_TOKEN
ENV NEXT_PUBLIC_TINYBIRD_TOKEN=$NEXT_PUBLIC_TINYBIRD_TOKEN
ENV SUPABASE_URL=$SUPABASE_URL
ENV SUPABASE_SERVICE_ROLE_KEY=$SUPABASE_SERVICE_ROLE_KEY
ENV NEXT_TELEMETRY_DISABLED=1
ENV NODE_ENV=production

RUN bun run build

# Stage 3: Production runtime
FROM oven/bun:1.3-alpine AS runner
WORKDIR /app

ENV NODE_ENV=production
ENV NEXT_TELEMETRY_DISABLED=1
ENV PORT=3000
ENV HOSTNAME="0.0.0.0"

# Non-root user for security
RUN addgroup --system --gid 1001 nodejs && \
    adduser --system --uid 1001 nextjs

# Copy only what's needed for production
COPY --from=builder /app/public ./public
COPY --from=builder --chown=nextjs:nodejs /app/.next/standalone ./
COPY --from=builder --chown=nextjs:nodejs /app/.next/static ./.next/static

USER nextjs

EXPOSE 3000

HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD wget --no-verbose --tries=1 --spider http://localhost:3000/ || exit 1

CMD ["bun", "server.js"]
