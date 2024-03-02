<script setup>
definePageMeta({ middleware: 'auth' })

const { signOut } = useAuth()

const logout = () => {
    signOut({
        redirect: true,
        callbackUrl: '/auth'
    })
}
</script>

<template>
    <div class="bg-red-400 bruh">
        <button @click="logout">Sign out</button>
    </div>
</template>

<style lang="stylus">

</style>