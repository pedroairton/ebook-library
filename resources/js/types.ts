export interface Author {
  id: number
  name: string
  slug: string
  description?: string | null
  photoPath?: string | null
  books_count?: number
  books?: Book[]
  createdAt?: string
  updatedAt?: string
}

export interface Category {
  id: number
  name: string
  slug: string
  description?: string | null
  books_count?: number
  books?: Book[]
  createdAt?: string
  updatedAt?: string
}

export interface Book {
  id: number
  title: string
  slug: string
  description?: string | null
  publicationYear?: number | null
  publisher?: string | null
  isbn?: string | null
  language?: string | null
  pages?: number | null

  filePath: string
  originalFileName?: string | null
  mimeType?: string | null
  fileSize?: number | null
  fileHash?: string | null

  coverPath?: string | null

  isPublished: boolean
  publishedAt?: string | null

  authorId: number
  categoryId: number

  author?: Author
  category?: Category

  createdAt?: string
  updatedAt?: string
}
