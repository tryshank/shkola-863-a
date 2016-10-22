const express = require('express');
const app = express();
const bodyParser = require('body-parser');
const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');
const assert = require('assert');

// Auth config
const loginConfig = require('./auth/config/AuthConfig');
loginConfig.configure(app);

// MongoDB config
const mongoConfig = require('./auth/config/MongoConfig');
mongoConfig.configure();

app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

const sendHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,' +
    'Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Accept', 'application/json,image/jpeg,image/png,image/gif');
};

app.use((req, res, next) => {
  sendHeaders(res);
  next();
});


// Client routes
const CourseRoute = require('./auth/route/CourseRoute');
app.use('/api/course', CourseRoute);

// Images routes
const ImageRoute = require('./auth/route/ImagesRoute');
app.use('/api/image', ImageRoute);

// Auth routes
const AuthRoute = require('./auth/route/AuthRoute');
app.use('/api/auth', AuthRoute);

// Send email route (from client contact form)
const EmailRoute = require('./auth/route/EmailRoute');
app.use('/api/send-mail', EmailRoute);

// Send email route (from client contact form)
const AdminRoute = require('./auth/route/AdminRoute');
app.use('/api/admin', AdminRoute);

app.use('/image', express.static('img'));
app.use(express.static(`${__dirname}/client`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

process.env.NODE_CONFIG_DIR = 'config';
console.log(`RUNNING ON ENVIRONMENT: ${process.env.NODE_ENV}`);

const server = app.listen(process.env.ENV_SERVER_PORT, () => {
  console.log(`listening server on port ${server.address().port}`);
});

assert(process.env.ENV_MAIL_PASSWORD,
  'Warning! E-mail password is empty!');

assert(process.env.ENV_MAIL_USER,
  'Warning! E-mail user is empty!');

assert(process.env.ENV_MAIL_SERVER,
  'Warning! E-mail server is empty!');

console.log('---');
