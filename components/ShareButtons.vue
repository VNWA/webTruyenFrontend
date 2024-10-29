<template>
  <div class="flex flex-wrap gap-2">
    <SocialShare
      v-for="network in ['facebook', 'x', 'linkedin', 'reddit', 'telegram']"
      :key="network"
      :network="network"
      :label="false"
      class="border-2 border-white text-black/80 px-3 bg-white/50 py-2 hover:bg-[color:--color-brand] hover:text-white"
    />
  </div>
</template>
