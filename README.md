# API de contagem de acessos

[**Documentação Swagger (Open Api)**](https://app.swaggerhub.com/apis-docs/mateusferreira6/api-contagem-acessos/1.0.0-oas3#/default/get_)

## Ferramentas 

- Node.js
- Typescript
- Express
- Serverless
- DynamoDB
- Axios
- Bcrypt
- Helmet.js
- Github Actions

## Escolhas

O Typescript foi utilizado como liguagem por trazer features importantes como interfaces e generics, além de trazer agilidade e segurança (type safety) no processo de desenvolvimento. 

O Express é uma ferramente amplamente utilizada no ambiente Node.js, sendo, portanto, comum a quase todo mundo que desenvolve em Node.js, facilitando a manutenção por outros desenvolvedores. 

A aplicação seguiu o padrão serveless com (API Gateway / Lambda / Dynamodb). Foram criadas branchs main e develop, cada uma com um pipeline de CI/CD, simulando ambientes de staging (homologação) e produção. Também foram usadas branchs features. 

Foi utilizado TDD com testes unitários (jest) e de integração (jest/superteste) focados principalmente na camada de serviço e no teste dos endpoints.

## Design e Arquitetura

A API foi estruturada por domínios (contagem de acesso e usuários) e foi escolhida uma arquitetura de separação de camadas entre model / repository / service / controller. O principal intuito dessa implementação é separar responsabilidades e criar indepedência entre as camadas. 

O repository pattern, em especial, foi implementado para isolar a camada de acesso ao banco de dados do restante da aplicação. Uma classe abstrata é criada implementando uma interface Repository que recebe um tipo genérico qualquer. A camada service recebe uma injeção de dependência que faz referência à interface Repository e não à implementação dessa interface por uma classe. Isso torna possível alterar o banco de dados usado (por exemplo, para mongodb ou algum relacional) sem ter que alterar a camada service. Isso facilita manutenção e modificações.

## Rodar local

#### Instalar dependências do Serverless Framework globalmente
```shell
npm i -g serverless serverless-dynamodb-local serverless-offline
```

#### Instalar dependências do projeto
```shell
yarn 
```

#### Build

```shell
yarn run build
```

#### Instalar Dynamodb localmente

```shell
sls dynamodb install
```

#### Iniciar servidor local 

```shell
sls offline start
```

## Teste 

```
yarn run test
```
