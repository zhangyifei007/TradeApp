import * as bodyParser from 'body-parser';
import express from "express";
import api from './routers';

const app = express();

app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: false }));
app.use('/api', api);

export { app };
