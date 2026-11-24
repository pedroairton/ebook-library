import '@adonisjs/core/types/http'

type ParamValue = string | number | bigint | boolean

export type ScannedRoutes = {
  ALL: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'authors.index': { paramsTuple?: []; params?: {} }
    'authors.create': { paramsTuple?: []; params?: {} }
    'authors.store': { paramsTuple?: []; params?: {} }
    'authors.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'authors.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'authors.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'authors.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.index': { paramsTuple?: []; params?: {} }
    'books.create': { paramsTuple?: []; params?: {} }
    'books.store': { paramsTuple?: []; params?: {} }
    'books.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  GET: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'authors.index': { paramsTuple?: []; params?: {} }
    'authors.create': { paramsTuple?: []; params?: {} }
    'authors.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'authors.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.index': { paramsTuple?: []; params?: {} }
    'books.create': { paramsTuple?: []; params?: {} }
    'books.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  HEAD: {
    'drive.fs.serve': { paramsTuple: [...ParamValue[]]; params: {'*': ParamValue[]} }
    'authors.index': { paramsTuple?: []; params?: {} }
    'authors.create': { paramsTuple?: []; params?: {} }
    'authors.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'authors.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.index': { paramsTuple?: []; params?: {} }
    'categories.create': { paramsTuple?: []; params?: {} }
    'categories.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.index': { paramsTuple?: []; params?: {} }
    'books.create': { paramsTuple?: []; params?: {} }
    'books.show': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.edit': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  POST: {
    'authors.store': { paramsTuple?: []; params?: {} }
    'categories.store': { paramsTuple?: []; params?: {} }
    'books.store': { paramsTuple?: []; params?: {} }
  }
  PUT: {
    'authors.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.update': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
  DELETE: {
    'authors.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'categories.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
    'books.destroy': { paramsTuple: [ParamValue]; params: {'slug': ParamValue} }
  }
}
declare module '@adonisjs/core/types/http' {
  export interface RoutesList extends ScannedRoutes {}
}