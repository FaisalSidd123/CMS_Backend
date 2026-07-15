import app from './app.js';

const PORT = process.env.PORT || 5000;

const server = app.listen(PORT, () => {
  console.log(`=========================================`);
  console.log(`  Vanguard CRM Engine Online            `);
  console.log(`  Running in [${process.env.NODE_ENV}] mode   `);
  console.log(`  API Endpoint: http://localhost:${PORT}/api `);
  console.log(`=========================================`);
});

// Handle unhandled promise rejections
process.on('unhandledRejection', (err, promise) => {
  console.error(`Unhandled Rejection Error: ${err.message}`);
  // Close server & exit process
  server.close(() => process.exit(1));
});
