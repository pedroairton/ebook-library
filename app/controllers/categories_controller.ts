import type { HttpContext } from '@adonisjs/core/http'
import Category from '../models/category.ts'
import Book from '../models/book.ts'
import { createCategoryValidator, updateCategoryValidator } from '../validators/category.ts'

export default class CategoriesController {
  async index({ inertia }: HttpContext) {
    const categories = await Category.query().withCount('books').orderBy('name', 'asc')

    return inertia.render('Categories/Index', {
      categories,
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('Categories/Form', {
      category: null,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createCategoryValidator)

    const category = await Category.create({
      name: payload.name,
      description: payload.description ?? null,
    })

    session.flash('success', 'Categoria criada com sucesso.')

    return response.redirect().toPath(`/categories/${category.slug}`)
  }

  async show({ params, inertia }: HttpContext) {
    const category = await Category.query()
      .where('slug', params.slug)
      .preload('books')
      .firstOrFail()

    return inertia.render('Categories/Show', {
      category,
    })
  }

  async edit({ params, inertia }: HttpContext) {
    const category = await Category.query().where('slug', params.slug).firstOrFail()

    return inertia.render('Categories/Form', {
      category,
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const category = await Category.query().where('slug', params.slug).firstOrFail()

    const payload = await request.validateUsing(updateCategoryValidator)

    const nameAlreadyExists = await Category.query()
      .where('name', payload.name)
      .whereNot('id', category.id)
      .first()

    if (nameAlreadyExists) {
      session.flash('error', 'Já existe uma categoria com esse nome.')
      return response.redirect().back()
    }

    category.name = payload.name
    category.description = payload.description ?? null

    await category.save()

    session.flash('success', 'Categoria atualizada com sucesso.')

    return response.redirect().toPath(`/categories/${category.slug}`)
  }

  async destroy({ params, response, session }: HttpContext) {
    const category = await Category.query().where('slug', params.slug).firstOrFail()

    const hasBooks = await Book.query().where('category_id', category.id).first()

    if (hasBooks) {
      session.flash(
        'error',
        'Não é possível excluir esta categoria porque ela possui livros cadastrados.'
      )

      return response.redirect().back()
    }

    await category.delete()

    session.flash('success', 'Categoria excluída com sucesso.')

    return response.redirect().toPath('/categories')
  }
}
