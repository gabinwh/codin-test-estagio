# Prova prática - CODIN

## Sobre o projeto
 - Foi desenvolvido uma aplicação atendendo as necessidades requeridas na prova prática da codin.


## ⚙️ Tecnologias usadas

Antes de começar, verifique se você atendeu aos seguintes requisitos:

-   [ Node.js](https://nodejs.org/en/), v16.16;
-   [ MySQL](https://www.mysql.com/);
-   [ React](https://pt-br.reactjs.org/);



## 🚀 Iniciando a aplicação localmente

### Para iniciar o projeto, siga estas etapas:

### Na pasta *codin-api/* execute as seguintes instruções

#### Instalar as dependências da api:

```bash
npm install
```

#### Configurar o banco de dados da api:

##### No arquivo *codin-api/models/db.js* será inserido as configurações do seu banco de dados;
- No lugar de "codin" coloque o nome do seu banco de dados;
- No lugar de "root" e de "" coloque o usuário e senha;
- Mude o host para o qual está utilizando;


#### Seeder de usuários:

```bash
node models/UsuarioSeeder.js
```

#### Seeder de processos:

```bash
node models/ProcessoSeeder.js
```

#### Iniciar a api:

```bash
node index.js
```

##### Observação: Email criados: joao_silva@email.com, maria_santos@email.com, jorge_costa@email.com . A senha é 'password'


### Na pasta *codin-client/* execute as seguintes instruções

#### Instalar as dependências da api:

```bash
npm install
```

#### Iniciar a api:

```bash
npm run dev
```

##### Observação: Utilize as credenciais criadas nas etapas anteriores.


## Comentários:

- Não foi possível terminar por completo a aplicação, ficou faltando as telas do front-end (caixa de entrada, caixa de saída e caixa dos arquivados);
- Foi feito a landing page, login e toda a api;




