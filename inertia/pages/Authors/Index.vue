<script setup lang="ts">
import { Link, router } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Author } from '../../types'

defineProps<{
  authors: Author[]
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
        <h1>Autores</h1>
        <Link href="/authors/new" class="btn"> Novo autor </Link>
      </div>

      <div v-if="authors.length === 0" class="empty">Nenhum autor cadastrado.</div>

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
          <tr v-for="author in authors" :key="author.id">
            <td>{{ author.name }}</td>
            <td>{{ author.slug }}</td>
            <td>{{ author.books_count ?? 0 }}</td>
            <td>
              <div class="actions">
                <Link :href="`/authors/${author.slug}`" class="btn btn-secondary btn-small">
                  Ver
                </Link>

                <Link :href="`/authors/${author.slug}/edit`" class="btn btn-secondary btn-small">
                  Editar
                </Link>

                <button class="btn btn-danger btn-small" @click="destroy(author)">Excluir</button>
              </div>
            </td>
          </tr>
        </tbody>
      </table>
    </div>
  </AppLayout>
</template>
