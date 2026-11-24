<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Category } from '../../types'

const props = defineProps<{
  category: Category
}>()

function destroy(category: Category) {
  if (confirm(`Deseja realmente excluir a categoria "${category.name}"?`)) {
    router.delete(`/categories/${category.slug}`)
  }
}
</script>

<template>
  <AppLayout>
    <div class="page">
      <div class="page-header">
        <h1>{{ props.category.name }}</h1>

        <div class="actions">
          <Link href="/categories" class="btn btn-secondary"> Voltar </Link>

          <Link :href="`/categories/${props.category.slug}/edit`" class="btn"> Editar </Link>

          <button class="btn btn-danger" @click="destroy(props.category)">Excluir</button>
        </div>
      </div>

      <div class="detail-grid">
        <div class="detail-item">
          <strong>Slug</strong>
          {{ props.category.slug }}
        </div>
      </div>

      <div v-if="props.category.description" class="description-block">
        {{ props.category.description }}
      </div>

      <div v-else class="empty">Esta categoria ainda não possui descrição.</div>

      <hr style="margin: 28px 0; border: 0; border-top: 1px solid #e5e7eb" />

      <h2>Livros desta categoria</h2>

      <div v-if="!props.category.books || props.category.books.length === 0" class="empty">
        Nenhum livro cadastrado nesta categoria.
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
          <tr v-for="book in props.category.books" :key="book.id">
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
