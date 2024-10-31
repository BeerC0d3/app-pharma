import useSupabase from 'src/boot/supabase';
import { useCommonStore } from 'src/stores/all';

export default function useCatalogDetailApi() {
  const { supabase } = useSupabase();
  const $commonStore = useCommonStore();

  const getByCatalogId = async (catid: number) => {
    const { data, error } = await supabase
      .schema('System')
      .from('CatalogDetail')
      .select('*')
      .eq('catid', catid);

    if (error) throw error;
    $commonStore.Remove_Request();

    return data;
  };
  // const getByCatalogCve = async (CatalogCve: string) => {
  //   const { data, error } = await supabase
  //     .schema('System')
  //     .from('CatalogDetail')
  //     .select('*')
  //     .eq('catid', catid);

  //   if (error) throw error;
  //   $commonStore.Remove_Request();

  //   return data;
  // };

  return { getByCatalogId };
}
