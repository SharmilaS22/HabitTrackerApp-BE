import { Sequelize } from 'sequelize';
import dotenv from 'dotenv';

dotenv.config();

const sequelize = new Sequelize(
    process.env.DB_NAME || "",
    process.env.DB_USER || "",
    process.env.DB_PASSWORD || "",
    {
  dialect: 'postgres',
  host: process.env.DB_HOST,
});

sequelize.sync()
  .then(() => {
      console.log('Database is synced');
  })
  .catch((err) => {
    console.error('Unable to connect to the database:', err);
  });

export { sequelize };