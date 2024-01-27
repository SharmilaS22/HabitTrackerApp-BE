import express, { NextFunction, Request, Response } from 'express';

// https://github.com/sskender/nodejs-backend-starter.git

const app = express();
app.use(express.json())
const PORT = 3001 || process.env.PORT;

app.use('/api/v1', require('./routes/v1/index'))
// app.use(require('./routes/errors').errorHandler)

app.get('/', (req: Request, res: Response) => {
  res.send('Hello, World!');
});

app.use((err: Error, req: Request, res: Response, next: NextFunction) => {
  console.error(err.stack)
  res.status(500).send('Internal Server Error');
})

app.listen(PORT, () => console.log("User service started"));