import { MigrationInterface, QueryRunner, TableColumn } from 'typeorm';

export default class addAvatarColumnToUsersTable1588568203293
    implements MigrationInterface {
    name = 'addAvatarColumnToUsersTable1588568203293';

    public async up(queryRunner: QueryRunner): Promise<void> {
        queryRunner.addColumn(
            'users',
            new TableColumn({
                name: 'avatar',
                type: 'varchar',
                isNullable: true,
            }),
        );
    }

    public async down(queryRunner: QueryRunner): Promise<void> {
        queryRunner.dropColumn('users', 'avatar');
    }
}
