<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Author } from '../../types'

const props = defineProps<{
  author: Author
}>()

function destroy(author: Author) {
  if (confirm(`Deseja realmente excluir o autor "${author.name}"?`)) {
    router.delete(`/authors/${author.slug}`)
  }
}
</script>

<template>
  <AppLayout>
    <div class="page">
      <div class="page-header">
        <h1>{{ props.author.name }}</h1>

        <div class="actions">
          <Link href="/authors" class="btn btn-secondary"> Voltar </Link>

          <Link :href="`/authors/${props.author.slug}/edit`" class="btn"> Editar </Link>

          <button class="btn btn-danger" @click="destroy(props.author)">Excluir</button>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-item">
          <strong>Slug</strong>
          {{ props.author.slug }}
        </div>

        <div class="detail-item">
          <strong>Foto</strong>
          {{ props.author.photoPath || 'Sem foto' }}
        </div>
      </div>

      <div v-if="props.author.description" class="description-block">
        {{ props.author.description }}
      </div>

      <div v-else class="empty">Este autor ainda não possui descrição.</div>

      <hr style="margin: 28px 0; border: 0; border-top: 1px solid #e5e7eb" />

      <h2>Livros deste autor</h2>

      <div v-if="!props.author.books || props.author.books.length === 0" class="empty">
        Nenhum livro cadastrado para este autor.
      </div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Título</th>
            <th>Slug</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="book in props.author.books" :key="book.id">
            <td>{{ book.title }}</td>
            <td>{{ book.slug }}</td>
            <td>
              <Link :href="`/books/${book.slug}`" class="btn btn-secondary btn-small">
                Ver livro
              </Link>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppLayout>
</template>
