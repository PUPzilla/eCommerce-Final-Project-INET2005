import express from 'express';
import bodyParser from 'body-parser';
import cors from 'cors';
import session from 'express-session';
import ProdRouter from './routes/products.js';
import UserRouter from './routes/users.js';

const port = process.env.PORT || 3000;
const app = express();

//  Middleware
app.use(express.json());
app.use(bodyParser.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

//  CORS setup
app.use(cors({
  origin: 'http://localhost:5173',
  credentials: true,
}));

//  Session setup
app.use(session({
  secret: 'birds-arent-real',
  resave: false,
  saveUninitialized: false,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 3600000 //  1hr in millisecs
  }
}));

//  Routes
app.use('/api/products', ProdRouter);
app.use('/api/users', UserRouter);


app.listen(3000, () => {
  console.log(`app.js from YotasTacos listening on port: ${port}`);
});
