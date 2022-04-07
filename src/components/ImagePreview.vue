<script setup>

import {computed, onMounted, ref, watch} from 'vue';
import {useStore} from 'vuex';
import {debounce} from 'lodash';

import exampleImg from '@/assets/images/example.png'

const store = useStore()

const canvasImg = ref(null)
const imageContainer = ref(null)
const fileContainer = ref(null)
const file = ref(null)
const img = ref(null)
const originalImgData = ref(null)

const contrast = computed(() => store.state.contrast)
const brightness = computed(() => store.state.brightness)


const filename = computed(() => {
  return file.value && file.value.name ? file.value.name : 'Load file'
})

watch(contrast, () => {
  changeBrightnessContrast()
})

watch(brightness, () => {
  changeBrightnessContrast()
})

const changeBrightnessContrast = () => {
  const ctx = canvasImg.value.getContext('2d')
  const iD = ctx.getImageData(0, 0, canvasImg.value.width, canvasImg.value.height)
  let dA = iD.data

  const brightnessMul = brightness.value * 2

  const contrastConverted = contrast.value * 2
  const intercept = 128 * (1 - contrastConverted);

  for(let i = 0; i < dA.length; i += 4)
  {
    let red = brightnessMul * originalImgData.value[i];
    let green = brightnessMul * originalImgData.value[i + 1];
    let blue = brightnessMul * originalImgData.value[i + 2];

    red = red * contrastConverted + intercept;
    green = green * contrastConverted + intercept;
    blue = blue * contrastConverted + intercept;

    dA[i] = Math.max(0, Math.min(255, red));
    dA[i + 1] = Math.max(0, Math.min(255, green));
    dA[i + 2] = Math.max(0, Math.min(255, blue));
  }

  ctx.putImageData(iD, 0, 0)
}

const handleFileUpload = async() => {
  file.value = fileContainer.value.files[0]
  drawCanvas()
}

const drawCanvas = () => {
  const ctx = canvasImg.value.getContext('2d')
  img.value = new Image()
  img.value.src = URL.createObjectURL(file.value)
  img.value.onload = () => {
    canvasImg.value.width = imageContainer.value.offsetWidth
    canvasImg.value.height = imageContainer.value.offsetWidth * (img.value.height / img.value.width)
    ctx.drawImage(img.value, -1, 0, canvasImg.value.width, canvasImg.value.height);
    originalImgData.value = ctx.getImageData(0, 0, canvasImg.value.width, canvasImg.value.height).data.slice()
    changeBrightnessContrast()
  }
}

window.addEventListener('resize',() => {
  drawCanvas()
})

onMounted(async () => {
    await fetch(exampleImg).then(res => res.blob()).then(blob => {
      file.value = new File([blob], "example",{ type: "image/png" })
      drawCanvas()
    })
})
</script>

<template>
  <div class="image-preview" ref="imageContainer">
    <div class="image-preview__image">
      <canvas ref="canvasImg"></canvas>
    </div>
    <div class="image-preview__buttons">
      <div class="image-preview__file">
        <div class="image-preview__file-label">Name</div>
        <div class="image-preview__file-name">{{ filename }}</div>
      </div>
      <label for="file-image" class="image-preview__upload">
        <div class="image-preview__upload-icon">
          <img class="image-preview__upload-icon" src="@/assets/icons/arrow-up.svg">
        </div>
        <span class="image-preview__upload-label">Upload</span>
        <input id="file-image" ref="fileContainer" @change="handleFileUpload"  type="file" hidden>
      </label>
    </div>
  </div>
</template>

<style lang="scss">
.image-preview {
  border-radius: 5px;
  border: 1px solid #DCDEE4;

  &__buttons {
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 14px 6px 6px;
    font-size: 11px;
    font-weight: 500;
    letter-spacing: 1.1px;
    text-transform: uppercase;
  }

  &__file {
    display: flex;
    border-radius: 5px;
    border: 1px solid #DCDEE4;
    height: 30px;
    display: flex;
    align-items: center;
    overflow: hidden;
  }

  &__file-label {
    border-right: 1px solid #DCDEE4;
    padding: 0 12px;
    background: #F6F8FA;
    height: 100%;
    line-height: 30px;
    color: #8392A6;
  }

  &__file-name {
    color: #25A95B;
    padding: 0 6px;
    overflow: hidden;
    text-overflow: ellipsis;
    white-space: nowrap;
    max-width: 200px;
  }

  &__upload {
    height: 30px;
    border: 1px solid #DCDEE4;
    border-radius: 5px;
    display: flex;
    align-items: center;
    padding: 0 10px;
    color: #4A90E2;
    background: #F6F8FA;
    font-size: 12px;
    margin-left: 24px;
    &:hover {
      cursor: pointer;
    }
  }

  &__upload-icon {
    margin-right: 3px;
    padding-top: 1px;
  }
}
</style>
