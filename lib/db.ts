// Temporary stub for deployment - will replace with Vercel Postgres
const db = {
  prepare: (_sql: string) => ({
    get: (..._params: any[]) => null,
    all: (..._params: any[]) => [],
    run: (..._params: any[]) => ({ lastInsertRowid: 1, changes: 0 })
  }),
  exec: (_sql: string) => {}
}

export default db
