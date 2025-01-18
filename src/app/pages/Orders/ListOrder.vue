<template>
  <page-header>
    <template #title>Pedidos</template>
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
      <q-list separator padding>
        <q-intersection transition="jump-down" class="example-item">
          <q-item
            v-for="order in listOrder"
            :key="order.id"
            class="q-my-sm"
            clickable
            v-ripple
          >
            <q-item-section avatar>
              <q-avatar color="primary" text-color="white">
                {{ order.letter }}
              </q-avatar>
            </q-item-section>

            <q-item-section>
              <q-item-label class="text-primary text-weight-medium">{{
                order.clientname
              }}</q-item-label>
              <q-item-label caption lines="1">{{ order.noorder }}</q-item-label>
              <q-item-label>{{ order.total }}</q-item-label>
            </q-item-section>

            <q-item-section side>
              <q-icon name="fa-solid fa-chevron-right" color="primary" />
            </q-item-section>
          </q-item>
        </q-intersection>
        <q-separator />
      </q-list>
    </div>
  </page-body>
</template>
<script setup lang="ts">
import { ref } from 'vue';

const listOrder = ref([
  {
    id: 0,
    clientname: 'Coca Cola SA. de C.V.',
    letter: 'C',
    noorder: 102,
    total: 15300.0,
  },
  {
    id: 0,
    clientname: 'PEPSICO SA. de C.V.',
    letter: 'P',
    noorder: 132,
    total: 1000.0,
  },
]);
</script>
