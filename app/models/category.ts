import { DateTime } from 'luxon'
import slugify from 'slugify'
import { BaseModel, beforeCreate, column, hasMany } from '@adonisjs/lucid/orm'
import type { HasMany } from '@adonisjs/lucid/types/relations'
import Book from './book.ts'

import { CategorySchema } from '#database/schema'

export default class Category extends BaseModel {
  static table = 'categories'

  @column({ isPrimary: true })
  declare id: number

  @column()
  declare name: string

  @column()
  declare slug: string

  @column()
  declare description: string | null

  @column.dateTime({ autoCreate: true })
  declare createdAt: DateTime

  @column.dateTime({ autoCreate: true, autoUpdate: true })
  declare updatedAt: DateTime

  @hasMany(() => Book, { foreignKey: 'categoryId' })
  declare books: HasMany<typeof Book>

  @beforeCreate()
  static async generateSlug(category: Category) {
    if (category.slug) {
      return
    }

    const base =
      slugify(category.name, {
        lower: true,
        strict: true,
      }) || 'categoria'

    let slug = base
    let suffix = 1

    while (await Category.query().select('id').where('slug', slug).first()) {
      suffix++
      slug = `${base}-${suffix}`
    }

    category.slug = slug
  }
}
