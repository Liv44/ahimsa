import express from 'express';

const app = express();

app.get('/xss', (req, res) => {
  res.send('Hi xss error ' + req.query.name);
});

const dbConfig = {
  host: 'localhost',
  user: 'root',
  password: 'secret123',
  database: 'users_db',
};
console.log('DB config:', dbConfig);

const secretVariable = 'key-123456';
console.log('Secret displayed in console:', secretVariable);
