import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class MigrationPessoasEnderecos1693999029529 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pessoas_enderecos",
                columns: [
                    {
                        name: "id_endereco",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "id_pessoa",
                        type: "uuid",
                    },
                    {
                        name: "endereco",
                        type: "varchar",
                    },
                    {
                        name: "numero",
                        type: "varchar",
                    },
                    {
                        name: "complemento",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "bairro",
                        type: "varchar",
                    },
                    {
                        name: "cidade",
                        type: "varchar",
                    },
                    {
                        name: "estado",
                        type: "varchar",
                    },
                    {
                        name: "cep",
                        type: "varchar",
                    },
                    {
                        name: "endereco_tipo",
                        type: "integer",
                    },
                    {
                        name: "status",
                        type: "boolean",
                        default: true,
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "now()",
                    },
                ],
                foreignKeys: [
                    {
                        name: "FKPessoasEnderecos",
                        referencedTableName: "pessoas",
                        referencedColumnNames: ["id_pessoa"],
                        columnNames: ["id_pessoa"],
                        onDelete: "CASCADE",
                        onUpdate: "CASCADE",
                    },
                ],
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pessoas_enderecos");
    }

}
