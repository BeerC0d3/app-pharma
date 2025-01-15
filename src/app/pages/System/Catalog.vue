<template>
  <page-header>
    <template #title>Cátalogo</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-subtitle1 text-primary">Listado</span>
        <q-space />

        <q-btn
          outline
          rounded
          no-caps
          label="Agregar"
          size="sm"
          color="primary"
          @click="clickModalForm"
        />
      </div>
      <div class="row q-mb-md">
        <q-input
          rounded
          clearable
          outlined
          dense
          class="WAL__field col-grow q-mr-sm"
          bg-color="grey-2"
          v-model="txtNombre"
          placeholder="Busca catalogo"
        >
          <template v-slot:prepend>
            <q-icon name="search" color="primary" />
          </template>
        </q-input>

        <!-- <q-btn flat round color="primary" icon="fa-solid fa-filter" /> -->
      </div>
      <empty-data
        icon="fa-solid fa-pager"
        label="No hay ningún cátalogo."
        v-if="listCatalog.length == 0"
      />

      <useSlideItem
        v-for="catalog in listCatalog"
        :key="catalog.id"
        :slide-item="{
          rowId: catalog.id,
          title: catalog.catname,
          subTitle: catalog.catkey,
          titleSideTop: '',
          titleSideBottom: '',
          iconSide: true,
          avatar: false,
        }"
        :edit="fnEdit"
        :to="fnRouteTo"
      />
    </div>
  </page-body>
  <useCatalogFormModal />
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount, inject } from 'vue';
import { useRouter } from 'vue-router';
import useSlideItem from 'src/app/components/System/SlideItem.vue';
import useApi from 'src/app/Composables/UseApi';
import { ICatalog } from 'src/app/Models/System/IModel';
import useCatalogFormModal from 'src/app/components/System/CatalogAddEdit.vue';
import useModelMessage from 'src/Composables/ModalMessage';
import { useModalStore, useCommonStore } from 'src/stores/all';

const { Show, Hide, GetModal } = useModelMessage();
const { TableToList } = useApi();
const $commonStore = useCommonStore();
const $modalStore = useModalStore();
const router = useRouter();
const bus = inject<any>('bus');

const listCatalog = ref<ICatalog[]>([]);
const txtNombre = ref('');
const clickModalForm = () => {
  $modalStore.ShowModal(1, [{ key: 'id', value: '0' }]);
};

const getCatalog = async () => {
  try {
    $commonStore.Add_Request();
    listCatalog.value = await TableToList('System', 'Catalog');
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};

onBeforeMount(async () => {
  await getCatalog();
});
const fnEdit = (rowId: number) => {
  $modalStore.ShowModal(rowId, [{ key: 'id', value: rowId.toString() }]);
};
const fnRouteTo = (rowId: number) => {
  router.push({ name: 'catalog-detail', params: { catid: rowId } });
};

bus.on('load-catalog', async () => {
  await getCatalog();
});
</script>
<style lang="scss"></style>
