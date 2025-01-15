import useSupabase from 'src/boot/supabase';
import { useCommonStore } from 'src/stores/all';

export default function useProductApi() {
   const { supabase } = useSupabase();
    const $commonStore = useCommonStore();

    const getProductByLine = async (lineId:number) => {
      $commonStore.Add_Request();
      const { data, error } = await supabase
      .schema('Pharma')
      .rpc('fn_getproducts', { line_id: lineId })


      if (error) throw error;
      $commonStore.Remove_Request();

      return data;
    };
return {getProductByLine}

}
