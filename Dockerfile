# ==============================================================================
# Stage 1: Build stage
# ==============================================================================
FROM oven/bun:1 AS builder

WORKDIR /app

# Symlink 'node' to 'bun' so scripts that call 'node' (e.g. check-i18n.mjs) run seamlessly
RUN ln -sf $(which bun) /usr/local/bin/node

# Install dependencies using lockfile for deterministic builds
COPY package.json bun.lock ./
RUN bun install --frozen-lockfile

# Copy application source code
COPY . .

# Build Arguments (can be overridden via --build-arg)
ARG VITE_APP_VERSION=v3.0.0
ARG VITE_APP_BASE_NAME=/
ARG VITE_APP_API_URL=https://stg-service-satu.telkomuniversity.ac.id/system-information-academic-obe/

# Ensure .env file exists and reflects build arguments
RUN if [ ! -f .env ]; then \
      cp .env.example .env; \
    fi && \
    sed -i "s|^VITE_APP_VERSION=.*|VITE_APP_VERSION=${VITE_APP_VERSION}|" .env && \
    sed -i "s|^VITE_APP_BASE_NAME=.*|VITE_APP_BASE_NAME=${VITE_APP_BASE_NAME}|" .env && \
    sed -i "s|^VITE_APP_API_URL=.*|VITE_APP_API_URL=${VITE_APP_API_URL}|" .env

# Build the application (TypeScript validation + Vite + Nitro output bundling)
RUN bun run build

# ==============================================================================
# Stage 2: Production Runner
# ==============================================================================
FROM oven/bun:1-slim AS runner

WORKDIR /app

# Set production environment variables
ENV NODE_ENV=production
ENV PORT=3000
ENV HOST=0.0.0.0

# Run container as non-root unprivileged bun user
USER bun

# Copy self-contained Nitro server and client assets from the builder stage
COPY --from=builder --chown=bun:bun /app/.output ./.output

# Expose production port
EXPOSE 3000

# Health check using Bun's native fetch API (zero external dependencies)
HEALTHCHECK --interval=30s --timeout=5s --start-period=10s --retries=3 \
  CMD bun -e 'fetch("http://localhost:" + (process.env.PORT || 3000) + "/").then(r => process.exit(r.ok ? 0 : 1)).catch(() => process.exit(1))'

# Start production server using Bun runtime
CMD ["bun", ".output/server/index.mjs"]
