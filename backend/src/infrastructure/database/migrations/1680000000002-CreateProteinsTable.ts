import { MigrationInterface, QueryRunner, Table } from "typeorm";

export class CreateProteinsTable1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "proteins",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "name",
            type: "varchar",
            length: "100",
          },
          {
            name: "monthly_incidence",
            type: "int",
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
            onUpdate: "CURRENT_TIMESTAMP",
          },
        ],
      })
    );
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("proteins");
  }
}
