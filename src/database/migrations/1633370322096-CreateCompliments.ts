import {MigrationInterface, QueryRunner, Table} from "typeorm";

export class CreateCompliments1633370322096 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "compliments",
                columns: [
                    {
                        name: "id",
                        type: "uuid",
                        isPrimary: true
                    },
                    {
                        name: "user_sender",
                        type: "uuid"
                    },
                    {
                        name: "user_receiver",
                        type: "uuid"
                    },
                    {
                        name: "tag_id",
                        type: "uuid"
                    },
                    {
                        name: "message",
                        type: "varchar"
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "now()"
                    }
                ],
                //array de chaves estrangeiras
                foreignKeys: [ //primeira opção de criar FK
                    {
                        name: "FKUserSenderCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_sender"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKUserReceiverCompliments",
                        referencedTableName: "users",
                        referencedColumnNames: ["id"],
                        columnNames: ["user_receiver"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    },
                    {
                        name: "FKTagCompliments",
                        referencedTableName: "tags",
                        referencedColumnNames: ["id"],
                        columnNames: ["tag_id"],
                        onDelete: "SET NULL",
                        onUpdate: "SET NULL"
                    }
                ]
            })
        )
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("compliments")
    }

}


/*
* no Beekeeper as chaves ficam :
* azul -> PK
* amarelo -> FK
*/


/*
* Foreigkey -> por padrão usar FK no início, tabela,
* nome da tabela destino
*
* declarar de qual tabela e coluna está referenciando
*/

/* 
* -> segunda forma de criar FK (para deletar é mais complexa)
*
* await queryRunner.createForeignKey(
*   "compliments",
*   new TableForeignKey({
*       name: "FKUserSenderCompliments",
*               referencedTableName: "users",
*               referencedColumnNames: ["id"],
*               columnNames: ["user_sender"],
*               onDelete: "SET NULL",
*               onUpdate: "SET NULL"   
*   })
* }
*/