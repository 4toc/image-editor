<script setup>
import ControlsItem from './ControlsItem.vue'
import {useStore} from 'vuex';
import {computed} from 'vue';

const store = useStore()

const brightness = computed(() => store.state.brightness)
const contrast = computed(() => store.state.contrast)
</script>

<template>
  <div class="controls">
    <controls-item
        accent-color="#25A95B"
        title="Brightness"
        description="Slide to adjust image brightness!☀️"
        mutation="setBrightness"
        :current-value="brightness"
    />
    <controls-item
        accent-color="#4A90E2"
        title="Contrast"
        description="Slide to adjust image contrast! 🌓️"
        mutation="setContrast"
        :current-value="contrast"
    />
  </div>
</template>

<style lang="scss">
.controls {
  margin-top: 16px;
  margin-bottom: 28px;
}
</style>
