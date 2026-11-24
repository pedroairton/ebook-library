import type { HttpContext } from '@adonisjs/core/http'
import Author from '../models/author.ts'
import Book from '../models/book.ts'
import { createAuthorValidator, updateAuthorValidator } from '../validators/author.ts'

export default class AuthorsController {
  async index({ inertia }: HttpContext) {
    const authors = await Author.query().withCount('books').orderBy('name', 'asc')

    return inertia.render('Authors/Index', {
      authors,
    })
  }

  async create({ inertia }: HttpContext) {
    return inertia.render('Authors/Form', {
      author: null,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createAuthorValidator)

    let photoPath: string | null = null
    const photo = request.file('photo')

    if (photo) {
      await photo.moveToDisk('authors')
      photoPath = photo.filePath ?? `authors/${photo.fileName}`
    }

    const author = await Author.create({
      name: payload.name,
      description: payload.description ?? null,
      photoPath,
    })

    session.flash('success', 'Autor criado com sucesso.')

    return response.redirect().toPath(`/authors/${author.slug}`)
  }

  async show({ params, inertia }: HttpContext) {
    const author = await Author.query().where('slug', params.slug).preload('books').firstOrFail()

    return inertia.render('Authors/Show', {
      author,
    })
  }

  async edit({ params, inertia }: HttpContext) {
    const author = await Author.query().where('slug', params.slug).firstOrFail()

    return inertia.render('Authors/Form', {
      author,
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const author = await Author.query().where('slug', params.slug).firstOrFail()

    const payload = await request.validateUsing(updateAuthorValidator)

    const nameAlreadyExists = await Author.query()
      .where('name', payload.name)
      .whereNot('id', author.id)
      .first()

    if (nameAlreadyExists) {
      session.flash('error', 'Já existe um autor com esse nome.')
      return response.redirect().back()
    }

    let photoPath = author.photoPath
    const photo = request.file('photo')

    if (photo) {
      await photo.moveToDisk('authors')
      photoPath = photo.filePath ?? `authors/${photo.fileName}`
    }

    author.name = payload.name
    author.description = payload.description ?? null
    author.photoPath = photoPath

    await author.save()

    session.flash('success', 'Autor atualizado com sucesso.')

    return response.redirect().toPath(`/authors/${author.slug}`)
  }

  async destroy({ params, response, session }: HttpContext) {
    const author = await Author.query().where('slug', params.slug).firstOrFail()

    const hasBooks = await Book.query().where('author_id', author.id).first()

    if (hasBooks) {
      session.flash(
        'error',
        'Não é possível excluir este autor porque ele possui livros cadastrados.'
      )

      return response.redirect().back()
    }

    await author.delete()

    session.flash('success', 'Autor excluído com sucesso.')

    return response.redirect().toPath('/authors')
  }
}
