<template>
  <page-header>
    <template #title>Clientes</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="row q-mb-md">
        <span class="text-h6 text-primary"> Listado </span>
        <q-space />
        <q-btn
          round
          icon="add"
          size="12px"
          color="primary"
          @click="clickModalForm"
        />
      </div>
      <empty-data
        icon="fa-solid fa-pager"
        label="No hay ningún cátalogo."
        v-if="listCustomer.length == 0"
      />
      <useSlideItem
        v-for="customer in listCustomer"
        :key="customer.id"
        :slide-item="{
          rowId: customer.id,
          title: customer.name,
          subTitle: '',
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
  <useModalCustomer />
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, onBeforeMount } from 'vue';
import { useRouter } from 'vue-router';
import { ICustomer } from 'src/app/Models/Customer/IModel';
import useApi from 'src/app/Composables/UseApi';
import useModelMessage from 'src/Composables/ModalMessage';
import useSlideItem from 'src/app/components/System/SlideItem.vue';
import { useModalStore, useCommonStore } from 'src/stores/all';
import useModalCustomer from 'src/app/components/Customer/CustomerAddEdit.vue';

const { Show, Hide, GetModal } = useModelMessage();
const $commonStore = useCommonStore();
const $modalStore = useModalStore();
const router = useRouter();
const { TableToList } = useApi();

const listCustomer = ref<ICustomer[]>([]);

const getCustomer = async () => {
  try {
    $commonStore.Add_Request();
    listCustomer.value = await TableToList('Pharma', 'Customer');
    console.log(listCustomer.value);
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};
onBeforeMount(async () => {
  await getCustomer();
});
const clickModalForm = () => {
  $modalStore.ShowModal(1, [{ key: 'id', value: '0' }]);
};

const fnEdit = (rowId: number) => {
  $modalStore.ShowModal(rowId, [{ key: 'id', value: rowId.toString() }]);
};
const fnRouteTo = (rowId: number) => {
  //router.push({ name: 'catalog-detail', params: { catid: rowId } });
};
</script>
