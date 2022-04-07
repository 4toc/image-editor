<script setup>
import HeaderDefault from './HeaderDefault.vue'
import UserData from './UserData.vue'
import Controls from './Controls/Controls.vue'
import ImagePreview from './ImagePreview.vue'
</script>

<template>
  <div class="main-page">
    <header-default />
    <user-data />
    <div class="main-page__elements-wrapper">
      <controls />
      <image-preview />
    </div>
  </div>
</template>

<style lang="scss">
.main-page {
  &__elements-wrapper {
    padding: 0 20px 20px;
    max-width: 420px;
    margin-left: auto;
    margin-right: auto;
  }
}
</style>


