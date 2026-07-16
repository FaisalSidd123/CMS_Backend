import { supabase } from '../src/config/db.js';

async function checkSchema() {
  const { data, error } = await supabase.from('vehicles').select('*').limit(1);
  if (error) {
    console.error('Error fetching vehicle:', error);
  } else {
    console.log('Vehicle keys:', Object.keys(data[0] || {}));
  }
}

checkSchema();
