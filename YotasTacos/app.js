import express from 'express';
import cors from 'cors';
import session from 'express-session';
import ProdRouter from './routes/products.js';
import UserRouter from './routes/users.js';

const port = process.env.PORT || 3000;
const app = express();

//  Middleware
app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors());

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

//  Routes
//  Products
app.use('/api/products/', ProdRouter);

app.listen(3000, () => {
  console.log(`app.js from YotasTacos listening on port: ${port}`);
});
