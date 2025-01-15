<template>
  <page-header>
    <template #buttons-left>
      <page-header-btn-back label="" />
    </template>
    <template #title>Producto</template>
  </page-header>
  <page-body>
    <div class="q-pa-md">
      <div class="q-mb-md row wrap justify-center items-center content-start">
        <q-file
          style="display: none"
          v-model="image"
          v-bind:max-files="1"
          accept="image/*"
          @update:model-value="handleUpload"
          ref="file"
        ></q-file>
        <q-responsive :ratio="16 / 9" class="col">
          <q-card class="column" flat bordered>
            <q-img
              :src="
                imageUrl != ''
                  ? imageUrl
                  : 'http://petzooexpress.com.mx/wp-content/uploads/2019/05/imagen-lista-producto-sin-foto-2-4.png'
              "
              class="col-lg-12 col-md-12 col-xs-12 rounded-borders"
            >
              <div
                class="absolute-bottom text-center"
                @click="handleUploadBtnClick"
                style="cursor: pointer"
              >
                <q-btn
                  dense
                  flat
                  type="button"
                  icon="fa-light fa-camera"
                  label=""
                ></q-btn>
              </div>
            </q-img>
          </q-card>
        </q-responsive>
      </div>
      <q-form class="row q-col-gutter-sm" ref="formProduct">
        <q-input
          dense
          outlined
          v-model="objectProduct.keysat"
          label="Clave SAT"
          lazy-rules
          class="col-lg-6 col-md-6 col-xs-6"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.keyunit"
          label="Clave unidad"
          lazy-rules
          class="col-lg-6 col-md-6 col-xs-6"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.description"
          label="Descripción"
          lazy-rules
          class="col-lg-12 col-md-12 col-xs-12"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.barcode"
          label="Código de barras"
          lazy-rules
          class="col-lg-12 col-md-12 col-xs-12"
        >
          <template v-slot:after>
            <q-btn dense flat icon="mdi-barcode-scan" size="lg" />
          </template>
        </q-input>
        <q-select
          dense
          outlined
          class="col-lg-6 col-xs-6"
          v-model="objectProduct.lineid"
          :options="catline"
          option-label="catdetname"
          option-value="id"
          label="Linea"
          emit-value
          map-options
          :rules="[(val) => !!val || 'Seleccione linea']"
        />
        <q-select
          dense
          outlined
          class="col-lg-6 col-xs-6"
          v-model="objectProduct.brandid"
          :options="catBrand"
          option-label="catdetname"
          option-value="id"
          label="Marca"
          emit-value
          map-options
          :rules="[(val) => !!val || 'Seleccione marca']"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.cost"
          label="Costo"
          lazy-rules
          class="col-lg-6 col-md-6 col-xs-6"
          type="number"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.price"
          label="Precio"
          lazy-rules
          class="col-lg-6 col-md-6 col-xs-6"
          type="number"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.existence"
          label="Existencia"
          lazy-rules
          class="col-lg-4 col-md-4 col-xs-4"
          type="number"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.maximum"
          label="Maximo"
          lazy-rules
          class="col-lg-4 col-md-4 col-xs-4"
          type="number"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
        <q-input
          dense
          outlined
          v-model="objectProduct.minimun"
          label="Minimo"
          lazy-rules
          class="col-lg-4 col-md-4 col-xs-4"
          type="number"
          :rules="[(val) => (val && val.length > 0) || 'Campo obligatorio']"
        />
      </q-form>
    </div>
  </page-body>
  <q-footer bordered class="bg-footer">
    <div class="container-template">
      <div class="q-pa-md q-gutter-sm text-center">
        <!-- <q-btn
          outline
          rounded
          label="Cancelar"
          class=""
          no-caps
          color="negative"
          size="md"
          icon="fa-solid fa-xmark"
        /> -->
        <q-btn
          rounded
          label="Guadar"
          class="full-width"
          size="md"
          no-caps
          color="primary"
          icon="fa-regular fa-floppy-disk"
          @click="onValidation"
        />
      </div>
    </div>
  </q-footer>
  <modal-message :modal="GetModal().value" @close="Hide()" />
</template>
<script setup lang="ts">
import { ref, Ref, onBeforeMount } from 'vue';
import { QFile } from 'quasar';
import useApi from 'src/app/Composables/UseApi';
import { useCommonStore, useModalStore } from 'src/stores/all';
import useCatalogApi from 'src/app/Composables/System/Catalog';
import useDetApi from 'src/app/Composables/System/CatalogDetail';
import { useRemoveProperty } from 'src/support/utils/RemoveAddPropertyObject';
import useModelMessage from 'src/Composables/ModalMessage';
import { date } from 'quasar';
import { ICatalogoProperty } from 'src/app/Models/System/IModel';
import { IProductEntity } from 'src/app/Models/Product/IModel';

const catline = ref<ICatalogoProperty[]>([]);
const catBrand = ref<ICatalogoProperty[]>([]);

const { uploadFile, insertData, updateData, getUrlImage } = useApi();
const $commonStore = useCommonStore();
const { Show, Hide, GetModal } = useModelMessage();
const { getByCatalogCve } = useCatalogApi();
const { getByCatalogId } = useDetApi();
/**variables */
const formProduct = ref<any>(null);
const $modalStore = useModalStore();
const timeStamp = Date.now();

const image = ref(null);
const imageUrl = ref('');
const file = ref() as Ref<QFile>;

/**objectos */
const objectProduct = ref<IProductEntity>({
  id: 0,
  keysat: '',
  keyunit: '',
  description: '',
  barcode: '',
  lineid: '',
  brandid: '',
  cost: 0,
  price: 0,
  existence: 0,
  maximum: 0,
  minimun: 0,
  urlimage: '',
  //createdate: null,
  isdeleted: false,
});
/**metodos load */
onBeforeMount(async () => {
  // catEntidadFed.value = seccionesByUser.value;
  await loadCatalogs();
});
/**metodos para cargar imagen */
const handleUpload = async () => {
  $commonStore.Add_Request();
  const uploadedImage = await uploadFile('products', image.value);

  if (image.value) {
    imageUrl.value = URL.createObjectURL(image.value);
    objectProduct.value.urlimage = (
      await getUrlImage('products', uploadedImage.path)
    ).data.publicUrl;
    console.log(objectProduct.value);
    // objectProduct.value.urlimage =
  }
};

const handleUploadBtnClick = () => {
  file.value.pickFiles();
};

/**metodos para guardado */
const loadCatalogs = async () => {
  const cat1 = await getByCatalogCve('CatLinea');
  catline.value = await getByCatalogId(cat1[0].id);

  const cat2 = await getByCatalogCve('CatMarca');
  catBrand.value = await getByCatalogId(cat2[0].id);
};
const onValidation = async () => {
  formProduct.value.validate().then(async (success: any) => {
    if (success) {
      try {
        $commonStore.Add_Request();
        let objectProcessed = null;
        console.log(formProduct);
        //objectCustomer.value.catid = catid.value;

        if (objectProduct.value.id > 0) {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['createdate'],
            [],
            objectProduct.value
          );

          await updateData('Pharma', 'Product', objectProcessed);
        } else {
          objectProcessed = useRemoveProperty.removeAddProperty(
            ['id'],
            [
              {
                key: 'createdate',
                value: date.formatDate(timeStamp, 'YYYY-MM-DD'),
              },
            ],
            objectProduct.value
          );

          await insertData('Pharma', 'Product', objectProcessed);
        }

        formProduct.value.reset();
        formProduct.value.resetValidation();

        reset();
        Show('SUCCESS', 'Exito!', 'El producto se guardó correctamente');
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
    // objectCustomer.value.address = '';
    // objectCustomer.value.name = '';
    // objectCustomer.value.address = '';
    // objectCustomer.value.population = '';
    // objectCustomer.value.rfc = '';
    // objectCustomer.value.telephone = '';
    // objectCustomer.value.stateid = 0;
  }
};
</script>
