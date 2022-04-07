<script setup>
import ControlsInputRange from './ControlsInputRange.vue'
import {useStore} from 'vuex';

const props = defineProps({
  accentColor: {
    type: String,
    default: '#25A95B'
  },
  title: {
    type: String,
    default: ''
  },
  description: {
    type: String,
    default: ''
  },
  mutation: {
    type: String,
    default: '',
  },
  currentValue: {
    type: Number,
    default: 0.5
  }
})

const store = useStore()

const onChangeValue = (value) => {
  store.commit(props.mutation, value)
}
</script>

<template>
  <div class="controls-item" :style="{'--accent-color': props.accentColor}">
    <h6 class="controls-item__title">{{props.title}}</h6>
    <controls-input-range :accent-color="props.accentColor" @changeValue="onChangeValue" :currentValue="currentValue" />
    <div class="controls-item__description">{{props.description}}</div>
  </div>
</template>

<style lang="scss">
.controls-item {
  height: 88px;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  box-shadow: rgba(0,0,0, 0.1) 0 0 10px 0;
  padding: 0 20px;
  border-radius: 5px;

  &:not(:last-child) {
    margin-bottom: 7px;
  }

  &__title {
    font-size: 18px;
    line-height: 25px;
    font-weight: 500;
    margin: 8px 0 0;
    color: var(--accent-color)
  }

  &__description {
    font-size: 13px;
    color: #42506B;
    line-height: 25px;
  }
}
</style>
