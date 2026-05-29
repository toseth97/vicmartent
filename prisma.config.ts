import { defineConfig } from 'prisma/config'
import { betterSqlite3Adapter } from '@prisma/adapter-better-sqlite3'
import Database from 'better-sqlite3'

export default defineConfig({
  schema: './prisma/schema.prisma',
  adapter: betterSqlite3Adapter(new Database('./dev.db')),
})
