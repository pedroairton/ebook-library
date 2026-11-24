<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Book } from '../../types'

defineProps<{
  books: Book[]
}>()

function destroy(book: Book) {
  if (confirm(`Deseja realmente excluir o livro "${book.title}"?`)) {
    router.delete(`/books/${book.slug}`)
  }
}
</script>

<template>
  <AppLayout>
    <div class="page">
      <div class="page-header">
        <h1>Livros</h1>
        <Link href="/books/new" class="btn"> Novo livro </Link>
      </div>

      <div v-if="books.length === 0" class="empty">Nenhum livro cadastrado.</div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Autor</th>
            <th>Categoria</th>
            <th>Ano</th>
            <th>Status</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="book in books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.author?.name ?? '-' }}</td>
            <td>{{ book.category?.name ?? '-' }}</td>
            <td>{{ book.publicationYear ?? '-' }}</td>
            <td>
              <span v-if="book.isPublished" class="badge success"> Publicado </span>
              <span v-else class="badge warning"> Rascunho </span>
            </td>
            <td>
              <div class="actions">
                <Link :href="`/books/${book.slug}`" class="btn btn-secondary btn-small"> Ver </Link>

                <Link :href="`/books/${book.slug}/edit`" class="btn btn-secondary btn-small">
                  Editar
                </Link>

                <button class="btn btn-danger btn-small" @click="destroy(book)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppLayout>
</template>
