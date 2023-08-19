<script setup lang="ts">
import { RouterView } from 'vue-router'
import { useHead } from '@vueuse/head'

useHead({
  title: 'MEVN Todo App',
  meta: [
    {
      name: 'description',
      content: 'MEVN Todo app created by Islom Murodov Github: islombek124'
    }
  ]
})
</script>

<template>
  <RouterView />
</template>
