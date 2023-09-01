# Cadastro

#### Dados:

- [ ] Nome
- [ ] Nome Social
- [ ] CPF
- [ ] RG
- [ ] Nome Pai
- [ ] Nome Mãe
- [ ] Data de Nascimento
- [ ] Telefone
- [ ] Telefone Residencial
- [ ] Email
- [ ] Endereço
- [ ] Cidade
- [ ] Estado
- [ ] CEP
- [ ] Data de Cadastro
- [ ] Data de Atualização
- [ ] Status

##### - Tabelas:

. Nomenclatura da tabela: todas as tabelas relacionadas a pessoas (clientes, agentes) são especificadas pelo sufixo `pessoas_` e `nome_tabela`

- [ ] Pessoas - `pessoas`

| id_pessoa | nome | nome_social | email | cpf | rg | nome_pai | nome_mae | data_nascimento | created_at | updated_at | status |
| :---: | :---: | :---: | :---: | :---: | :---: | :---: | :---: | ---: | ---: | ---: | ---: |
| 1 | João da Silva | João | joao@exemple.com | 000.000.000-01 | 00000001 | José da Silva | Maria da Silva | 1990-01-01 | 2019-01-01 00:00:00 | 2019-01-01 00:00:00 | 1 |
| 2 | Maria de Souza | Maria | maria@exemple.com | 000.000.000-02 | 00000002 | José de Souza | Maria de Souza | 1990-01-01 | 2019-01-01 00:00:00 | 2019-01-01 00:00:00 | 1 |

- [ ] Telefones - `pessoas_telefones`

| id_telefone | id_pessoa | telefone | telefone_tipo | created_at | updated_at | status |
| :---: | :---: | :---: | :---: | ---: | ---: | ---: |
| 1 | 1 | (00) 90000-0000 | 1 | 2019-01-01 00:00:00 | 2019-01-01 00:00:00 | 1 |
| 2 | 1 | (00) 0000-0000 | 2 | 2019-01-01 00:00:00 | 2019-01-01 00:00:00 | 1 |

- [ ] Endereços - `pessoas_enderecos`

| id_endereco | id_pessoa | endereco | numero | complemento | bairro | cidade | estado | cep | created_at | updated_at | status |
| :---: | :---: | :---: | :---: | :---: | :---: | ---: | ---: | ---: | ---: | ---: | ---: |
| 1 | 1 | Rua Exemplo | 000 | Casa | Centro | Cidade | Estado | 00000-000 | 2019-01-01 00:00:00 | 2019-01-01 00:00:00 | 1 |
| 1 | 1 | Rua Exemplo 2 | 000 | Casa | Centro | Cidade | Estado | 00000-000 | 2019-01-01 00:00:00 | 2019-01-01 00:00:00 | 0 |

##### - Relacionamentos:

- [ ] Pessoas - Telefones
- [ ] Pessoas - Endereços

##### - Regras de Negócio:

- [ ] Não pode haver duplicidade de CPF
- [ ] Não pode haver duplicidade de RG
- [ ] Não pode haver duplicidade de Telefone
- [ ] Não pode haver duplicidade de Email

##### - Observações:

- [ ] O campo `status` é um campo que define se a pessoa está ativa ou não no sistema, por padrão, todas as pessoas cadastradas são ativas, porém, caso seja necessário, o usuário pode desativar uma pessoa, porém, não pode excluí-la do sistema.

##### - Ações:

- [ ] Cadastrar
- [ ] Editar
- [ ] Excluir (Apenas desativar)
- [ ] Listar
- [ ] Pesquisar
- [ ] Visualizar
