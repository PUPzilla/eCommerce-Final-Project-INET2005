import express from 'express';
import cors from `cors`;
import UserRouter from './routes/users.js';

const port = process.env.PORT || 3000;
const app = express();

app.use(express.json());
app.use(express.urlencoded({ extended: true }));
app.use(express.static('public'));

app.use(cors({
    origin: 'http://localhost:5173',
    credentials: true
}));

app.use(session({
    secret: '234xfcgsfad6543gfhfhpojh',
  resave: false,
  saveUninitialized: true,
  cookie: {
    httpOnly: true,
    secure: false, // Set to 'true' if using HTTPS in production
    sameSite: 'lax', // Consider 'none' if client and server are on different origins
    maxAge: 360000 // 1 hour in millisecs
  }
}));

// app.use('/', homeRouter);
app.use('/users', UserRouter);

app.get('/', (req, res) => {
    res.send('Express test');
});

app.listen(port, () => {
    console.log(`app.js from YotasTacos listening on port: ${port}`);
});
