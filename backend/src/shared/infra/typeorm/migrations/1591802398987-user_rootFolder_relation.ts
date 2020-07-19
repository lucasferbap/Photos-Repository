import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class UserRootFolderRelation1591802398987
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'rootFolderId',
                type: 'uuid',
                isNullable: true,
            }),
        );

        await queryRunner.createForeignKey(
            'users',
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
        await queryRunner.dropForeignKey('users', 'rootfolderId');
        await queryRunner.dropColumn('users', 'rootFolderId');
    }
}
