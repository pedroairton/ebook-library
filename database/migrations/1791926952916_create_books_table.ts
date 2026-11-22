import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'books'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('title').notNullable()
      table.string('slug').notNullable().unique()
      table.text('description').nullable()
      table.integer('publication_year').nullable()
      table.string('publisher').nullable()

      table.string('isbn', 20).nullable()
      table.string('language', 20).nullable()
      table.integer('pages').nullable()
      table.string('file_path').notNullable()
      table.string('original_file_name').nullable()
      table.string('mime_type', 100).nullable()
      table.bigInteger('file_size').nullable()
      table.string('file_hash').nullable().index()
      table.string('cover_path').nullable()

      table.boolean('is_published').notNullable().defaultTo(true)
      table.timestamp('published_at').nullable()
      table.integer('author_id').unsigned().notNullable()
      table.integer('category_id').unsigned().notNullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()

      table.foreign('author_id').references('id').inTable('authors').onDelete('restrict')

      table.foreign('category_id').references('id').inTable('categories').onDelete('restrict')

      table.index(['title'])
      table.index(['author_id'])
      table.index(['category_id'])
      table.index(['is_published'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
