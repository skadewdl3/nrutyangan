<script setup>
import guru1 from '~/assets/images/guru-1.png'
import guru2 from '~/assets/images/guru-2.png'
import guru3 from '~/assets/images/guru-3.png'

import guruBg1 from '~/assets/images/guru-bg-1.png'
import guruBg2 from '~/assets/images/guru-bg-2.png'
import guruBg3 from '~/assets/images/guru-bg-3.png'
const gurus = [
    {
        name: 'Guru A',
        image: guru1,
        bg: '~/assets/images/guru-bg-1.png'
    },
    {
        name: 'Guru B',
        image: guru2,
        bg: '~/assets/images/guru-bg-1.png'
    },
    {
        name: 'Guru C',
        image: guru3,
        bg: '~/assets/images/guru-bg-1.png'
    }
]
</script>

<template>
    <div class="gurus grid grid-cols-3 place-items-center" >
        <div v-for="(guru, index) in gurus" class="guru relative bg-no-repeat bg-center bg-contain" :class="`bg-[url('${guru.bg}')]`">
            <img :src="guru.image" :alt="`${guru.name} Image`">
        </div>
    </div>
</template>