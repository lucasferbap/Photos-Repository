import {
    MigrationInterface,
    QueryRunner,
    TableColumn,
    TableForeignKey,
} from 'typeorm';

export default class CreatePhotosAlbunsRelations1587354730901
    implements MigrationInterface {
    public async up(queryRunner: QueryRunner): Promise<void> {
        await queryRunner.addColumn(
            'photos',
            new TableColumn({
                name: 'albumId',
                type: 'uuid',
                isNullable: true,
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
        await queryRunner.dropColumn('photos', 'albunId');
    }
}
