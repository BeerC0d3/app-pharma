<template>
  <page-header>
    <template #title>Productos</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-subtitle1 text-primary"> Listado </span>
        <q-space />
        <q-btn
          outline
          rounded
          label="Agregar"
          no-caps
          size="sm"
          color="primary"
          to="/app/Product/ManageProduct"
        />
      </div>

      <empty-data
        icon="fa-solid fa-gifts"
        label="No hay ningún Producto."
        v-if="listProduct.length == 0"
      />

      <useSwiperLine :get-checks="getChecks" :item-swipe="catline" />
      <!-- <compSwipe :get-checks="getChecks" :item-swipe="catline" /> -->

      <useItemProduct
        v-for="itemProd in listProduct"
        :key="itemProd.prodid"
        :product-item="{
          prodid: itemProd.prodid,
          nameproduct: itemProd.nameproduct,
          nameline: itemProd.nameline,
          namebrand: itemProd.namebrand,
          urlimage: itemProd.urlimage,
          price: itemProd.price,
        }"
      />
    </div>
  </page-body>
</template>
<script setup lang="ts">
import { ref, onBeforeMount, defineAsyncComponent } from 'vue';
import useItemProduct from 'src/app/components/Product/CatItemProduct.vue';
import useProductApi from 'src/app/Composables/Product/Product';
import { IProductView } from 'src/app/Models/Product/IModel';
import useSwiperLine from 'src/app/components/System/SwiperSlide.vue';
import { ICatalogoProperty } from 'src/app/Models/System/IModel';
import useCatalogApi from 'src/app/Composables/System/Catalog';
import useCatalogDetailApi from 'src/app/Composables/System/CatalogDetail';

const { getByCatalogCve } = useCatalogApi();
const { getByCatalogId } = useCatalogDetailApi();
const { getProductByLine } = useProductApi();
const catline = ref<ICatalogoProperty[]>([]);
const listProduct = ref<IProductView[] | any>([]);

onBeforeMount(async () => {
  await loadCatalogs();
});

/**metodos para guardado */
const loadCatalogs = async () => {
  const cat1 = await getByCatalogCve('CatLinea');
  catline.value = await getByCatalogId(cat1[0].id);
};
// const compSwipe = defineAsyncComponent({
//   loader: () => import('src/app/components/System/SwiperSlide.vue'),
//   delay: 1000,
// });
const getChecks = async (Id: number) => {
  console.log(Id);
  listProduct.value = await getProductByLine(Id);
};
</script>
