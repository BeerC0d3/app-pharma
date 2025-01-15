<template>
  <q-list padding>
    <q-item>
      <q-item-section top avatar>
        <q-avatar rounded>
          <img :src="props.productItem.urlimage" />
        </q-avatar>
      </q-item-section>

      <q-item-section>
        <q-item-label overline>{{
          props.productItem.nameproduct
        }}</q-item-label>
        <q-item-label caption lines="2">{{
          props.productItem.nameline
        }}</q-item-label>
      </q-item-section>

      <q-item-section side top>
        <q-item-label caption class="text-primary">{{
          props.productItem.price
        }}</q-item-label>

        <q-icon name="more_vert" color="text-grey-8" />
      </q-item-section>
    </q-item>

    <q-separator spaced inset="item" />
  </q-list>
</template>
<!-- <style lang="scss">
.q-separator--horizontal-item-inset {
  margin-left: 20px !important;
}
.q-avatar {
  height: 56px !important;
  width: 100px !important;
}
.rounded-borders {
  border-radius: 6px !important;
}
</style> -->
<script setup lang="ts">
import { ref, PropType } from 'vue';
import { IProductView } from 'src/app/Models/Product/IModel';
import { ISwiper } from 'src/app/Models/System/IModel';

const props = defineProps({
  productItem: {
    type: Object as PropType<IProductView>,
    required: true,
  },
});
</script>
