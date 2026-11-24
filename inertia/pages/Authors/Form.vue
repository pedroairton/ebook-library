<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import { computed } from 'vue'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Author } from '../../types'

const props = defineProps<{
  author: Author | null
}>()

const form = useForm({
  name: props.author?.name ?? '',
  description: props.author?.description ?? '',
  photo: null as File | null,
})

const photoPreview = computed(() => {
  if (form.photo instanceof File) {
    return URL.createObjectURL(form.photo)
  }

  return null
})

function onPhotoChange(event: Event) {
  const input = event.target as HTMLInputElement
  form.photo = input.files?.[0] ?? null
}

function submit() {
  if (props.author) {
    form.put(`/authors/${props.author.slug}`, {
      preserveScroll: true,
    })
  } else {
    form.post('/authors', {
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
          {{ props.author ? 'Editar autor' : 'Novo autor' }}
        </h1>

        <Link href="/authors" class="btn btn-secondary"> Voltar </Link>
      </div>

      <form class="form" enctype="multipart/form-data" @submit.prevent="submit">
        <div class="field">
          <label for="name">Nome</label>
          <input id="name" v-model="form.name" type="text" placeholder="Ex.: Machado de Assis" />
          <div v-if="form.errors.name" class="field-error">
            {{ form.errors.name }}
          </div>
        </div>

        <div class="field">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Escreva uma breve descrição do autor..."
          ></textarea>
          <div v-if="form.errors.description" class="field-error">
            {{ form.errors.description }}
          </div>
        </div>

        <div class="field">
          <label for="photo">Foto do autor</label>
          <input
            id="photo"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            @change="onPhotoChange"
          />
          <div v-if="form.errors.photo" class="field-error">
            {{ form.errors.photo }}
          </div>

          <img
            v-if="photoPreview"
            :src="photoPreview"
            class="preview"
            alt="Pré-visualização da foto"
          />

          <p v-else-if="props.author?.photoPath">
            Foto atual: <strong>{{ props.author.photoPath }}</strong>
          </p>
        </div>

        <div>
          <button type="submit" class="btn" :disabled="form.processing">Salvar</button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>
