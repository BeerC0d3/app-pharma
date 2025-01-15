<template>
  <div
    id="seccion-swiper"
    :style="`max-width:${$q.screen.name == 'xs' ? '350px' : '650px'};`"
  >
    <swiper
      :slides-per-view="4"
      :space-between="10"
      @swiper="onSwiper"
      @slideChange="onSlideChange"
    >
      <swiper-slide v-for="item in listSwiper" :key="item.id">
        <div
          class="line-item"
          @click="clickClip(item.id)"
          :class="item.selected ? 'line-item-selected' : ''"
          style="cursor: pointer"
        >
          {{ item.nombre }}
        </div>
      </swiper-slide>
    </swiper>
  </div>
</template>
<script setup lang="ts">
import {
  reactive,
  computed,
  onBeforeMount,
  watch,
  PropType,
  onMounted,
} from 'vue';
import { Swiper, SwiperSlide } from 'swiper/vue';
import 'swiper/css';
import { ISwiper } from 'src/app/Models/System/IModel';
import { useQuasar } from 'quasar';

const $q = useQuasar();
const listSwiper = reactive<ISwiper[]>([]);

const props = defineProps({
  itemSwipe: {
    type: Array as PropType<Array<ISwiper | any>>,
    default: () => [],
    required: true,
  },
  getChecks: {
    type: Function,
    required: true,
  },
});

onBeforeMount(async () => {
  addFirst();
  checkedFirst();
  //console.log(props.itemSwipe);
});

const fillSwiper = () => {
  props.itemSwipe.forEach((item: any) => {
    console.log(item);

    listSwiper.push({
      id: item.id,
      nombre: item.catdetname,
      selected: false,
    });
  });
};

const addFirst = () => {
  // eslint-disable-next-line vue/no-mutating-props
  listSwiper.push({ id: 0, nombre: 'Todos', selected: false });
};

const checkedFirst = () => {
  // eslint-disable-next-line vue/no-mutating-props
  listSwiper[0].selected = true;
};

function setChecked(itemId: number) {
  listSwiper.forEach((item) => {
    item.selected = item.id == itemId ? true : false;
  });
}
const unChecked = () => {
  listSwiper.forEach((item) => {
    item.selected = false;
  });
};
//----para todos en join-------
// const seccionChecked = computed(() => {
//   return listSeccion.filter(item => item.selected)
//     .map(seccion => seccion.id)
//     .join()
//     .toString();

// });
const seccionChecked = computed(() => {
  return listSwiper
    .filter((item) => item.selected)
    .map((seccion) => seccion.id);
});
const isLoadRows = computed(() => {
  return props.itemSwipe.length > 0;
});

watch(
  () => isLoadRows.value,
  (newVal, oldval) => {
    if (newVal) {
      fillSwiper();
    }
  }
);
const onSwiper = (swiper: any) => {
  console.log(swiper);
};
const onSlideChange = () => {
  console.log('slide change');
};
const clickClip = (itemId: number) => {
  // const elementSeccion = event.target.offsetParent;
  // const seccionId = elementSeccion.dataset.seccionid;
  unChecked();
  setChecked(itemId);
};

watch(
  () => seccionChecked.value,
  (newVal, oldval) => {
    if (newVal) {
      props.getChecks(newVal[0]);
    }
  }
);
</script>
<style lang="scss">
#seccion-swiper {
  @import 'src/css/app-seccion-swiper.scss';
}
</style>
