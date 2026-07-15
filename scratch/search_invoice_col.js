import { supabase } from '../src/config/db.js';

async function searchInvoiceColumn() {
  // We can query the information schema columns table
  const { data, error } = await supabase.from('reservations').select('*').limit(1);
  
  // Wait, let's write a custom SQL check via a pg-catalog query or other means
  // Actually, we can check columns of other tables (like payments, documents)
  const tables = ['reservations', 'payments', 'documents', 'leads', 'vehicles'];
  for (const t of tables) {
    const { data: rows, error: err } = await supabase.from(t).select('*').limit(1);
    if (!err && rows.length > 0) {
      console.log(`Table "${t}" keys:`, Object.keys(rows[0]));
    } else if (err) {
      console.log(`Table "${t}" err:`, err.message);
    } else {
      console.log(`Table "${t}" is empty.`);
    }
  }
}

searchInvoiceColumn();
