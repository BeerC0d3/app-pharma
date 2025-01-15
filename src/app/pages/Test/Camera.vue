<template>
  <page-header>
    <template #title>Camara</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <q-file
        style="display: none"
        v-model="image"
        v-bind:max-files="1"
        accept="image/*"
        @update:model-value="handleUpload"
        ref="file"
      ></q-file>
    </div>
    <div>
      <q-btn
        type="button"
        label="Upload Photo"
        @click="handleUploadBtnClick"
      ></q-btn>
    </div>
    <div>
      <q-img
        :src="imageUrl"
        spinner-color="white"
        style="height: 140px; max-width: 150px"
      ></q-img>
    </div>
  </page-body>
</template>
<style>
.container-photo {
  width: auto;
  height: 50vh;
  background-color: #2f3542;
  margin-bottom: 3rem;
}
.inputget {
  font-size: 1px;
  position: absolute;
  z-index: -1;
}
</style>
<script setup lang="ts">
import { Ref, ref } from 'vue';
import useApi from 'src/app/Composables/UseApi';
import { useCommonStore } from 'src/stores/all';
import { QFile } from 'quasar';

const { uploadFile } = useApi();
const $commonStore = useCommonStore();
const image = ref(null);
const imageUrl = ref('');
const file = ref() as Ref<QFile>;

const handleUpload = async (e: Event) => {
  $commonStore.Add_Request();
  await uploadFile('products', image.value);

  if (image.value) {
    imageUrl.value = URL.createObjectURL(image.value);
  }
};

const handleUploadBtnClick = (e: any) => {
  file.value.pickFiles();
};
</script>
