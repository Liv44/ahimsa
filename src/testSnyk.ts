import express from 'express';
const app = express();

app.get('/xss', (req, res) => {
  res.send('Bonjour ' + req.query.name);
});

app.listen(3000, () => {
  console.log('Serveur démarré sur le port 3000');
});

const secretVariable = 'clé-super-secrète-123';
console.log("Secret utilisé pour l'auth:", secretVariable);
