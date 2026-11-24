<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Category } from '../../types'

const props = defineProps<{
  category: Category | null
}>()

const form = useForm({
  name: props.category?.name ?? '',
  description: props.category?.description ?? '',
})

function submit() {
  if (props.category) {
    form.put(`/categories/${props.category.slug}`, {
      preserveScroll: true,
    })
  } else {
    form.post('/categories', {
      preserveScroll: true,
    })
  }
}
</script>

<template>
  <AppLayout>
    <div class="page">
      <div class="page-header">
        <h1>
          {{ props.category ? 'Editar categoria' : 'Nova categoria' }}
        </h1>

        <Link href="/categories" class="btn btn-secondary"> Voltar </Link>
      </div>

      <form class="form" @submit.prevent="submit">
        <div class="field">
          <label for="name">Nome</label>
          <input id="name" v-model="form.name" type="text" placeholder="Ex.: Romance" />
          <div v-if="form.errors.name" class="field-error">
            {{ form.errors.name }}
          </div>
        </div>

        <div class="field">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Escreva uma descrição para a categoria..."
          ></textarea>
          <div v-if="form.errors.description" class="field-error">
            {{ form.errors.description }}
          </div>
        </div>

        <div>
          <button type="submit" class="btn" :disabled="form.processing">Salvar</button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>
