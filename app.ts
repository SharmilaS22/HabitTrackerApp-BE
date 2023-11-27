import express, { Request, Response } from 'express';

// https://github.com/sskender/nodejs-backend-starter.git

const app = express();
const PORT = 3001 || process.env.PORT;

app.use('/api/v1', require('./routes/v1'))
// app.use(require('./routes/errors').errorHandler)


app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.listen(PORT, () => console.log("User service started"));