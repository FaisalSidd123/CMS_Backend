import https from 'https';

function checkHeaders() {
  const url = 'https://res.cloudinary.com/c6ecdoh9/raw/upload/v1784142672/test_invoices/gusshohduf69rh2b5ttk';
  https.get(url, (res) => {
    console.log('HTTP Status:', res.statusCode);
    console.log('Headers:', res.headers);
  });
}

checkHeaders();
