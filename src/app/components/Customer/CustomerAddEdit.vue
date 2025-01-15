<template>
  <modal-form>
    <template #seccion-button-save>
      <q-btn
        unelevated
        rounded
        no-caps
        color="primary"
        size="sm"
        label="Guardar"
        @click="onValidation"
        @reset="reset"
      />
    </template>
    <template #seccion-title>
      {{ $modalStore.getId > 0 ? objectCustomer.name : 'Agregar elemento' }}
    </template>
    <template #seccion-form>
      <q-form class="row q-col-gutter-sm" ref="formCustomer">
        <q-input
          dense
          outlined
          v-model="objectCustomer.name"
          label="Nombre"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectCustomer.rfc"
          label="RFC"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
        />
        <q-input
          dense
          outlined
          v-model="objectCustomer.address"
          label="Domicilio"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
        />
        <q-input
          dense
          outlined
          v-model="objectCustomer.population"
          label="Poblacion"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
        />
        <q-select
          dense
          outlined
          class="col-lg-12 col-xs-12"
          v-model="objectCustomer.stateid"
          :options="catEntidadFed"
          option-label="catdetname"
          option-value="id"
          label="Estado"
          emit-value
          map-options
          :rules="[(val) => !!val || 'Seleccione estado']"
        />
        <q-input
          dense
          outlined
          v-model="objectCustomer.telephone"
          label="Telefono"
          lazy-rules
          class="col-lg-12 col-md-6 col-xs-12"
        />
      </q-form>
      <modal-message :modal="GetModal().value" @close="Hide()" />
    </template>
  </modal-form>
</template>
<script setup lang="ts">
import { ref, inject, onBeforeMount, computed, watch } from 'vue';
import useApi from 'src/app/Composables/UseApi';
import useCatalogApi from 'src/app/Composables/System/Catalog';
import useDetApi from 'src/app/Composables/System/CatalogDetail';
import { useModalStore, useCommonStore } from 'src/stores/all';
import { useRemoveProperty } from 'src/support/utils/RemoveAddPropertyObject';
import useModelMessage from 'src/Composables/ModalMessage';
import { date } from 'quasar';
import {
  IPropertyObject,
  ICatalogoProperty,
} from 'src/app/Models/System/IModel';

const timeStamp = Date.now();
const id = ref(0);
const formCustomer = ref<any>(null);
const objectCustomer = ref({
  name: '',
  rfc: '',
  address: '',
  stateid: 0,
  population: '',
  telephone: '',
  isdeleted: false,
});
const catEntidadFed = ref<ICatalogoProperty[]>([]);
const { Show, Hide, GetModal } = useModelMessage();
const { getByCatalogCve } = useCatalogApi();
const { getByCatalogId } = useDetApi();
const { insertData, updateData, getById } = useApi();
const $modalStore = useModalStore();
const $commonStore = useCommonStore();
const bus = inject<any>('bus');

const isChangeId = computed(() => $modalStore.stateMode);
const isCancelCompute = computed(() => $modalStore.stateCancel);

watch(
  () => isChangeId.value,
  (newVal) => {
    if (newVal) loadData();
    else reset();
  }
);
watch(
  () => isCancelCompute.value,
  (newVal) => {
    if (newVal) reset();
  }
);
onBeforeMount(async () => {
  // catEntidadFed.value = seccionesByUser.value;
  await loadCatalog();
});
const loadCatalog = async () => {
  const cat = await getByCatalogCve('EntFed');
  catEntidadFed.value = await getByCatalogId(cat[0].id);
};
const loadData = async () => {
  $modalStore.stateParams.forEach((item: IPropertyObject) => {
    if (item.key == 'id') id.value = parseInt(item.value);
  });

  if (id.value > 0) {
    $commonStore.Add_Request();
    objectCustomer.value = await getById('Pharma', 'Customer', id.value);
  } else reset();
};
const onValidation = async (evt: any) => {
  formCustomer.value.validate().then(async (success: any) => {
    if (success) {
      try {
        $commonStore.Add_Request();
        let objectProcessed = null;
        // objectCustomer.value = catid.value;

        if (id.value > 0) {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['createdate'],
            [],
            objectCustomer.value
          );

          await updateData('Pharma', 'Customer', objectProcessed);
        } else {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['id'],
            [
              {
                key: 'createdate',
                value: date.formatDate(timeStamp, 'YYYY-MM-DD'),
              },
            ],
            objectCustomer.value
          );
          await insertData('Pharma', 'Customer', objectProcessed);
        }

        formCustomer.value.reset();
        formCustomer.value.resetValidation();
        //bus.emit('load-catalog-detail');
        reset();
        Show('SUCCESS', 'Exito!', 'El cliente se guardó correctamente');
        $modalStore.HideModal();

        // });
      } catch (error: any) {
        $commonStore.Remove_Request();
        Show('ERROR', 'Error', error);
      }
    }
  });
};

const reset = () => {
  if ($modalStore.stateCancel || undefined) {
    objectCustomer.value.address = '';
    objectCustomer.value.name = '';
    objectCustomer.value.address = '';
    objectCustomer.value.population = '';
    objectCustomer.value.rfc = '';
    objectCustomer.value.telephone = '';
    objectCustomer.value.stateid = 0;
  }
};
</script>
