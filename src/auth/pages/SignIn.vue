<template>
  <div class="container-template">
    <div class="justify-center items-center content-center h-100">
      <div class="sign-in-area">
        <div class="heading-2">
          <img class="img img-fluid" src="~assets/pets.png" />
          <p class="text-primary heading-2">Ingresar</p>
        </div>
        <q-form class="q-gutter-y-md" @submit.prevent="handleLogin">
          <div class="col-md-4 col-sm-6 col-xs-10">
            <q-input
              outlined
              label="Email"
              v-model="formLogin.email"
              lazy-rules
              stack-label
              :rules="[
                (val) => (val && val.length > 0) || 'Email es requerido',
              ]"
              type="email"
              bg-color="grey-2"
            >
              <template v-slot:prepend>
                <q-icon name="email" color="primary" />
              </template>
            </q-input>

            <q-input
              outlined
              label="Password"
              v-model="formLogin.password"
              lazy-rules
              stack-label
              :rules="[
                (val) => (val && val.length > 0) || 'Password es requerido',
              ]"
              type="password"
              bg-color="grey-2"
            >
              <template v-slot:prepend>
                <q-icon name="lock" color="primary" />
              </template>
            </q-input>

            <div class="full-width q-pt-md">
              <q-btn
                no-caps
                rounded
                label="Ingresar"
                color="primary"
                class="full-width"
                type="submit"
              />
            </div>
            <!-- <div class="full-width q-gutter-y-sm">
                <q-btn
                  no-caps
                  label="Registrar"
                  class="full-width text-grey-13 text-weight-bolder"
                  flat
                  to="/auth/register"
                />
              </div> -->
          </div>
          <!-- <div class="card-icon-message text-center shadow-3">
              <q-btn
                round
                dense
                icon="fa-solid fa-arrow-right"
                class="bg-btn"
                color="white"
                size="2em"
                type="submit"
              />
            </div> -->
        </q-form>
      </div>
    </div>
    <!-- <div class="let-you-page-main">
      <div class="let-you-screen-main">
        <header class="back-btn back-btn2"></header>
        <div class="logo_img_main">
          <img class="img img-fluid" src="~assets/pets.png" />
        </div>
      </div>

    </div> -->
  </div>
</template>
<script setup lang="ts">
import { ref } from 'vue';
import { useRouter } from 'vue-router';
import { useCommonStore } from 'src/stores/all';
import { IUserAuth } from '../Models/IUserAuth';
import useUserAuth from 'src/auth/composables/userAuth';
import useModelMessage from 'src/Composables/ModalMessage';

const { userSignIn } = useUserAuth();
const { Show, Hide, GetModal } = useModelMessage();
const $commonStore = useCommonStore();
const $router = useRouter();

const formLogin = ref<IUserAuth>({
  name: '',
  email: '',
  password: '',
});

const loadingTest = () => {
  $commonStore.Add_Request();
};

const handleLogin = async () => {
  try {
    $commonStore.Add_Request();
    await userSignIn(formLogin.value);
    $router.push('/app');
  } catch (error: any) {
    $commonStore.Remove_Request();
    Show('ERROR', 'Error', error);
  }
};
</script>
