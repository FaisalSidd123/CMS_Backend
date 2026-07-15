import https from 'https';

function checkUrl(url, label) {
  https.get(url, (res) => {
    console.log(`[${label}] HTTP Status:`, res.statusCode, res.statusMessage);
    let data = '';
    res.on('data', (chunk) => { data += chunk; });
    res.on('end', () => {
      console.log(`[${label}] Preview:`, data.substring(0, 100));
    });
  }).on('error', (err) => {
    console.error(`[${label}] Fetch error:`, err.message);
  });
}

checkUrl('https://res.cloudinary.com/c6ecdoh9/raw/upload/v1784143433/test_invoices_ext/Vanguard_Invoice_Test_1784143432385.pdf', 'RAW_WITH_EXT');
