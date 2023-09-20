import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class MigrationPessoas1693834620598 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "pessoas",
                columns: [
                    {
                        name: "id_pessoa",
                        type: "uuid",
                        isPrimary: true,
                    },
                    {
                        name: "nome",
                        type: "varchar",
                    },
                    {
                        name: "nome_social",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "email",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "email_alternativo",
                        type: "varchar",
                        isNullable: true,
                    },
                    {
                        name: "senha",
                        type: "varchar",
                    },
                    {
                        name: 'avatar',
                        type: 'varchar',
                        isNullable: true,
                    },
                    {
                        name: "cpf",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "rg",
                        type: "varchar",
                        isUnique: true,
                    },
                    {
                        name: "nome_pai",
                        type: "varchar",
                    },
                    {
                        name: "nome_mae",
                        type: "varchar",
                    },
                    {
                        name: "data_nascimento",
                        type: "date",
                    },
                    {
                        name: "sexo",
                        type: "boolean"
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
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("pessoas");
    }

}
