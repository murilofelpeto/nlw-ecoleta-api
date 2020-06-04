import express from 'express';
import cors from 'cors';
import routes from './routes'
import path from "path";

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads/images', express.static(path.resolve(__dirname, '..', 'uploads', 'images')));
app.listen(3333);