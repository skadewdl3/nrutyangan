<script setup>
const navbarStore = useNavbarStore()
</script>

<template>
    <div class="flyout fixed top-0 left-0 w-full h-screen z-10">
        <div class="flex items-center justify-center h-full">
            <div class="flex flex-col items-center justify-center">
                <div class="text-3xl font-heading">Menu</div>
                <div class="flex flex-col items-center justify-center mt-4">
                    <a class="py-2" v-for="link in navbarStore.items">{{ link.name }}</a>
                </div>
            </div>
        </div>
    </div>
</template>

<style lang="stylus">

.fade-enter-active,
.fade-leave-active
  transition opacity 0.5s ease

.fade-enter-from,
.fade-leave-to
  opacity 0

</style>