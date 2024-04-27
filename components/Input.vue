<script setup lang="ts">
const props = defineProps({
    multiline: {
        required: false,
        default: false
    },
    placeholder: {
        required: false,
        default: ''
    },
    type: {
        required: false,
        default: 'text'
    }
})

const model = defineModel()
const focused = ref(false)

if (props.multiline) {
    watch(model, () => {
        const sizer = document.querySelector('.input-sizer') as HTMLElement
        sizer.setAttribute('data-value', model.value as string)
    })
}
</script>

<template>
    <div>
        <input :placeholder="props.placeholder" v-model="model" class="input outline-none w-full px-4 py-2 border-solid border-transparent border-4" :class="{'input--filled': model}" v-if="!props.multiline" :type="props.type">
        
        <div v-else class="input-sizer stacked input outline-none w-full px-4 py-2 border-solid border-transparent border-4" :class="{'input--filled': model, 'input--focused': focused}">
            <textarea :placeholder="props.placeholder" @focusin="focused = true" @focusout="focused = false" v-model="model" class="outline-none w-full"></textarea>
        </div>
    </div>
</template>

<style lang="stylus">
.input
    margin 1rem 0
    outline none
    color white
    background rgba(#fff, 0.2)
    backdrop-filter blur(5px)
    transition all .5s ease-out
    border-radius 5px
    &:focus, &--focused
        background rgba(#fff, 0.8)
        color black
        border-color accentBlue

    &--filled
        background #fff
        color black
        border-color accentColor

.input-sizer {
  display: inline-grid;
  vertical-align: top;
  align-items: center;
  position: relative;

  &.stacked {
    align-items: stretch;
    
    &::after,
    input,
    textarea {
      grid-area: 2 / 1;
    }
  }
  
  &::after,
  input,
  textarea {
    width: auto;
    min-width: 1em;
    grid-area: 1 / 2;
    font: inherit;
    margin: 0;
    resize: none;
    background: none;
    appearance: none;
    border: none;
  }
  
  &::after {
    content: attr(data-value) ' ';
    visibility: hidden;
    white-space: pre-wrap;
  }
}
</style>