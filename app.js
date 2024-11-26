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

//  Cart stored in customer's session
app.use((req, res, next) => {
  if(!req.session.cart){//  Initialize an empty cart if one doesn't already exist
    req.session.cart = [];
  }
  next();
});

app.listen(3000, () => {
  console.log(`app.js from YotasTacos listening on port: ${port}`);
});
