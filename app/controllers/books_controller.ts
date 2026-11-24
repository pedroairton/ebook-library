import type { HttpContext } from '@adonisjs/core/http'
import { DateTime } from 'luxon'
import Author from '../models/author.ts'
import Category from '../models/category.ts'
import Book from '../models/book.ts'
import { createBookValidator, updateBookValidator } from '../validators/book.ts'

export default class BooksController {
  async index({ inertia }: HttpContext) {
    const books = await Book.query()
      .preload('author')
      .preload('category')
      .orderBy('created_at', 'desc')

    return inertia.render('Books/Index', {
      books,
    })
  }

  async create({ inertia }: HttpContext) {
    const [authors, categories] = await Promise.all([
      Author.query().orderBy('name', 'asc'),
      Category.query().orderBy('name', 'asc'),
    ])

    return inertia.render('Books/Form', {
      book: null,
      authors,
      categories,
    })
  }

  async store({ request, response, session }: HttpContext) {
    const payload = await request.validateUsing(createBookValidator)

    const pdf = request.file('file')

    if (!pdf) {
      session.flash('error', 'O arquivo PDF é obrigatório.')
      return response.redirect().back()
    }

    await pdf.moveToDisk('books')

    const filePath = pdf.filePath ?? `books/${pdf.fileName}`

    let coverPath: string | null = null
    const cover = request.file('cover')

    if (cover) {
      await cover.moveToDisk('covers')
      coverPath = cover.filePath ?? `covers/${cover.fileName}`
    }

    const isPublished = payload.isPublished ?? true

    const book = await Book.create({
      title: payload.title,
      description: payload.description ?? null,
      publicationYear: payload.publicationYear ?? null,
      publisher: payload.publisher ?? null,
      isbn: payload.isbn ?? null,
      language: payload.language ?? null,
      pages: payload.pages ?? null,
      authorId: payload.authorId,
      categoryId: payload.categoryId,
      filePath,
      originalFileName: pdf.clientName,
      mimeType: pdf.type && pdf.subtype ? `${pdf.type}/${pdf.subtype}` : 'application/pdf',
      fileSize: pdf.size,
      fileHash: null,
      coverPath,
      isPublished,
      publishedAt: isPublished ? DateTime.now() : null,
    })

    session.flash('success', 'Livro criado com sucesso.')

    return response.redirect().toPath(`/books/${book.slug}`)
  }

  async show({ params, inertia }: HttpContext) {
    const book = await Book.query()
      .where('slug', params.slug)
      .preload('author')
      .preload('category')
      .firstOrFail()

    return inertia.render('Books/Show', {
      book,
    })
  }

  async edit({ params, inertia }: HttpContext) {
    const book = await Book.query().where('slug', params.slug).firstOrFail()

    const [authors, categories] = await Promise.all([
      Author.query().orderBy('name', 'asc'),
      Category.query().orderBy('name', 'asc'),
    ])

    return inertia.render('Books/Form', {
      book,
      authors,
      categories,
    })
  }

  async update({ params, request, response, session }: HttpContext) {
    const book = await Book.query().where('slug', params.slug).firstOrFail()

    const payload = await request.validateUsing(updateBookValidator)

    const pdf = request.file('file')

    if (pdf) {
      await pdf.moveToDisk('books')

      book.filePath = pdf.filePath ?? `books/${pdf.fileName}`
      book.originalFileName = pdf.clientName
      book.mimeType = pdf.type && pdf.subtype ? `${pdf.type}/${pdf.subtype}` : 'application/pdf'
      book.fileSize = pdf.size
      book.fileHash = null
    }

    const cover = request.file('cover')

    if (cover) {
      await cover.moveToDisk('covers')
      book.coverPath = cover.filePath ?? `covers/${cover.fileName}`
    }

    const isPublished = payload.isPublished ?? book.isPublished

    let publishedAt = book.publishedAt

    if (isPublished && !publishedAt) {
      publishedAt = DateTime.now()
    }

    if (!isPublished) {
      publishedAt = null
    }

    book.title = payload.title
    book.description = payload.description ?? null
    book.publicationYear = payload.publicationYear ?? null
    book.publisher = payload.publisher ?? null
    book.isbn = payload.isbn ?? null
    book.language = payload.language ?? null
    book.pages = payload.pages ?? null
    book.authorId = payload.authorId
    book.categoryId = payload.categoryId
    book.isPublished = isPublished
    book.publishedAt = publishedAt

    await book.save()

    session.flash('success', 'Livro atualizado com sucesso.')

    return response.redirect().toPath(`/books/${book.slug}`)
  }

  async destroy({ params, response, session }: HttpContext) {
    const book = await Book.query().where('slug', params.slug).firstOrFail()

    await book.delete()

    session.flash('success', 'Livro excluído com sucesso.')

    return response.redirect().toPath('/books')
  }
}
