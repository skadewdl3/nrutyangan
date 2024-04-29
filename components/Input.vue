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
    },
    validator: {
        required: false,
        default: null,
        type: Function
    }
})

const model = defineModel()
const focused = ref(false)
const valid = computed(() => {
    return props.validator ? props.validator(model.value) : true
})



onMounted(() => {
    if (props.multiline) {
        const sizer = document.querySelector('.grow-wrap') as HTMLElement
        sizer.setAttribute('data-value', model.value as string)
        watch(model, () => {
            const sizer = document.querySelector('.grow-wrap') as HTMLElement
            sizer.setAttribute('data-value', model.value as string)
        })
    }
})
</script>

<template>
        <input :placeholder="props.placeholder" v-model="model" class="input outline-none w-full px-4 py-2 border-solid border-transparent border-4" :class="{'input--invalid': props.validator && model != '' && !valid, 'input--filled': model != '' && valid, 'input--focused': focused}" v-if="!props.multiline" :type="props.type">
        
        <div v-else class="grow-wrap input outline-none w-full px-4 py-2 border-solid border-transparent border-4" :class="{'input--invalid': props.validator && model != '' && !valid, 'input--filled': model != '' && valid, 'input--focused': focused}"  @focusin="focused = true" @focusout="focused = false">
            <textarea :placeholder="props.placeholder" @focusin="focused = true" @focusout="focused = false" v-model="model" class="outline-none w-full bg-transparent"></textarea>
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
    
    &--invalid
        border-color #ef4444!important
.grow-wrap {
  /* easy way to plop the elements on top of each other and have them both sized based on the tallest one's height */
  display: grid;
}
.grow-wrap::after {
  /* Note the weird space! Needed to preventy jumpy behavior */
  content: attr(data-value) " ";

  /* This is how textarea text behaves */
  white-space: pre-wrap;

  /* Hidden from view, clicks, and screen readers */
  visibility: hidden;
}
.grow-wrap > textarea {
  /* You could leave this, but after a user resizes, then it ruins the auto sizing */
  resize: none;

  /* Firefox shows scrollbar on growth, you can hide like this. */
  overflow: hidden;
}
.grow-wrap > textarea,
.grow-wrap::after {
  /* Identical styling required!! */
  padding: 0.5rem;
  font: inherit;

  /* Place on top of each other */
  grid-area: 1 / 1 / 2 / 2;
}
</style>