import express from 'express';
import UserRouter from './routes/users.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.get('/', (req, res) => {
    res.send('Express test');
});

app.listen(port, () => {
    console.log(`app.js from YotasTacos listening on port: ${port}`);
});
