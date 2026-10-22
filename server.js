const express = require('express');
const session = require('express-session');
const path = require('path');

const app = express();
const PORT = 3000;

app.use(express.urlencoded({ extended: false }));
app.use(session({
  secret: process.env.SESSION_SECRET,
  resave: false,
  saveUninitialized: false,
}));
app.use(express.static(path.join(__dirname, 'public')));

const view = (nome) => path.join(__dirname, 'views', nome + '.html');

// Bloqueia páginas para quem não está logado
function exigirLogin(req, res, next) {
  if (req.session.usuario) {
    res.set('Cache-Control', 'no-store'); // o botão Voltar não reabre a página após sair
    return next();
  }
  res.redirect('/login');
}

// 1ª tela: login
app.get('/', (req, res) => res.redirect('/login'));

app.get('/login', (req, res) => {
  if (req.session.usuario) return res.redirect('/home');
  res.sendFile(view('login'));
});

app.post('/login', (req, res) => {
  const { email, senha } = req.body;
  // Provisório, sem banco: usuário fixo. Depois vira consulta ao MySQL.
  if (email === process.env.LOGIN_EMAIL && senha === process.env.LOGIN_SENHA) {
    req.session.usuario = { email };
    return res.redirect('/home');
  }
  res.redirect('/login?erro=1');
});

app.get('/logout', (req, res) => {
  req.session.destroy(() => res.redirect('/login'));
});

// Telas protegidas
for (const pagina of ['home', 'salas', 'ginasio', 'biblioteca', 'piscina']) {
  app.get('/' + pagina, exigirLogin, (req, res) => res.sendFile(view(pagina)));
}

app.use((req, res) => res.status(404).send('Página não encontrada'));

app.listen(PORT, () => console.log(`Rodando em http://localhost:${PORT}`));