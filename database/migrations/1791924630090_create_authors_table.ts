import { BaseSchema } from '@adonisjs/lucid/schema'

export default class extends BaseSchema {
  protected tableName = 'authors'

  async up() {
    this.schema.createTable(this.tableName, (table) => {
      table.increments('id')

      table.string('name').notNullable()
      table.string('slug').notNullable().unique()
      table.text('description').nullable()
      table.string('photo_path').nullable()
      table.timestamp('created_at').nullable()
      table.timestamp('updated_at').nullable()
      table.index(['name'])
    })
  }

  async down() {
    this.schema.dropTable(this.tableName)
  }
}
