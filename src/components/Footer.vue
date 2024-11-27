<template>
  <q-footer bordered class="bg-footer footer-radius-10">
    <q-tabs active-color="text-white" class="text-grey" no-caps>
      <!-- <q-route-tab
        v-for="navItem in store.stateNav.navItems"
        :key="navItem.root"
        :to="navItem.to"
        :label="navItem.label"
        :icon="navItem.icon"
      /> -->
      <q-route-tab
        v-for="navItem in store.stateNav.navItems"
        :key="navItem.root"
        :to="navItem.to"
        :label="navItem.label"
        :icon="navItem.icon"
        @click="(event) => (navItem.name == 'Logout' ? handledLogout() : '')"
      />
    </q-tabs>
  </q-footer>
</template>
<script setup lang="ts">
import { useRouter } from 'vue-router';
import useAuthUser from 'src/auth/composables/userAuth';
import useModelMessage from 'src/Composables/ModalMessage';
import store from 'src/support/utils/updateNavItem';

const { logout } = useAuthUser();
const $router = useRouter();
const { Show } = useModelMessage();

const handledLogout = async () => {
  try {
    await logout();
    $router.push('/auth/login');
  } catch (error: any) {
    Show('ERROR', 'Error', error);
  }
};
// const $store = useUserStore();
// const $router = useRouter();

// const Salir = (message: string, event: any): void => {
//   console.log(message)
//   $store.logout();
//   $router.push('/auth/login');
// };
</script>
