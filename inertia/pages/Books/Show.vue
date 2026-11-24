<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Book } from '../../types'

const props = defineProps<{
  book: Book
}>()

function destroy(book: Book) {
  if (confirm(`Deseja realmente excluir o livro "${book.title}"?`)) {
    router.delete(`/books/${book.slug}`)
  }
}

function formatBytes(value?: number | null) {
  if (!value) {
    return '0 B'
  }

  const units = ['B', 'KB', 'MB', 'GB']
  let index = 0
  let size = value

  while (size >= 1024 && index < units.length - 1) {
    size /= 1024
    index++
  }

  return `${size.toFixed(1)} ${units[index]}`
}
</script>

<template>
  <AppLayout>
    <div class="page">
      <div class="page-header">
        <h1>{{ props.book.title }}</h1>

        <div class="actions">
          <Link href="/books" class="btn btn-secondary"> Voltar </Link>

          <Link :href="`/books/${props.book.slug}/edit`" class="btn"> Editar </Link>

          <button class="btn btn-danger" @click="destroy(props.book)">Excluir</button>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-item">
          <strong>Autor</strong>
          <Link v-if="props.book.author" :href="`/authors/${props.book.author.slug}`">
            {{ props.book.author.name }}
          </Link>
          <span v-else>-</span>
        </div>

        <div class="detail-item">
          <strong>Categoria</strong>
          <Link v-if="props.book.category" :href="`/categories/${props.book.category.slug}`">
            {{ props.book.category.name }}
          </Link>
          <span v-else>-</span>
        </div>

        <div class="detail-item">
          <strong>Ano de publicação</strong>
          {{ props.book.publicationYear ?? '-' }}
        </div>

        <div class="detail-item">
          <strong>Editora</strong>
          {{ props.book.publisher || '-' }}
        </div>

        <div class="detail-item">
          <strong>ISBN</strong>
          {{ props.book.isbn || '-' }}
        </div>

        <div class="detail-item">
          <strong>Idioma</strong>
          {{ props.book.language || '-' }}
        </div>

        <div class="detail-item">
          <strong>Páginas</strong>
          {{ props.book.pages ?? '-' }}
        </div>

        <div class="detail-item">
          <strong>Status</strong>
          <span v-if="props.book.isPublished" class="badge success"> Publicado </span>
          <span v-else class="badge warning"> Rascunho </span>
        </div>

        <div class="detail-item">
          <strong>Arquivo</strong>
          {{ props.book.originalFileName || props.book.filePath }}
        </div>

        <div class="detail-item">
          <strong>Tamanho</strong>
          {{ formatBytes(props.book.fileSize) }}
        </div>
      </div>

      <div style="margin-bottom: 24px">
        <a class="btn" :href="`/books/${props.book.slug}/download`" target="_blank">
          Baixar / Ler PDF
        </a>
      </div>

      <h2>Descrição</h2>

      <div v-if="props.book.description" class="description-block">
        {{ props.book.description }}
      </div>

      <div v-else class="empty">Este livro ainda não possui descrição.</div>
    </div>
  </AppLayout>
</template>
