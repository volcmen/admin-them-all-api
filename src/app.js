import express from 'express';
import cors from 'cors';
import morgan from 'morgan';
import cookieParser from 'cookie-parser';
import bodyParser from 'body-parser';
import jwt from 'jsonwebtoken';
import config from 'config';
import entry from './routes/entry';
import requests from './routes/requests';
import mongo from './controllers/mongo';

const jwtSecret = config.get('auth.jwt.secret');
const app = express();

mongo; // eslint-disable-line

app.use(cors());

app.use(morgan('combined'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(cookieParser());

let user = '';

export const getAuthedUserName = () => user;


const checkingAuth = (req, res, next) => {
    const auth = req.headers.authorization;
    console.log('Auth?', auth);
    jwt.verify(auth, jwtSecret, (err, decoded) => {
        if (err) {
            console.error('jwt error', err);
            return res.status(401).end('Unauthorized');
        }
        console.log('auth ok', decoded);
        user = decoded.user; // eslint-disable-line
        return next();
    });
};

app.use('/entry', entry);
app.use('/requests', checkingAuth, requests);

// catch 404 and forward to error handler
app.use((req, res, next) => {
    const err = new Error('Not Found');
    err.status = 404;
    next(err);
});

// error handler
app.use((err, req, res) => {
    // set locals, only providing error in development
    res.locals.message = err.message;
    res.locals.error = req.app.get('env') === 'development' ? err : {};

    // render the error page
    res.status(err.status || 500);
    res.render('error');
});


app.set('port', (process.env.PORT || 4001));

app.listen(app.get('port'), () => {
    console.log('Server running at port: ', app.get('port'));
});

export const User = user;
