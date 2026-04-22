<script setup lang="ts">
import DefaultTheme from 'vitepress/theme'
import NeoQrVault from './components/NeoQrVault.vue'
</script>

<template>
  <DefaultTheme.Layout>
    <template #layout-bottom>
      <NeoQrVault />
    </template>
  </DefaultTheme.Layout>
</template>
