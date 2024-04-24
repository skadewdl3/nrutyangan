<script setup lang="ts">
    const links = [
        {
            name: 'Our Founder',
            link: '/founder'
        },
        {
            name: 'Join Us',
            action: () => {} // Scroll to footer
        },
        {
            name: 'Login', // Change this as per auth status
            action: () => {}, // Sign out if logged in,
            link: '/auth'
        }
    ]

    const logo = ref(null)
    const hovered = useElementHover(logo)
</script>

<template>
    <div class="navbar w-full flex items-center justify-between p-4 md:px-8">
        <div ref="logo" class="navbar__right flex items-center justify-start cursor-pointer hover:text-white transition-all">
            <div class="navbar__logo" :class="{'navbar__logo--hovered': hovered}"><img src="~/assets/logo.png" class="w-12 sm:w-16 md:w-20 xl:w-24" /></div>
            <div class="navbar__text font-serif text-3xl hidden md:block">Nrutyangan</div>
        </div>
        <div class="navbar__left font-heading hidden md:block">
            <a class="py-1 ml-4 cursor-pointer relative" v-for="link in links">
            <span class="navbar__link">{{ link.name }}</span>
            </a>
        </div>
    </div>
</template>

<style lang="stylus">
.navbar__logo
    transition filter .2s ease-in-out
    filter brightness(0) invert(100%) sepia(75%) saturate(671%) hue-rotate(174deg) brightness(96%) contrast(84%);
.navbar__logo--hovered
    filter brightness(0) invert(98%) sepia(9%) saturate(1482%) hue-rotate(193deg) brightness(117%) contrast(100%)

.navbar__link
    transition all
    border solid 2px transparent
    
    &:before, &:after
        content ''
        position absolute
        left 0
        bottom 0
        width 0
        border-bottom solid 2px accentColor


    &:hover:before
        animation border_anim 0.2s ease-out forwards

        
    &:not(:hover):after
        animation border_anim_rev 0.2s ease-out forwards

@keyframes border_anim
	from
		width 0
	100%
		width 100%

@keyframes border_anim_rev
	from
		width 100%
	100%
		width 0
</style>