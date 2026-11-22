import { DateTime } from 'luxon'
import slugify from 'slugify'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Book from './book.ts'

import { AuthorSchema } from '#database/schema'

export default class Author extends BaseModel {
  static table = 'authors'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare photoPath: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Book, { foreignKey: 'authorId' })
  declare books: HasMany<typeof Book>

  @beforeCreate()
  static async generateSlug(author: Author) {
    if (author.slug) {
      return
    }

    const base =
      slugify(author.name, {
        lower: true,
        strict: true,
      }) || 'autor'

    let slug = base
    let suffix = 1

    while (await Author.query().select('id').where('slug', slug).first()) {
      suffix++
      slug = `${base}-${suffix}`
    }

    author.slug = slug
  }
}
