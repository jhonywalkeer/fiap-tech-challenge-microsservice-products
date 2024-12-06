```
project-name/
│
├── src/
│   ├── application [ou data] (Camada da aplicacao)
│   │   ├── dtos (Data transfer object de input)
│   │   ├── mappers (para serem tratar respostas do repositórios de forma que estejam de acordo com o contrato da api)
│   │   ├── protocols (interfaces de contratos que a camada de aplicação deve seguir)
|   │   │   ├── http
│   │   ├── queues (Interfaces referente aos métodos de read, delete e send para serem implementadas no src\main\adapters\queues)
|   │   │   ├── common
|   │   │   ├── consumers
|   │   │   ├── producers
│   │   ├── repositories (Interfaces referente aos métodos dos repositories para serem implementadas no infrastructure\persistence\database\repositories)
│   │   ├── usecases (Métodos do usecase que chama a interface dos repositories e implementa as interfaces do domain\usecases)
|   ├── bootstrap
|   │   ├── server.ts
│   ├── common
│   │   ├── constants
│   │   ├── errors
│   │   ├── interfaces
│   │   ├── types
│   │   ├── utils
│   │   |   ├── exceptions
│   │   |   ├── filters
│   │   |   ├── formaters
│   │   |   ├── identifiers
│   │   |   ├── loggers
│   ├── domain
│   │   ├── entities
│   │   ├── enums
│   │   ├── interfaces (Interfaces referente estrutura dos dados dos parâmetros dos metodos que são trafegados entre usecases e reportórios)
│   │   ├── usecases (Interfaces referente aos métodos dos use cases para serem implementadas no application\usecases)
│   │   ├── value-objects
│   ├── infrastructure
│   │   ├── persistence (Agrupa a configuração do banco de dados e classes responsáveis por salvar dados)
│   │  	 |	 ├── database
│   │  	 |	 |	  ├── migrations
│   │  	 |	 |	  ├── repositories
│   │  	 |	 |	  ├── schemas
│   │  	 |	 |	  ├── seeds
│   │  	 |	 ├── cache
│   ├── main
│   │   ├── adapters
│   │  	 |	 ├── framework
│   │  	 |	 ├── queues
│   │   ├── factories (Implementa a construção da logica do controller)
│   │   ├── framework
│   │  	 |	 ├── express (nome do framework)
│   │  	 |	 |	  ├── modules
│   │  	 |	 |    ├── routes (Agrupa a configuracao espeficia do framwork para utilizacao das rotas)
│   │   ├── routes
│   ├── presentation (Camada de apresentacao)
│   │   ├── controllers (Um classe para cada controller com o metodo handler)
│   │   ├── helpers (Agrupa funções e utilitários auxiliares para response dos controllers)
│   │   ├── middlewares (Middlewares de auth e rate limit)
│   │   ├── validators (Classes para validação de parâmetros de entrada que chegam na controller (validando por exemplo se e string, number, enum etc no DTO)
```
