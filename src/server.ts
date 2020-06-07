import express from 'express';
import cors from 'cors';
import routes from './routes'
import path from "path";
import {errors} from 'celebrate';

const app = express();
app.use(cors());
app.use(express.json());
app.use(routes);

app.use('/uploads/images', express.static(path.resolve(__dirname, '..', 'uploads', 'images')));
app.use('/uploads/point-images', express.static(path.resolve(__dirname, '..', 'uploads', 'point-images')));

app.use(errors());
var port = process.env.PORT || 8080;
app.listen(port);