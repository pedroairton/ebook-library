/* eslint-disable prettier/prettier */
import type { routes } from './index.ts'

export interface ApiDefinition {
  drive: {
    fs: {
      serve: typeof routes['drive.fs.serve']
    }
  }
  authors: {
    index: typeof routes['authors.index']
    create: typeof routes['authors.create']
    store: typeof routes['authors.store']
    show: typeof routes['authors.show']
    edit: typeof routes['authors.edit']
    update: typeof routes['authors.update']
    destroy: typeof routes['authors.destroy']
  }
  categories: {
    index: typeof routes['categories.index']
    create: typeof routes['categories.create']
    store: typeof routes['categories.store']
    show: typeof routes['categories.show']
    edit: typeof routes['categories.edit']
    update: typeof routes['categories.update']
    destroy: typeof routes['categories.destroy']
  }
  books: {
    index: typeof routes['books.index']
    create: typeof routes['books.create']
    store: typeof routes['books.store']
    show: typeof routes['books.show']
    edit: typeof routes['books.edit']
    update: typeof routes['books.update']
    destroy: typeof routes['books.destroy']
  }
}
