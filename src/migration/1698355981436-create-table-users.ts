import { MigrationInterface, QueryRunner, Table } from "typeorm"

export class CreateTableUsers1698355981436 implements MigrationInterface {

    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: "users",
                columns: [
                    {
                        name: "id",
                        type: "int",
                        isPrimary: true,
                        isGenerated: true,
                        generationStrategy: "increment"
                    },
                    {
                        name: "First_name",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "Last_name",
                        type: "varchar",
                        length: "20"
                    },
                    {
                        name: "email",
                        type: "varchar",
                        length: "30",
                        isUnique: true
                    },
                    {
                        name: "phone",
                        type: "number",
                        length: "13"
                    },
                    {
                        name: "password",
                        type: "varchar",
                        length: "15"
                    },
                    {
                        name: "is_active",
                        type: "boolean",
                        default: true
                    },
                    {
                        name: "role",
                        type: "enum",
                        enum: ["user","admin", "superAdmin"],
                        default: '"user"'
                    },
                    {
                        name: "created_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                    },
                    {
                        name: "updated_at",
                        type: "timestamp",
                        default: "CURRENT_TIMESTAMP",
                        onUpdate: "CURRENT_TIMESTAMP"
                    },

                ],
            }),
            true
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropTable("users");
    }

}
