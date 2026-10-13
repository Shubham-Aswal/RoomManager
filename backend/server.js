import app from './src/app.js';
import connectDB from './src/db/connect.js';
import dotenv from 'dotenv';

dotenv.config({
  path: './.env',
});

const startServer = async () => {
  try {
    await connectDB();

    const port = Number(process.env.PORT || 3000);
    app.listen(port, () => {
      console.log(`Server running on port ${port}`);
    });
  } catch (error) {
    console.log('failed to start the server', error);
    process.exit(1);
  }
};

startServer();
