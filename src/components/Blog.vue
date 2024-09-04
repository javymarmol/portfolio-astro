<script setup lang="ts">
import {extract} from '@extractus/feed-extractor'

interface Props {
  height?: string
  colSpan?: string
  rowSpan?: string
}

const props = defineProps<Props>()

const posts = await extract('https://blog.javymarmol.com/rss/')
    .then((data) => {
      return data
    })


</script>

<template>
  <div
      class="flex flex-col gap-4 card h-max sm:h-auto group overflow-hidden transform-y-[-40%] bg-neutral-900 shadow-lg rounded-lg p-6
       border border-slate-100 hover:border-cyan-500 align-start flex-none justify-start relative transform
       perspective-1200 w-full transition duration-75 ease-in-out col-span-1 overflow-y-scroll"
      :class="[height || 'h-full', colSpan || 'md:col-span-2', rowSpan || '']"
  >
    <a href="https://blog.javymarmol.com" target="_blank" class="w-full flex justify-between  hover:text-cyan-500">
      <h2 class="text-xl font-bold m-0 z-20">Blog</h2>
      <span class="iconify ri--arrow-right-up-line h-6 float-right group-hover:text-primary-500
       group-hover:translate-x-1 group-hover:-translate-y-1 transition-transform ease-in-out duration-100 z-20"></span>
      <span class="sr-only">Blog</span>
    </a>
    <a :href="entry.link" v-for="entry in posts.entries?.slice(0,3)"
       :key="entry.link" target="_blank" class="hover:text-cyan-300 align-start
     flex-none  justify-start relative transform cursor-pointer
       perspective-1200 w-full transition duration-75 ease-in-out">
      <div>
        <h3>{{entry.title}}</h3>
        <p class="text-sm font-light line-clamp-2">{{entry.description}}</p>
      </div>
    </a>
  </div>
</template>

