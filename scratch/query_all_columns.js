import { supabase } from '../src/config/db.js';

async function queryAllColumns() {
  // Query pg_attribute to find all columns across all tables containing 'invoice'
  const { data, error } = await supabase.rpc('pg_catalog_query', {});
  // Wait, RPC might not exist. Let's select from pg_attribute if we can,
  // but pg_attribute is in pg_catalog, postgrest doesn't expose it by default.
  // Let's check the schema by attempting to select key fields or check the error log.
  // Actually, we can check if the user has an `invoices` table or similar!
  // Let's check if there is an 'invoices' table.
  const { data: invData, error: invError } = await supabase.from('invoices').select('*').limit(1);
  console.log('invoices table search:', invData ? 'Exists' : 'Does not exist', invError?.message);
}

queryAllColumns();
