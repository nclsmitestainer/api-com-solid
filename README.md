# App

Gympass style app.

## RFs -> Requisitos funcionais = Funcionalidades da nossa aplicação.

- [x] Deve ser possível se cadastrar;
- [x] Deve ser possível se autenticar;
- [x] Deve ser possível obter o perfil de um usuário logado;
- [x] Deve ser possível obter o número de check-ins realizado pelo usuário logado;
- [x] Deve ser possível o usuário obter seu histórico de check-ins;
- [x] Deve ser possível o usuário buscar academias próximas (até 10km);
- [x] Deve ser possível o usuário buscar academias pelo nome;
- [x] Deve ser possível o usuário realizar check-in em uma academia;
- [x] Deve ser possível validar o check-in de um usuário;
- [x] Deve ser possível cadastrar uma academia;

## RNs -> Regras de negócio = Caminhos que cada requisito pode tomar.

- [x] O usuário não deve poder se cadastrar com um e-mail duplicado;
- [x] O usuário não pode fazer 2 check-ins no mesmo dia;
- [x] O usuário não pode fazer check-in se não estiver perto (100m) da academia;
- [ ] O check-in só pode ser validado até 20 minutos após criado. (evita algo do tipo: usuário faz check-in hoje mas vai na academia outro dia);
- [x] O check-in só pode ser validado por administradores;
- [x] A academia só pode ser cadastrada por administradores;

## RNFs -> Requisitos não funcionais = Banco de dados que vou usar, estratégias e etc, coisas mais técnicas que normalmente o usuário final não vai falar sobre isso.

- [x] A senha do usuário precisa estar criptografada;
- [x] Os dados da aplicação precisam estar persistidos em um banco PostgreSQL;
- [x] Todas listas de dados precisam estar paginadas com 20 itens por página;
- [x] O usuário deve ser identificado por um JWT (JSON Web Token);

# Exemplo de RF e RN

Nesse exemplo, o RF do usuário fazer check-in leva ao RN da distancia minima para esse check-in.

# Anotações durante aulas

- Os arquivos dentro de use-cases foram feitos com a ideia de que se no futuro houver alguma integração (que não dependa de requisições HTTP) para a criação de usuários, temos um arquivo e código simples para utilizarmos para ambas as formas, deixando assim mais organizado e simplificado. Essa pasta de use-cases é comumente chamada de services.

- Repositories nos ajuda a separar e organizar o código, além de ficar mais fácil caso futuramente queremos ou precisaremos trocar de ORM, basta alterar os arquivos daquela pasta, tornando assim a manutenção mais fácil já que não será necessário mexer no código de toda a aplicação. Esse método é chamado de 'repositories pattern'.
