import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class TurnAlbumIdNullable1597692975367
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.changeColumn(
            'photos',
            'albumId',
            new TableColumn({
                name: 'albumId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.addColumn(
            'photos',
            new TableColumn({
                name: 'rootFolderId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'photos',
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
        await queryRunner.dropColumn('photos', 'rootFolderId');

        await queryRunner.changeColumn(
            'photos',
            'albumId',
            new TableColumn({
                name: 'albumId',
                type: 'uuid',
            }),
        );
    }
}
