<script setup lang="ts">
const navbarStore = useNavbarStore()
</script>

<template>
  <NuxtLayout name="starry" footer="simply">
    <div class="founder__title w-[90%] md:w-[70%] lg:w-1/2 mx-auto text-center mt-32">
          <h1 class="founder__title--main text-4xl md:text-6xl font-serif">Our Founder</h1>
          <h3 class="founder__title--sub font-heading mt-4 md:mt-8 md:text-xl xl:text-2xl">Learn about the visionary behind our dance school. Discover their passion, journey, and dedication to creating a welcoming space for dancers of all ages and backgrounds.</h3>
      </div>
      <h3 class="my-32 text-2xl w-[90%] md:w-[80%] lg:w-[70%] xl:w-2/3 mx-auto text-justify">
    <img src="~/assets/founder.jpg" class="w-full lg:w-1/2 lg:ml-8 mb-8 lg:float-right" />
        Established in 1983 by SMT. B. Suhasini in Pune, the organization became a hub for Kathak enthusiasts. Under the expert guidance of Prof. Balasaheb Gokhale at 'Bharat Natyam Sanshodhan Mandir,' SMT. B. Suhasini meticulously mastered Kathak over a 15-year period. Together, as mentor and pupil, they graced numerous stages in Pune, enriching the city's cultural tapestry with Kathak performances.

Expanding their reach, they pioneered Kathak education at Shadu College, offering classes tailored for young girls. Their commitment to nurturing talent from an early age elevated the local Kathak dance scene, establishing a benchmark for Kathak instruction in Pune.

In 1970, they innovated a unique musical instrument crafted from pottery, attracting renowned singers to their gatherings. Following their 1968 marriage, they encouraged their wife, Smt. B. Suhasini, to pursue dance lessons. Under the guidance of Prof. K. Balasaheb Gokhale, she excelled in Kathak and established herself as a proficient instructor. B. Suhasini's dance classes enriched various organizations, including 'Jivanjoth' on Karve Road, alongside Akhil Bhartiya Gandharwa and Tilak Maharashtra Vidyapeeth, fostering a vibrant dance community.

During the period of 1965-1970, Sony Company organized competitions where they secured the prestigious 2nd rank nationwide. Notably, in one such event, renowned singer Shri. Mahendra Kapoor clinched the 1st position, with the esteemed presence of the chief guest, Shri. Mohammad Rafi. Their exceptional talent earned them the affectionate title of 'second Rafi' from their father. Proficient in the study of songs and skilled in various instruments, their passion for dance, particularly Kathak, led them to nurture numerous artists. Their expertise extended to instrument repair, further enhancing their reputation. Today, they impart their expertise through certified Kathak dance classes in Pune, fostering a new generation of talents.

Alongside their prowess in dance, they showcased remarkable singing abilities. Guided by their husband, B. Saynna, they delved into the intricacies of Shastra Priya songs. Prof. K.B. Saynna's rigorous training under the Indian Singing Committee, Pune, honed their vocal talents. Between 1965 and 1980, their performances captivated audiences across Maharashtra, leaving a lasting impression in various districts.

Established in 1983 by SMT. B. Suhasini in Pune, the organization became a hub for Kathak enthusiasts. Under the expert guidance of Prof. Balasaheb Gokhale at 'Bharat Natyam Sanshodhan Mandir,' SMT. B. Suhasini meticulously mastered Kathak over a 15-year period. Together, as mentor and pupil, they graced numerous stages in Pune, enriching the city's cultural tapestry with Kathak performances.

Expanding their reach, they pioneered Kathak education at Shadu College, offering classes tailored for young girls. Their commitment to nurturing talent from an early age elevated the local Kathak dance scene, establishing a benchmark for Kathak instruction in Pune.</h3>
  </NuxtLayout>
</template>

<style lang="stylus">
gradients = { position: 'top center', color: accentColor, opacity: 0.6, size: 5%, transparent: 50% },
            { position: 'bottom left', color: accentBlue, opacity: 0.6, size: 2%, transparent: 40% },
            { position: 'bottom right', color: accentBlue, opacity: 0.6, size: 2%, transparent: 40% }
.index-founder
    background gradients_to_bg(gradients)

</style>
