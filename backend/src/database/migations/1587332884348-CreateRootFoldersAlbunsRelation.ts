import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class CreateRootFoldersAlbunsRelation1587332884348
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'albuns',
            new TableColumn({
                name: 'rootFolderId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'albuns',
            new TableForeignKey({
                name: 'RootFolder',
                columnNames: ['rootFolderId'],
                referencedColumnNames: ['id'],
                referencedTableName: 'root_folders',
                onDelete: 'CASCADE',
                onUpdate: 'CASCADE',
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.dropColumn('albuns', 'rootFolderId');
    }
}
