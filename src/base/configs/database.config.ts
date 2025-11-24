import { registerAs } from '@nestjs/config';
import { z } from 'zod';

const databaseConfigSchema = z.object({
  url: z.string().url({
    message:
      'DATABASE_URL must be a valid PostgreSQL connection string (e.g. from Neon).',
  }),
  ssl: z.boolean().default(true),
  sslRejectUnauthorized: z.boolean().default(false),
  maxConnections: z.number().int().positive().default(10),
  idleTimeoutMillis: z.number().int().nonnegative().default(10000),
  appName: z.string().min(1).default('dominote-server'),
  logQueries: z.boolean().default(false),
});

export type DatabaseConfig = z.infer<typeof databaseConfigSchema>;

export default registerAs('database', () => {
  const {
    DATABASE_URL,
    DATABASE_SSL,
    DATABASE_SSL_REJECT_UNAUTHORIZED,
    NODE_ENV,
  } = process.env;

  const fallbackUrl = 'postgresql://postgres:postgres@localhost:5432/dominote';

  if (!DATABASE_URL && NODE_ENV !== 'test') {
    // eslint-disable-next-line no-console
    console.warn(
      `[database.config] DATABASE_URL is not defined. Falling back to ${fallbackUrl}. This will fail unless a local PostgreSQL instance is available.`,
    );
  }

  return databaseConfigSchema.parse({
    url: DATABASE_URL ?? fallbackUrl,
    ssl: DATABASE_SSL === 'false' ? false : true,
    sslRejectUnauthorized: DATABASE_SSL_REJECT_UNAUTHORIZED === 'true',
    maxConnections: Number(process.env.DATABASE_MAX_CONNECTIONS ?? 10),
    idleTimeoutMillis: Number(process.env.DATABASE_IDLE_TIMEOUT ?? 10000),
    appName: process.env.DATABASE_APP_NAME ?? 'dominote-server',
    logQueries: process.env.DATABASE_LOG_QUERIES === 'true',
  });
});

