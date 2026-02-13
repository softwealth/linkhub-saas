// Temporary stub for deployment - will replace with Vercel Postgres
const db = {
  prepare: () => ({
    get: () => null,
    all: () => [],
    run: () => ({ lastInsertRowid: 1 })
  }),
  exec: () => {}
}

export default db
