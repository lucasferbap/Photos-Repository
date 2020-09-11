import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class Photos1597065284937 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'photos',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'alias_name',
                        type: 'varchar',
                    },
                    {
                        name: 'path_name',
                        type: 'varchar',
                    },
                    {
                        name: 'url',
                        type: 'varchar',
                    },
                    {
                        name: 'albumId',
                        type: 'uuid',
                    },
                    {
                        name: 'created_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                    {
                        name: 'updated_at',
                        type: 'timestamp',
                        default: 'now()',
                    },
                ],
            }),
        );

        await queryRunner.createForeignKey(
            'photos',
            new TableForeignKey({
                name: 'albumId',
                columnNames: ['albumId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'albuns',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('photos', 'albumId');
        await queryRunner.dropTable('photos');
    }
}
