# Projeto Tasks

Aplicação web em Node.js com Express e autenticação por sessão (`express-session`).

Demo online: https://projeto-tasks-1j6l.onrender.com

No plano gratuito do Render o serviço hiberna após um tempo sem acessos, então o primeiro carregamento pode levar cerca de 1 minuto.

## Antes de começar

Você precisa ter instalado:

- Node.js 20.6 ou superior: https://nodejs.org (baixe a versão LTS)
- Git: https://git-scm.com/downloads

Para conferir se está tudo certo, abra o terminal e rode:

```bash
node -v
git --version
```

O `node -v` deve mostrar `v20.6.0` ou maior. Se aparecer erro de "comando não encontrado", feche e abra o terminal de novo após a instalação.

## Como rodar localmente

### Passo 1: baixar o projeto

Abra o terminal (no Windows, use PowerShell ou Git Bash) e rode:

```bash
git clone https://github.com/santdev-ux/projeto-tasks.git
```

Isso cria uma pasta chamada `projeto-tasks` no local onde o terminal estava aberto.

Alternativa sem Git: na página do repositório, clique em Code > Download ZIP e extraia o arquivo.

### Passo 2: entrar na pasta do projeto

```bash
cd projeto-tasks
```

Todos os próximos comandos devem ser executados dentro dessa pasta.

### Passo 3: instalar as dependências

```bash
npm install
```

Isso baixa as bibliotecas que o projeto usa (Express e express-session) e cria a pasta `node_modules`. Pode levar alguns segundos.

### Passo 4: criar o arquivo de variáveis de ambiente

O projeto precisa de um arquivo `.env` com as configurações. Existe um modelo pronto chamado `.env.example`. Crie o seu a partir dele:

Linux, macOS ou Git Bash:

```bash
cp .env.example .env
```

Windows (PowerShell):

```powershell
Copy-Item .env.example .env
```

Em seguida, abra o arquivo `.env` em qualquer editor de texto (por exemplo o VS Code) e preencha os valores. Exemplo:

```
PORT=3000
SESSION_SECRET=uma-frase-longa-e-secreta
```

<!-- VERIFICAR: conferir nomes das variáveis no .env.example e a porta padrão -->

- `PORT`: porta onde o site vai rodar na sua máquina.
- `SESSION_SECRET`: texto qualquer, usado para proteger o login. Escolha algo longo e não compartilhe.

Mantenha os nomes das variáveis exatamente como estão no `.env.example`. Se o arquivo tiver outras variáveis, preencha todas.

### Passo 5: iniciar o servidor

```bash
npm run dev
```

O terminal vai ficar "ocupado" rodando o servidor. Isso é normal, não feche a janela. O servidor reinicia sozinho sempre que você salvar um arquivo.

### Passo 6: abrir no navegador

Acesse:

```
http://localhost:3000
```

Se você mudou o `PORT` no `.env`, use o número que escolheu no lugar de `3000`.

### Passo 7: parar o servidor

No terminal onde ele está rodando, pressione `Ctrl + C`.

## Estrutura do projeto

```
public/      arquivos estáticos (CSS, JS do front-end, imagens)
views/       páginas HTML
index.html   página inicial
server.js    servidor Express
.env.example modelo das variáveis de ambiente
```

## Deploy no Render

1. Crie uma conta em https://render.com e clique em New > Web Service.
2. Conecte sua conta do GitHub e selecione o repositório do projeto (faça um fork antes, se for usar o seu).
3. Preencha os campos:
   - Runtime: `Node`
   - Build Command: `npm install`
   - Start Command: `node server.js`
4. Na seção Environment, adicione as mesmas variáveis do seu `.env`, uma por uma. O Render não lê o arquivo `.env`.
5. Adicione também a variável `NODE_VERSION` com o valor `20`.
6. Clique em Create Web Service e aguarde o build terminar. O link público aparece no topo da página do serviço.

A cada `git push` na branch `main`, o Render publica a nova versão automaticamente.

O servidor precisa usar `process.env.PORT` para funcionar no Render.

## Problemas comuns

`node: bad option: --env-file`
Sua versão do Node é anterior à 20.6. Atualize e rode `node -v` para conferir.

`Cannot find module 'express'`
As dependências não foram instaladas. Rode `npm install` dentro da pasta do projeto.

`EADDRINUSE: address already in use`
A porta já está em uso. Troque o valor de `PORT` no `.env` (por exemplo para `3001`) e rode de novo.

`npm: command not found` ou `'npm' is not recognized`
O Node.js não está instalado ou o terminal precisa ser reaberto.

O login não funciona ou a sessão não é mantida
Confira se o arquivo `.env` existe na raiz do projeto (na mesma pasta do `package.json`) e se `SESSION_SECRET` está preenchida.

Ao rodar `npm run dev`, aparece "no such file .env"
O Passo 4 não foi feito. Crie o `.env` a partir do `.env.example`.
