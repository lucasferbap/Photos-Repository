import {
    MigrationInterface,
    QueryRunner,
    Table,
    TableForeignKey,
} from 'typeorm';

export default class Albuns1596596048261 implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.createTable(
            new Table({
                name: 'albuns',
                columns: [
                    {
                        name: 'id',
                        type: 'uuid',
                        isPrimary: true,
                        generationStrategy: 'uuid',
                        default: 'uuid_generate_v4()',
                    },
                    {
                        name: 'album_name',
                        type: 'varchar',
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
                        name: 'rootFolderId',
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
            'albuns',
            new TableForeignKey({
                name: 'rootfolderId',
                columnNames: ['rootFolderId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'root_folders',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropForeignKey('albuns', 'rootfolderId');
        await queryRunner.dropTable('albuns');
    }
}
