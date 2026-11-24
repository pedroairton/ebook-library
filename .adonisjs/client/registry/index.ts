/* eslint-disable prettier/prettier */
import type { AdonisEndpoint } from '@tuyau/core/types'
import type { Registry } from './schema.d.ts'
import type { ApiDefinition } from './tree.d.ts'

const placeholder: any = {}

const routes = {
  'drive.fs.serve': {
    methods: ["GET","HEAD"],
    pattern: '/uploads/*',
    tokens: [{"old":"/uploads/*","type":0,"val":"uploads","end":""},{"old":"/uploads/*","type":2,"val":"*","end":""}],
    types: placeholder as Registry['drive.fs.serve']['types'],
  },
  'authors.index': {
    methods: ["GET","HEAD"],
    pattern: '/authors',
    tokens: [{"old":"/authors","type":0,"val":"authors","end":""}],
    types: placeholder as Registry['authors.index']['types'],
  },
  'authors.create': {
    methods: ["GET","HEAD"],
    pattern: '/authors/new',
    tokens: [{"old":"/authors/new","type":0,"val":"authors","end":""},{"old":"/authors/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['authors.create']['types'],
  },
  'authors.store': {
    methods: ["POST"],
    pattern: '/authors',
    tokens: [{"old":"/authors","type":0,"val":"authors","end":""}],
    types: placeholder as Registry['authors.store']['types'],
  },
  'authors.show': {
    methods: ["GET","HEAD"],
    pattern: '/authors/:slug',
    tokens: [{"old":"/authors/:slug","type":0,"val":"authors","end":""},{"old":"/authors/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['authors.show']['types'],
  },
  'authors.edit': {
    methods: ["GET","HEAD"],
    pattern: '/authors/:slug/edit',
    tokens: [{"old":"/authors/:slug/edit","type":0,"val":"authors","end":""},{"old":"/authors/:slug/edit","type":1,"val":"slug","end":""},{"old":"/authors/:slug/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['authors.edit']['types'],
  },
  'authors.update': {
    methods: ["PUT"],
    pattern: '/authors/:slug',
    tokens: [{"old":"/authors/:slug","type":0,"val":"authors","end":""},{"old":"/authors/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['authors.update']['types'],
  },
  'authors.destroy': {
    methods: ["DELETE"],
    pattern: '/authors/:slug',
    tokens: [{"old":"/authors/:slug","type":0,"val":"authors","end":""},{"old":"/authors/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['authors.destroy']['types'],
  },
  'categories.index': {
    methods: ["GET","HEAD"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.index']['types'],
  },
  'categories.create': {
    methods: ["GET","HEAD"],
    pattern: '/categories/new',
    tokens: [{"old":"/categories/new","type":0,"val":"categories","end":""},{"old":"/categories/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['categories.create']['types'],
  },
  'categories.store': {
    methods: ["POST"],
    pattern: '/categories',
    tokens: [{"old":"/categories","type":0,"val":"categories","end":""}],
    types: placeholder as Registry['categories.store']['types'],
  },
  'categories.show': {
    methods: ["GET","HEAD"],
    pattern: '/categories/:slug',
    tokens: [{"old":"/categories/:slug","type":0,"val":"categories","end":""},{"old":"/categories/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['categories.show']['types'],
  },
  'categories.edit': {
    methods: ["GET","HEAD"],
    pattern: '/categories/:slug/edit',
    tokens: [{"old":"/categories/:slug/edit","type":0,"val":"categories","end":""},{"old":"/categories/:slug/edit","type":1,"val":"slug","end":""},{"old":"/categories/:slug/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['categories.edit']['types'],
  },
  'categories.update': {
    methods: ["PUT"],
    pattern: '/categories/:slug',
    tokens: [{"old":"/categories/:slug","type":0,"val":"categories","end":""},{"old":"/categories/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['categories.update']['types'],
  },
  'categories.destroy': {
    methods: ["DELETE"],
    pattern: '/categories/:slug',
    tokens: [{"old":"/categories/:slug","type":0,"val":"categories","end":""},{"old":"/categories/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['categories.destroy']['types'],
  },
  'books.index': {
    methods: ["GET","HEAD"],
    pattern: '/books',
    tokens: [{"old":"/books","type":0,"val":"books","end":""}],
    types: placeholder as Registry['books.index']['types'],
  },
  'books.create': {
    methods: ["GET","HEAD"],
    pattern: '/books/new',
    tokens: [{"old":"/books/new","type":0,"val":"books","end":""},{"old":"/books/new","type":0,"val":"new","end":""}],
    types: placeholder as Registry['books.create']['types'],
  },
  'books.store': {
    methods: ["POST"],
    pattern: '/books',
    tokens: [{"old":"/books","type":0,"val":"books","end":""}],
    types: placeholder as Registry['books.store']['types'],
  },
  'books.show': {
    methods: ["GET","HEAD"],
    pattern: '/books/:slug',
    tokens: [{"old":"/books/:slug","type":0,"val":"books","end":""},{"old":"/books/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['books.show']['types'],
  },
  'books.edit': {
    methods: ["GET","HEAD"],
    pattern: '/books/:slug/edit',
    tokens: [{"old":"/books/:slug/edit","type":0,"val":"books","end":""},{"old":"/books/:slug/edit","type":1,"val":"slug","end":""},{"old":"/books/:slug/edit","type":0,"val":"edit","end":""}],
    types: placeholder as Registry['books.edit']['types'],
  },
  'books.update': {
    methods: ["PUT"],
    pattern: '/books/:slug',
    tokens: [{"old":"/books/:slug","type":0,"val":"books","end":""},{"old":"/books/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['books.update']['types'],
  },
  'books.destroy': {
    methods: ["DELETE"],
    pattern: '/books/:slug',
    tokens: [{"old":"/books/:slug","type":0,"val":"books","end":""},{"old":"/books/:slug","type":1,"val":"slug","end":""}],
    types: placeholder as Registry['books.destroy']['types'],
  },
} as const satisfies Record<string, AdonisEndpoint>

export { routes }

export const registry = {
  routes,
  $tree: {} as ApiDefinition,
}

declare module '@tuyau/core/types' {
  export interface UserRegistry {
    routes: typeof routes
    $tree: ApiDefinition
  }
}
