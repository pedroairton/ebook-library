import vine from '@vinejs/vine'

export const createCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255).unique({
      table: 'categories',
      column: 'name',
    }),

    description: vine.string().trim().maxLength(2000).optional({ treatEmptyAsNull: true }),
  })
)

export const updateCategoryValidator = vine.compile(
  vine.object({
    name: vine.string().trim().minLength(2).maxLength(255),

    description: vine.string().trim().maxLength(2000).optional({ treatEmptyAsNull: true }),
  })
)
