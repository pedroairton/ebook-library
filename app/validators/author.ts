import vine from '@vinejs/vine'

const photoRules = {
  size: '2mb',
  extnames: ['jpg', 'jpeg', 'png', 'webp'],
} as const

export const createAuthorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255).unique({
      table: 'authors',
      column: 'name',
    }),

    description: vine.string().trim().maxLength(5000).optional({ treatEmptyAsNull: true }),

    photo: vine.file(photoRules).optional(),
  })
)

export const updateAuthorValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),

    description: vine.string().trim().maxLength(5000).optional({ treatEmptyAsNull: true }),

    photo: vine.file(photoRules).optional(),
  })
)
