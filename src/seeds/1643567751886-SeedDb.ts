import { MigrationInterface, QueryRunner } from 'typeorm';

export class SeedDb1643567751886 implements MigrationInterface {
  name = 'SeedDb1643567751886';

  public async up(queryRunner: QueryRunner): Promise<void> {
    await queryRunner.query(
      `INSERT INTO tags (name) VALUES ('dragons'), ('coffee'), ('nestjs')`,
    );

    // password: 123
    await queryRunner.query(
      `INSERT INTO users (username, email, password) VALUES ('foo', 'foo@gmail.com', '$2b$10$qP2h65LCbUhU0taV/H4hle7YXZB2l4Hu4yM33Mfdfp12HGu4p5XkO')`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('first-article', 'First article', 'first article desc', 'first article body', 'coffee,dragons', 1)`,
    );

    await queryRunner.query(
      `INSERT INTO articles (slug, title, description, body, "tagList", "authorId") VALUES ('second-article', 'Second article', 'second article desc', 'second article body', 'coffee,dragons', 1)`,
    );
  }

  public async down(): Promise<void> {}
}
