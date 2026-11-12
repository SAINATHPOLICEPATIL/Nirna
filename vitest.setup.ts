// Load .env (local Docker settings). .env.local (Neon) is intentionally NOT loaded here.
import 'dotenv/config'

// Tests create and delete records, so they must never run against Neon (the production branch).
process.env.NIRNA_DB_TARGET = 'local'
