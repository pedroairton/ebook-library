<script setup lang="ts">
import { Link, useForm } from '@inertiajs/vue3'
import { computed } from 'vue'
import AppLayout from '../../layouts/AppLayout.vue'
import type { Author, Book, Category } from '../../types'

const props = defineProps<{
  book: Book | null
  authors: Author[]
  categories: Category[]
}>()

const form = useForm({
  title: props.book?.title ?? '',
  description: props.book?.description ?? '',
  publicationYear: props.book?.publicationYear ?? '',
  publisher: props.book?.publisher ?? '',
  isbn: props.book?.isbn ?? '',
  language: props.book?.language ?? '',
  pages: props.book?.pages ?? '',
  authorId: props.book?.authorId ?? '',
  categoryId: props.book?.categoryId ?? '',
  isPublished: props.book?.isPublished ?? true,
  file: null as File | null,
  cover: null as File | null,
})

const coverPreview = computed(() => {
  if (form.cover instanceof File) {
    return URL.createObjectURL(form.cover)
  }

  return null
})

function onPdfChange(event: Event) {
  const input = event.target as HTMLInputElement
  form.file = input.files?.[0] ?? null
}

function onCoverChange(event: Event) {
  const input = event.target as HTMLInputElement
  form.cover = input.files?.[0] ?? null
}

function submit() {
  if (props.book) {
    form.put(`/books/${props.book.slug}`, {
      preserveScroll: true,
    })
  } else {
    form.post('/books', {
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
          {{ props.book ? 'Editar livro' : 'Novo livro' }}
        </h1>

        <Link href="/books" class="btn btn-secondary"> Voltar </Link>
      </div>

      <form class="form" enctype="multipart/form-data" @submit.prevent="submit">
        <div class="field">
          <label for="title">Título</label>
          <input id="title" v-model="form.title" type="text" placeholder="Ex.: Dom Casmurro" />
          <div v-if="form.errors.title" class="field-error">
            {{ form.errors.title }}
          </div>
        </div>

        <div class="field">
          <label for="description">Descrição</label>
          <textarea
            id="description"
            v-model="form.description"
            placeholder="Escreva uma descrição para o livro..."
          ></textarea>
          <div v-if="form.errors.description" class="field-error">
            {{ form.errors.description }}
          </div>
        </div>

        <div class="field">
          <label for="authorId">Autor</label>
          <select id="authorId" v-model="form.authorId">
            <option disabled value="">Selecione um autor</option>
            <option v-for="author in props.authors" :key="author.id" :value="author.id">
              {{ author.name }}
            </option>
          </select>
          <div v-if="form.errors.authorId" class="field-error">
            {{ form.errors.authorId }}
          </div>
        </div>

        <div class="field">
          <label for="categoryId">Categoria</label>
          <select id="categoryId" v-model="form.categoryId">
            <option disabled value="">Selecione uma categoria</option>
            <option v-for="category in props.categories" :key="category.id" :value="category.id">
              {{ category.name }}
            </option>
          </select>
          <div v-if="form.errors.categoryId" class="field-error">
            {{ form.errors.categoryId }}
          </div>
        </div>

        <div class="field">
          <label for="publicationYear">Ano de publicação</label>
          <input
            id="publicationYear"
            v-model="form.publicationYear"
            type="number"
            placeholder="Ex.: 1899"
          />
          <div v-if="form.errors.publicationYear" class="field-error">
            {{ form.errors.publicationYear }}
          </div>
        </div>

        <div class="field">
          <label for="publisher">Editora</label>
          <input
            id="publisher"
            v-model="form.publisher"
            type="text"
            placeholder="Ex.: Companhia das Letras"
          />
          <div v-if="form.errors.publisher" class="field-error">
            {{ form.errors.publisher }}
          </div>
        </div>

        <div class="field">
          <label for="isbn">ISBN</label>
          <input id="isbn" v-model="form.isbn" type="text" placeholder="Ex.: 9788500000000" />
          <div v-if="form.errors.isbn" class="field-error">
            {{ form.errors.isbn }}
          </div>
        </div>

        <div class="field">
          <label for="language">Idioma</label>
          <input id="language" v-model="form.language" type="text" placeholder="Ex.: Português" />
          <div v-if="form.errors.language" class="field-error">
            {{ form.errors.language }}
          </div>
        </div>

        <div class="field">
          <label for="pages">Páginas</label>
          <input id="pages" v-model="form.pages" type="number" placeholder="Ex.: 256" />
          <div v-if="form.errors.pages" class="field-error">
            {{ form.errors.pages }}
          </div>
        </div>

        <div class="field">
          <label for="file">
            Arquivo PDF
            <span v-if="props.book">(deixe vazio para manter o atual)</span>
          </label>

          <input id="file" type="file" accept=".pdf,application/pdf" @change="onPdfChange" />

          <div v-if="form.errors.file" class="field-error">
            {{ form.errors.file }}
          </div>

          <p v-if="props.book?.filePath">
            Arquivo atual:
            <strong>
              {{ props.book.originalFileName || props.book.filePath }}
            </strong>
          </p>
        </div>

        <div class="field">
          <label for="cover">
            Capa do livro
            <span v-if="props.book">(deixe vazio para manter a atual)</span>
          </label>

          <input
            id="cover"
            type="file"
            accept="image/png, image/jpeg, image/jpg, image/webp"
            @change="onCoverChange"
          />

          <div v-if="form.errors.cover" class="field-error">
            {{ form.errors.cover }}
          </div>

          <img
            v-if="coverPreview"
            :src="coverPreview"
            class="preview"
            alt="Pré-visualização da capa"
          />

          <p v-else-if="props.book?.coverPath">
            Capa atual: <strong>{{ props.book.coverPath }}</strong>
          </p>
        </div>

        <div class="field">
          <label>
            <input v-model="form.isPublished" type="checkbox" />
            Publicado
          </label>
        </div>

        <div>
          <button type="submit" class="btn" :disabled="form.processing">Salvar</button>
        </div>
      </form>
    </div>
  </AppLayout>
</template>
