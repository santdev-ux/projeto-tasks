const PAGINAS = [
  { rota: '/home',       nome: 'Home' },
  { rota: '/salas',      nome: 'Salas de aula' },
  { rota: '/ginasio',    nome: 'Ginásio' },
  { rota: '/biblioteca', nome: 'Biblioteca' },
  { rota: '/piscina',    nome: 'Piscina' },
];

function montarMenu() {
  const atual = window.location.pathname;
  const links = PAGINAS.map(p => `
    <li class="nav-item">
      <a class="nav-link ${p.rota === atual ? 'active' : ''}" href="${p.rota}">${p.nome}</a>
    </li>`).join('');

  document.getElementById('menu').innerHTML = `
    <nav class="navbar navbar-expand-lg navbar-dark bg-success">
      <div class="container">
        <a class="navbar-brand" href="/home">Monitoramento de Ambientes</a>
        <button class="navbar-toggler" data-bs-toggle="collapse" data-bs-target="#nav">
          <span class="navbar-toggler-icon"></span>
        </button>
        <div class="collapse navbar-collapse" id="nav">
          <ul class="navbar-nav me-auto">${links}</ul>
          <a class="btn btn-outline-light btn-sm" href="/logout">Sair</a>
        </div>
      </div>
    </nav>`;
}
document.addEventListener('DOMContentLoaded', montarMenu);