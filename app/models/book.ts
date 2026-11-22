import { DateTime } from 'luxon'
import slugify from 'slugify'
import { BaseModel, beforeCreate, belongsTo, column, scope } from '@adonisjs/lucid/orm'
import type { BelongsTo } from '@adonisjs/lucid/types/relations'
import Author from './author.ts'
import Category from './category.ts'

import { BookSchema } from '#database/schema'

export default class Book extends BaseModel {
  static table = 'books'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare title: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column()
  declare publicationYear: number | null

  @column()
  declare publisher: string | null

  @column()
  declare isbn: string | null

  @column()
  declare language: string | null

  @column()
  declare pages: number | null

  @column()
  declare filePath: string

  @column()
  declare originalFileName: string | null

  @column()
  declare mimeType: string | null

  @column()
  declare fileSize: number | null

  @column()
  declare fileHash: string | null

  @column()
  declare coverPath: string | null

  @column()
  declare isPublished: boolean

  @column.dateTime()
  declare publishedAt: DateTime | null

  @column()
  declare authorId: number

  @column()
  declare categoryId: number

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @belongsTo(() => Author, { foreignKey: 'authorId' })
  declare author: BelongsTo<typeof Author>

  @belongsTo(() => Category, { foreignKey: 'categoryId' })
  declare category: BelongsTo<typeof Category>

  static published = scope((query) => {
    query.where('is_published', true)
  })

  @beforeCreate()
  static async generateSlug(book: Book) {
    if (book.slug) {
      return
    }

    const base =
      slugify(book.title, {
        lower: true,
        strict: true,
      }) || 'livro'

    let slug = base
    let suffix = 1

    while (await Book.query().select('id').where('slug', slug).first()) {
      suffix++
      slug = `${base}-${suffix}`
    }

    book.slug = slug
  }
}
