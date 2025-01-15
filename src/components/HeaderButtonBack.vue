<template>
  <!-- <q-btn icon="chevron_left" flat rounded dense no-caps @click="useGoBack" /> -->
  <q-btn
    icon="fa-solid fa-arrow-left"
    no-caps
    round
    outline
    @click="useGoBack"
    size="11px"
  />
</template>
<script setup lang="ts">
import useGoBack from '../support/utils/useGoBack';
</script>
