
import { pool } from "./src/db/pool.js";

try {
  const hasil = await pool.query(
    "SELECT column_name, data_type FROM information_schema.columns WHERE table_name = $1 ORDER BY ordinal_position",
    ["penawaran"],
  );

  console.table(hasil.rows);
} catch (error) {
  console.error(error.message);
} finally {
  await pool.end();
}
