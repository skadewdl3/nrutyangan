<script setup>
    import validatorModule from 'validator';

     const getDefaultValidator = (type) => {
        switch (type) {
            case 'email':
                return validatorModule.isEmail
            case 'password':
                return validatorModule.isStrongPassword
            default:
                return () => true
        }
    }


    const props = defineProps({
        type: {
            type: String,
            default: 'text',
        },
        validator: {
            type: Function,
            default: null
        },
        placeholder: {
            type: String,
            default: ''
        },
        disabled: {
            type: Boolean,
            required: false,
            default: false
        }
    })

    const type = ref(props.type)
    const validator = props.validator || getDefaultValidator(props.type)
    const model = defineModel()
    const valid = computed(() => validator(model.value))
    const hidden = ref(true)
</script>

<template>
    <div
        class="input__wrapper flex w-full items-center px-4 py-2 my-2 border-solid border-[#ccc] focus:border-[#aaa] border-2 rounded"
        :class="{
            'border-b-red-500': !disabled && !valid,
            'border-b-primary': !disabled && valid,
            'border-[#ccc] bg-[#eee]': disabled
        }"
        >

        <input
            v-model="model"
            :placeholder="props.placeholder"
            :type="type"
            class="outline-none transition-all w-full"
            :disabled="props.disabled"
        >
        <button class="input__visibility text-xl" v-if="props.type == 'password'" @click="() => {
            hidden = !hidden;
            type = hidden ? 'password' : 'text'
        }">
            <Icon v-if="hidden" name="clarity:eye-show-line" />
            <Icon v-else name="clarity:eye-hide-line" />
        </button>
    </div>
</template>

<style lang="stylus">

</style>