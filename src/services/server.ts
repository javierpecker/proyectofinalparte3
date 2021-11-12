import Config from '../config';
import express from 'express';
import MongoStore from 'connect-mongo';
import path from 'path';
import * as http from 'http';
import apiRouter from '../routes/index';
import { ErrorRequestHandler } from 'express';
import { Logger } from './logger';

const StoreOptions = {
  store: MongoStore.create({
    mongoUrl: Config.MONGO_ATLAS_SRV,
  }),

  secret: Config.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
  cookie: {
    maxAge: Number(Config.SESSION_COOKIE_TIMEOUT_MIN) * 60 * 1000,
  },
};

const app = express();

const publicFolderPath = path.resolve(__dirname, '../../public');
app.use(express.static(publicFolderPath));

app.use(express.json());
app.use('/api', apiRouter);

const errorHandler: ErrorRequestHandler = (err, req, res, next) => {
  Logger.info(`HUBO UN ERROR ${err}`);
  res.status(500).json({
    err: err.message,
  });
};

app.use(errorHandler);

const myServer = new http.Server(app);

export default myServer;
