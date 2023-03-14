# Sobre o Projeto

Projeto Fullstack:
  consiste em uma aplicação que possui tanto o backend quanto o frontend.
Esse projeto visa ser um CRUD de entidades usuário (anunciante ou comprador) e possui algumas funcionalidades:

- Anunciante - Entidade que será responsável pelo cadastro de anúncios/edição/deleção.
- Comprador - Entidade que será responsável compra dos anúncios e se comunicará via whatsapp caso haja interesse.
- Anúncios - Entidade que será criada apartir do anunciante.
- Comentários - Entidade que será criada/editada/deletada pelo autor do comentário.

### Feito Com

Abaixo segue o que foi utilizado na criação deste projeto:

#### Front End

- React - Framework Utilizado para desenvolver interfaces web.
- Vite - Agiliza nosso processo de desenvolvimento, com instalacoes e build de pacotes/modulos javascript feitas rapidamente.
- typescript - Linguagem totalmente tipada baseada no javascript, para fortalecer o seu desenvolvimento em equipe,rendendo mais e fazendo voce perder menos tempo procurando propriedades ou metodos escondidos no objeto.
- Axios - Biblioteca Utilizada para trabalhar com requisicoes.
- styled-components - Biblioteca de estilizacao utilizada em conjunto com o react.
- ChakraUi - Biblioteca de estilizacao utilizada em conjunto com o react.
- react-hook-form - Bliblioteca utilizada para se trabalhar com formulários.
- yup - Biblioteca utilizada para validação de formulários.
- react-router-dom - Biblioteca utilizada para se trabalhar com o roteamento da aplicação.

#### Back End

- Node - Ambiente para executar nosso Javascript fora do browser
- Express - Framework para se construir APIS REST
- Typeorm - ORM javascript utilizada para se trabalhar com diversos tipos de db
- yup - Biblioteca utilizada para validação de formulários
- json-web-token - utilizado para construir um token autenticação
- bcriptjs - utilizado para hashear senhas

## Começando

Para conseguir utilizar o projeto localmente,siga os passos abaixo.

### Pré-requisitos

- Necessário uma IDE,de preferência uma com terminal integrado em sua interface,(para facilitar a execucão dos comandos).

- Necessário Node v18 ou maior

- Necessário NPM

- Necessário postgreSQL

- Você precisará estar com dois terminais abertos para e execução de ambas as aplicações em paralelo, pois ela se comunicarão entre si via localhost.

### Instalação Back-end

1. Para inicializar a aplicação é bem simples, bastar clonar o repositóriorio e entrar nas respectivas pastas: back-end e front-end.
2. Dentro da basta back-end instale as dependências:

```sh
  yarn #instala as dependências
```

2. Siga o exemplo do .env.example para se configurar corretamento o projeto a assim se conectar ao postgreSQL, você irá precisar do banco de dados postgreSQL rodando na porta 5432, terá que criar um usuário e um banco de dados(caso ja tenha ótimo).
3. dentro da pasta back-end execute as migrations

```sh
  yarn typeorm migration:run -d ./data-source.ts
```

4.Agora é so rodar o back-end:

```sh
  yarn dev
```

5.  Você verá algo semelhante no terminal:

```sh
    [INFO] 00:14:03 ts-node-dev ver. 2.0.0 (using ts-node ver. 10.9.1, typescript ver. 4.9.5)
    Express app started! running on http://localhost:3000
    query: SELECT * FROM current_schema()
    query: SELECT version();
```

- Projeto Back End rodando perfeitamente!

### Instalação Front End

1. entre na pasta front-end e rode o seguinte comando para instalar as dependências:

```sh
  yarn
```

2. Execute o projeto:

```sh
  yarn dev
```

3.Você verá algo semelhante:

```sh
    VITE v4.0.4  ready in 808 ms

  ➜  Local:   http://localhost:3000/
  ➜  Network: use --host to expose
  ➜  press h to show help
```

- Projeto Front End Rodando perfeitamente!

### Utilizando o projeto

1.  A Utilização é simples, primeiro crie uma conta comprador ou anunciante na aplicação.
2.  Com uma conta você terá as seguintes possibilidades:
    - Com a conta anunciante a criação de anúncios,deleção e update;
    - Edição e deleção da própria conta(comprador ou anunciante).
    - Criação/edição/deleção do próprio comentário na página de um anúncio.
