import { supabase } from '../src/config/db.js';

async function testConnection() {
  const { data, error } = await supabase.from('vehicles').select('*').limit(1);
  if (error) {
    console.error('Supabase connection failed:', error.message, error.status);
  } else {
    console.log('Supabase connection successful! Row count:', data.length);
  }
}

testConnection();
