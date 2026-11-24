<script setup lang="ts">
import { Link, usePage } from '@inertiajs/vue3'
import { computed } from 'vue'

const page = usePage<any>()

const flash = computed(() => {
  return page.props.flash ?? {}
})
</script>

<template>
  <div class="app">
    <main class="container main">
      <div v-if="flash.success" class="alert success">
        {{ flash.success }}
      </div>

      <div v-if="flash.error" class="alert error">
        {{ flash.error }}
      </div>

      <slot />
    </main>
  </div>
</template>

<style>
* {
  box-sizing: border-box;
}

body {
  margin: 0;
  font-family: Arial, Helvetica, sans-serif;
  background: #f5f7fb;
  color: #1f2937;
}

a {
  color: #2563eb;
  text-decoration: none;
}

a:hover {
  text-decoration: underline;
}

.app {
  min-height: 100vh;
}

.container {
  width: min(1100px, 92%);
  margin: 0 auto;
}

.topbar {
  background: #ffffff;
  border-bottom: 1px solid #e5e7eb;
  padding: 16px 0;
}

.topbar-content {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
}

.brand a {
  font-size: 20px;
  font-weight: 700;
  color: #111827;
}

.menu {
  display: flex;
  align-items: center;
  gap: 18px;
  flex-wrap: wrap;
}

.main {
  padding: 28px 0;
}

.page {
  background: #ffffff;
  border: 1px solid #e5e7eb;
  border-radius: 12px;
  padding: 24px;
}

.page-header {
  display: flex;
  align-items: center;
  justify-content: space-between;
  gap: 16px;
  margin-bottom: 20px;
  flex-wrap: wrap;
}

.page-header h1 {
  margin: 0;
  font-size: 28px;
}

.table {
  width: 100%;
  border-collapse: collapse;
}

.table th,
.table td {
  border: 1px solid #e5e7eb;
  padding: 10px 12px;
  text-align: left;
  vertical-align: middle;
}

.table th {
  background: #f9fafb;
}

.actions {
  display: flex;
  gap: 8px;
  flex-wrap: wrap;
}

.btn {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 8px;
  border: 0;
  border-radius: 8px;
  padding: 10px 14px;
  font-size: 14px;
  cursor: pointer;
  background: #2563eb;
  color: #ffffff;
  text-decoration: none;
}

.btn:hover {
  text-decoration: none;
  filter: brightness(0.96);
}

.btn-secondary {
  background: #e5e7eb;
  color: #111827;
}

.btn-danger {
  background: #dc2626;
}

.btn-small {
  padding: 8px 12px;
  font-size: 13px;
}

.form {
  display: flex;
  flex-direction: column;
  gap: 18px;
  max-width: 700px;
}

.field label {
  display: block;
  font-weight: 600;
  margin-bottom: 6px;
}

.field input,
.field textarea,
.field select {
  width: 100%;
  border: 1px solid #d1d5db;
  border-radius: 8px;
  padding: 10px 12px;
  font-size: 14px;
  background: #ffffff;
}

.field textarea {
  min-height: 140px;
  resize: vertical;
}

.field-error {
  margin-top: 6px;
  color: #dc2626;
  font-size: 13px;
}

.alert {
  border-radius: 10px;
  padding: 12px 16px;
  margin-bottom: 18px;
  border: 1px solid transparent;
}

.alert.success {
  background: #ecfdf5;
  color: #065f46;
  border-color: #a7f3d0;
}

.alert.error {
  background: #fef2f2;
  color: #991b1b;
  border-color: #fecaca;
}

.badge {
  display: inline-flex;
  align-items: center;
  border-radius: 999px;
  padding: 4px 10px;
  font-size: 12px;
  font-weight: 700;
}

.badge.success {
  background: #dcfce7;
  color: #166534;
}

.badge.warning {
  background: #fef9c3;
  color: #854d0e;
}

.detail-grid {
  display: grid;
  grid-template-columns: repeat(auto-fit, minmax(220px, 1fr));
  gap: 16px;
  margin-bottom: 24px;
}

.detail-item {
  border: 1px solid #e5e7eb;
  border-radius: 10px;
  padding: 14px;
  background: #fafafa;
}

.detail-item strong {
  display: block;
  margin-bottom: 6px;
  color: #374151;
}

.preview {
  margin-top: 10px;
  max-width: 180px;
  border-radius: 10px;
  border: 1px solid #e5e7eb;
  object-fit: cover;
}

.description-block {
  white-space: pre-line;
  line-height: 1.6;
}

.empty {
  padding: 24px;
  border: 1px dashed #d1d5db;
  border-radius: 10px;
  color: #6b7280;
  text-align: center;
}
</style>
