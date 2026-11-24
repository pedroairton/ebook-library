<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Category } from '../../types'

defineProps<{
  categories: Category[]
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
        <h1>Categorias</h1>
        <Link href="/categories/new" class="btn"> Nova categoria </Link>
      </div>

      <div v-if="categories.length === 0" class="empty">Nenhuma categoria cadastrada.</div>

      <table v-else class="table">
        <thead>
          <tr>
            <th>Nome</th>
            <th>Slug</th>
            <th>Livros</th>
            <th>Ações</th>
          </tr>
        </thead>

        <tbody>
          <tr v-for="category in categories" :key="category.id">
            <td>{{ category.name }}</td>
            <td>{{ category.slug }}</td>
            <td>{{ category.books_count ?? 0 }}</td>
            <td>
              <div class="actions">
                <Link :href="`/categories/${category.slug}`" class="btn btn-secondary btn-small">
                  Ver
                </Link>

                <Link
                  :href="`/categories/${category.slug}/edit`"
                  class="btn btn-secondary btn-small"
                >
                  Editar
                </Link>

                <button class="btn btn-danger btn-small" @click="destroy(category)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppLayout>
</template>
