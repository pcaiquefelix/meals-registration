import {
  MigrationInterface,
  QueryRunner,
  Table,
  TableForeignKey,
} from "typeorm";

export class CreateMealsTable1680000000002 implements MigrationInterface {
  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.createTable(
      new Table({
        name: "meals",
        columns: [
          {
            name: "id",
            type: "int",
            isPrimary: true,
            isGenerated: true,
            generationStrategy: "increment",
          },
          {
            name: "protein1_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "protein2_id",
            type: "int",
            isNullable: true,
          },
          {
            name: "day_of_week",
            type: "timestamp",
          },
          {
            name: "meal_type",
            type: "varchar",
            length: "50",
          },
          {
            name: "description",
            type: "varchar",
            length: "70",
            isNullable: true,
          },
          {
            name: "sides",
            type: "varchar",
            length: "70",
            isNullable: true,
          },
          {
            name: "salads",
            type: "varchar",
            length: "70",
            isNullable: true,
          },
          {
            name: "desserts",
            type: "varchar",
            length: "70",
            isNullable: true,
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

    await queryRunner.createForeignKeys("meals", [
      new TableForeignKey({
        columnNames: ["protein1_id"],
        referencedTableName: "proteins",
        referencedColumnNames: ["id"],
      }),
      new TableForeignKey({
        columnNames: ["protein2_id"],
        referencedTableName: "proteins",
        referencedColumnNames: ["id"],
      }),
    ]);
  }

  public async down(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.dropTable("meals");
  }
}
