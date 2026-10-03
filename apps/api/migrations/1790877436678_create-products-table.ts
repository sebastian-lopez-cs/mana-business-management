import type { ColumnDefinitions, MigrationBuilder } from 'node-pg-migrate';

export const shorthands: ColumnDefinitions | undefined = undefined;

export async function up(pgm: MigrationBuilder): Promise<void> {
    pgm.createTable("products", {
        id: {
            type: "integer",
            primaryKey: true,
            notNull: true,
            sequenceGenerated: {
                precedence: "BY DEFAULT",
            },
        },
        name: {
            type: "text",
            notNull: true,
        },
        price_centavos: {
            type: "integer",
            notNull: true,
            check: "price_centavos >= 0",
        },
        is_available: {
            type: "boolean",
            notNull: true,
            default: true,
        },
        created_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
        updated_at: {
            type: "timestamptz",
            notNull: true,
            default: pgm.func("current_timestamp"),
        },
    });
}

export async function down(pgm: MigrationBuilder): Promise<void> {
    pgm.dropTable("products");
}
