import express from 'express';
import cors from 'cors';
import session from 'express-session';
import ProdRouter from './routes/products.js';
import UserRouter from './routes/users.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors({
  origin: 'http://localhost:3000',
  credentials: true
}));

app.use(session({
  secret: 'qwerty',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false,
    sameSite: 'lax',
    maxAge: 3600000
  }
}));

app.use('/api/products/', ProdRouter);
app.use('./api/users/', UserRouter);

app.listen(3000, () => {
  console.log(`app.js from YotasTacos listening on port: ${port}`);
});
