import vine from '@vinejs/vine'

const pdfRules = {
  size: '20mb',
  extnames: ['pdf'],
} as const

const coverRules = {
  size: '2mb',
  extnames: ['jpg', 'jpeg', 'png', 'webp'],
} as const

const currentYear = new Date().getFullYear()

export const createBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(255),

    description: vine.string().trim().maxLength(10000).optional({ treatEmptyAsNull: true }),

    publicationYear: vine
      .number()
      .min(0)
      .max(currentYear + 1)
      .optional({ treatEmptyAsNull: true }),

    publisher: vine.string().trim().maxLength(255).optional({ treatEmptyAsNull: true }),

    isbn: vine.string().trim().maxLength(20).optional({ treatEmptyAsNull: true }),

    language: vine.string().trim().maxLength(20).optional({ treatEmptyAsNull: true }),

    pages: vine.number().min(1).optional({ treatEmptyAsNull: true }),

    authorId: vine.number().exists({
      table: 'authors',
      column: 'id',
    }),

    categoryId: vine.number().exists({
      table: 'categories',
      column: 'id',
    }),

    isPublished: vine.boolean().optional(),

    file: vine.file(pdfRules),

    cover: vine.file(coverRules).optional(),
  })
)

export const updateBookValidator = vine.compile(
  vine.object({
    title: vine.string().trim().minLength(2).maxLength(255),

    description: vine.string().trim().maxLength(10000).optional({ treatEmptyAsNull: true }),

    publicationYear: vine
      .number()
      .min(0)
      .max(currentYear + 1)
      .optional({ treatEmptyAsNull: true }),

    publisher: vine.string().trim().maxLength(255).optional({ treatEmptyAsNull: true }),

    isbn: vine.string().trim().maxLength(20).optional({ treatEmptyAsNull: true }),

    language: vine.string().trim().maxLength(20).optional({ treatEmptyAsNull: true }),

    pages: vine.number().min(1).optional({ treatEmptyAsNull: true }),

    authorId: vine.number().exists({
      table: 'authors',
      column: 'id',
    }),

    categoryId: vine.number().exists({
      table: 'categories',
      column: 'id',
    }),

    isPublished: vine.boolean().optional(),

    file: vine.file(pdfRules).optional(),

    cover: vine.file(coverRules).optional(),
  })
)
