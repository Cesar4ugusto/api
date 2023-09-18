import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class MigrationPessoasTelefones1694000373469 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pessoas_telefones",
                columns: [
                    {
                        name: "id_telefone",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "id_pessoa",
                        type: "uuid",
                    },
                    {
                        name: "telefone",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "telefone_tipo",
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
                        name: "FKPessoasTelefones",
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
        await queryRunner.dropTable("pessoas_telefones");
    }

}
