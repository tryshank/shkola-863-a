const express = require('express');
const app = express();

const bodyParser = require('body-parser');

const morgan = require('morgan');
const flash = require('connect-flash');
const cookieParser = require('cookie-parser');


app.use(cookieParser());
app.use(morgan('dev'));
app.use(bodyParser.json());
app.use(bodyParser.urlencoded({ extended: true }));
app.use(flash());

/*
schema.statics.findById = function (_id, cb) {
  return this.find('{_id}').sort('_id').limit(1).
  exec(cb);
};
*/

const sendHeaders = (res) => {
  res.header('Access-Control-Allow-Origin', '*');
  res.header('Access-Control-Allow-Methods', 'GET,POST,PUT,DELETE,OPTIONS');
  res.header('Access-Control-Allow-Headers',
    'Access-Control-Allow-Headers, Origin,Accept, X-Requested-With, Content-Type,' +
    'Access-Control-Request-Method, Access-Control-Request-Headers');
  res.header('Accept', 'application/json,image/jpeg,image/png,image/gif');
};


// AuthConfig
const loginConfig = require('./auth/config/AuthConfig');
loginConfig.configure(app);


process.env.NODE_CONFIG_DIR = 'config';
console.log(`RUNNING ON ENVIRONMENT: ${process.env.NODE_ENV}`);


// AuthRoute
const AuthRoute = require('./auth/route/AuthRoute');
app.use('/api/auth', AuthRoute);

// ClientRoute
const CourseRoute = require('./auth/route/CourseRoute');
app.use('/api/course', CourseRoute);


app.use((req, res, next) => {
  sendHeaders(res);
  next();
});
app.use('/image', express.static('img'));
app.use(express.static(`${__dirname}/client`));

app.get('*', (req, res) => {
  res.sendFile(`${__dirname}/client/index.html`);
});

app.listen(3000, () => {
  console.log('Listening on port 3000!');
});

console.log('---');
