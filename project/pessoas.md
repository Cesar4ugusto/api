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
- [ ] Telefones - `pessoas_telefones`
- [ ] Endereços - `pessoas_enderecos`

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
