# Pessoas

#### Dados:

- [x] Nome `*`
- [x] Nome Social
- [x] CPF `*`
- [x] RG `*`
- [x] Nome Pai `*`
- [x] Nome Mãe `*`
- [x] Data de Nascimento `*`
- [x] Telefone `*`
- [x] Telefone Tipo (1 - Celular, 2 - Residencial, 3 - Comercial) `*`
- [x] Email `*`
- [x] Email Alternativo
- [x] Senha
- [x] Avatar
- [x] Sexo (true - Masculino, false - Feminino) `*`
- [x] Endereço `*`
- [x] Número `*`
- [x] Complemento `*`
- [x] Bairro `*`
- [x] Cidade `*`
- [x] Estado `*`
- [x] CEP `*`
- [x] Endereço Tipo (1 - Residencial, 2 - Comercial) `*`

##### - Tabelas:

. Nomenclatura da tabela: todas as tabelas relacionadas a pessoas (clientes, agentes) são especificadas pelo sufixo `pessoas_` e `nome_tabela`

- [x] Pessoas - `pessoas`

| id_pessoa | nome | nome_social | email | cpf | rg | nome_pai | nome_mae | data_nascimento | sexo | status |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | ---: | ---: |
| 1 | João da Silva | João | joao@exemple.com | 000.000.000-01 | 00000001 | José da Silva | Maria da Silva | 1990-01-01 | masculino | 1 |
| 2 | Maria de Souza | Maria | maria@exemple.com | 000.000.000-02 | 00000002 | José de Souza | Maria de Souza | 1990-01-01 | feminino | 1 |

- [x] Telefones - `pessoas_telefones`

| id_telefone | id_pessoa | telefone | telefone_tipo | status |
| :---: | :---: | :---: | :---: | ---: |
| 1 | 1 | (00) 90000-0000 | 1 | 1 |
| 2 | 1 | (00) 0000-0000 | 2 | 1 |

- [x] Endereços - `pessoas_enderecos`

| id_endereco | id_pessoa | endereco | numero | complemento | bairro | cidade | estado | cep | endereco_tipo | status |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | ---: | ---: | ---: | ---: |
| 1 | 1 | Rua Exemplo | 000 | Casa | Centro | Cidade | Estado | 00000-000 | 1 | 1 |
| 1 | 1 | Rua Exemplo 2 | 000 | Casa | Centro | Cidade | Estado | 00000-000 | 2 | 0 |

##### - Relacionamentos:

- [x] Pessoas - Telefones
- [x] Pessoas - Endereços

##### - Regras de Negócio:

- [x] Não pode haver duplicidade de CPF
- [x] Não pode haver duplicidade de RG
- [x] Não pode haver duplicidade de Telefone
- [x] Não pode haver duplicidade de Email
- [x] Validar CPF
- [x] Validar Telefone
- [x] Validar Email
- [x] Validar Cep
- [x] encriptar senha

##### - Observações:

- [x] O campo `status` é um campo que define se está ativa ou não no sistema, por padrão, todas os registros cadastrados são ativos, porém, caso seja necessário, o usuário pode desativar uma registro.
- [x] Para desativar uma pessoa, é necessário desativar todos os seus endereços e telefones, para que não haja registros ativos relacionados a uma pessoa desativada.
- [x] Para desativar um endereço ou telefone, outro registro deve ser criado.

##### - Ações:

###### - Pessoas:

- [x] Cadastrar
- [x] Editar
- [x] Excluir (Apenas desativar)
- [x] Listar
- [x] Pesquisar
- [x] Avatar

###### - Telefones:

- [x] Cadastrar
- [x] Editar
- [x] Excluir (Apenas desativar)

###### - Endereços:
dsdcdc
- [x] Cadastrar
- [x] Editar
- [x] Excluir (Apenas desativar)
