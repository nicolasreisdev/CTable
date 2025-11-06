import express, { Request, Response } from 'express';
import routes from './routes'

const app = express();
const PORT = process.env.PORT || 3000;


app.use(express.json());
app.use(routes);

app.post('/data', (req: Request, res: Response) => {
  res.status(201).json({ message: 'Dados recebidos com sucesso!' });
});

app.listen(PORT, () => {
  console.log(`Servidor rodando na porta ${PORT}`);
}); 