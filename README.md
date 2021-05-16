# Task Manager

## Uma aplicação web para gerenciar tarefas de multi-usuários

<a name="sobre"></a>
## Sobre
A aplicação é a solucão do autor para um desafio de criação de um gerenciador de tarefas.

<a name="tabela-de-conteudo"></a>
## Tabela de conteúdos

   * [Sobre](#sobre)
   * [Tabela de Conteudo](#tabela-de-conteudo)
   * [Tecnologias](#tecnologias)
   * [Instalação](#instalacao)
   * [Licença](#licenca)

<a name="tecnologias"></a>
## Tecnologias

As seguintes ferramentas foram usadas na construção do projeto:

- [AngularJS] 
- [node.js]
- [Express]
- [Mysql]
- [Sequelize]

<a name="instalacao"></a>
## Instalação

Taskmanager requer [Node.js](https://nodejs.org/) v10+ para rodar.

Os modelos usados pela aplicação foram criados através do Sequelize, aperfeiçoando a implementação do DB. Dessa forma essa nova versão possui ORM que era uma carência da primeira versão.

Assim, desse momento em diante todas as alterações no DB serão incrementais e poderão ser rastreadas. Sendo possível coordernar as alterações feitas por diferentes pessoas nas tabelas do banco como rastrear (e reverter) alterações feitas no banco se for preciso.

Para a documentação do projeto foi utilizado o módulo esDoc, que gera a documentação em html, muito mais legível, à partir dos comentários nos arquivos de interfaces e classes da API.

Essa documentação pode ser acessada na raiz od projeto na pasta docs, abrindo o arquivo index.html

Quando há necessidade de atualizar a documentação, basta rodar o binário do esdoc no terminal através do comando ./node_modules/.bin/esdoc

Para aperfeiçoar o sistema de autenticação e validação dos usuário foram usados os módulos do passport e e passport-local e a configuração foi concentrada no middleware estrategiaAutenticacao.

Quando a autenticação é bem sucedida, a requisição de login recebe os dados de usuário e gera um jwt com o id que é devolvido no header ('Authorization) da resposta da chamada.

Para gerar a senha que assina o jwt, fazendo uso do console, foi executado  comando:  

   -  node -e "console.log(require('crypto').randomBytes(256).toString('base64'))"

   - Onde invocamos o módulo crypto e chamamos o método para criar bytes pseudo-aleatórios e convertemos o resultado para uma string na base 64.

   - Essa senha foi então adicionada ao arquivo .env na raiz do projeto, sobre o parâmetro CHAVE_JWT.

   - Para acessar esse parâmetro, é utilizado o módulo dotenv e assim, através de process.env.CHAVE_JWT a senha é utilizada para assinar o token.

Obs. O correto é adicionar o .env ao .gitignore para proteção da assinatura do token mas como o objetivo desse projeto é apresentar a solução completa, foi feita a opção por publicar o item para consulta de seu contéudo.

Para receber e validar o token nas rotas que precisam de autenticação, foi utilizado o módulo passport-http-bearer e feita a sua configuração no middleware de estrategiaAutenticacao, como estratégia 'bearer' e implementamos através da interface de middlewaresAutenticacao (O middleware de autenticação foi criado para tratar e formatar erros gerados pela validação do passport.)

   Para fazer uso da estratégia nas rotas que devem ser protegidas, basta adicionar o middleware como no exemplo a abaixo:
   router.post('/rota_com_autenticação/', middlewaresAutenticacao.bearer, (req, res, next) => {


Como o JWT tem um tempo de expiração de 15 minutos, foi necessário implementar o refresh token e também uma allowlist para verificar a validade do refresh token.

Para gerir o processo de logout foi preciso criar uma blocklist.

Para trabalhar tanto com a allowlist como com a blocklist, foi utilizado o módulo redis e criamos o cliente do Redis na raiz do projeto.

Para trabalhar com as diferentes listas no redis, foi criada uma interface genérica. Assim blocklist e allowlist podem trabalhar as diferentes regras de negócio e fazer as operações necessárias nas listas.

Com a reformulação do Back-End e das rotas o Front-End foi minimamente modificado para manter a funcionalidade atual porém sem a implementação ainda do refresh token quando o access token expira. A implementação será feita na reformulação completa do Front-End na versão mais atual do Angular.

Instale as dependências e as devDependencies e inicie o servidor.

```sh
cd taskmanager
npm i
npm start
```
<a name="licenca"></a>
## Licença

MIT

   [node.js]: <http://nodejs.org>
   [mysql]: <https://www.mysql.com>
   [express]: <http://expressjs.com>
   [AngularJS]: <http://angularjs.org>
   [Sequelize]: <https://sequelize.org>
   [Passport]: <http://www.passportjs.org>
   

