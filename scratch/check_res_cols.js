import { supabase } from '../src/config/db.js';

async function checkReservationColumns() {
  const { data, error } = await supabase
    .from('reservations')
    .select('*')
    .limit(1);

  if (error) {
    console.error('Error fetching reservation:', error);
  } else {
    console.log('Reservation data keys:', data.length > 0 ? Object.keys(data[0]) : 'No rows found');
  }
}

checkReservationColumns();
