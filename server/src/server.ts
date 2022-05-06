import express from 'express';
import { routes } from './routes';
import cors from 'cors';

const app = express();

app.use(cors());

// app.use(cors({
//     origin: 'http://localhost:3000'
// }))

app.use(express.json());
app.use(routes);


app.listen(3333, () => {
    console.log("\nHTTP sever runing!");
    
});

//  GET    = Buscar informações
//  POST   = Cadastrar informações
//  PUT    = Atualizar informações
//  PATCH  = Atualizar uma informação unica
//  DELETE = Deletar uma informação