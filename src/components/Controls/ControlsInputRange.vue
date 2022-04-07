<script setup>

import {onMounted, ref, watch} from 'vue';

const props = defineProps({
  accentColor: {
    type: String,
    default: '#25A95B'
  },
  currentValue: {
    type: Number,
    default: 0
  }
})

const progressLine = ref(0)
const thumbLeft = ref(0)
const hideLine = ref(null)
const fakeDrag = ref(null)
const hideLineWidth = ref(0)
const oldX = ref(0)

const emit = defineEmits(['changeValue'])

watch(progressLine, value => {
  thumbLeft.value = value * 100
})

const clickLine = (event) => {
  progressLine.value = event.offsetX / event.target.offsetWidth
  emit('changeValue', progressLine.value)
}

const dragThumb = (event) => {
  const x = event.target.offsetLeft + (event.x - oldX.value)
  if (x > 0 && x <= hideLineWidth.value) {
    progressLine.value = x / hideLineWidth.value
    oldX.value = event.x
    emit('changeValue', progressLine.value)
  }
}
const dragstartThumb = (event) => {
  oldX.value = event.x
  event.dataTransfer.setDragImage(fakeDrag.value, 0, 0)
}

window.addEventListener('resize', () => {
  hideLineWidth.value = hideLine.value.offsetWidth
})

onMounted(() => {
  hideLineWidth.value = hideLine.value.offsetWidth
  progressLine.value = props.currentValue
})

</script>

<template>
  <div class="controls-input-range" :style="{'--accent-color': props.accentColor}">
    <div class="controls-input-range__line"></div>
    <div class="controls-input-range__progress"
         :style="{transform: `scaleX(${progressLine})`}"
    ></div>
    <div class="controls-input-range__hide-line" ref="hideLine" @click="clickLine"
    ></div>
    <div class="controls-input-range__thumb"
         :style="{left: thumbLeft + '%'}"
         draggable="true"
         @dragstart="dragstartThumb"
         @drag="dragThumb"
    >
    </div>
    <div class="controls-input-range__fake-drag" ref="fakeDrag"></div>
  </div>
</template>

<style lang="scss">
.controls-input-range {
  width: 100%;
  position: relative;
  margin: 4px 0 6px;
  padding: 7px 0;
  &:hover {
    cursor: pointer;
  }

  &__line {
    width: 100%;
    height: 5px;
    border-radius: 10em;
    background: var(--accent-color);
    opacity: 0.25;
  }

  &__progress {
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
    left: 0;
    width: 100%;
    height: 5px;
    border-radius: 10em;
    background: var(--accent-color);
    transform: scaleX(0);
    transform-origin:left center;
  }

  &__hide-line {
    width: 100%;
    height: 20px;
    z-index: 10;
    position: absolute;
    top: 0;
    bottom: 0;
    margin: auto;
  }

  &__thumb {
    position: absolute;
    left: 0px;
    top: 0;
    bottom: 0;
    margin: auto;
    width: 15px;
    height: 15px;
    background: var(--accent-color);
    border-radius: 10em;
    border: 2px solid #FFFFFF;
    z-index: 12;
    transform: translateX(-8px);
    &:hover {
      cursor: pointer;
    }
  }

  &__fake-drag {
    position: absolute;
    width: 1px;
    height: 1px;
    opacity: 0;
  }
}
</style>
