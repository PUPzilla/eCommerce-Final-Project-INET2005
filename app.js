import express from 'express';
import ProdRouter from './routes/products.js';
import UserRouter from './routes/users.js';
import cors from 'cors';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));
app.use('api/products/', ProdRouter);
app.use(cors());
app.get('products/:id', function (req, res, next) {
  res.json({ msg: `This is CORS-enabled for all origins.`})
});
app.listen(80, function () {
  console.log(`CORS-enabled web server listening on port 80.`)
});

app.listen(port, () => {
  console.log(`app.js from YotasTacos listening on port: ${port}`);
});
