import useSupabase from 'src/boot/supabase';
import { useCommonStore } from 'src/stores/all';

export default function useCatalogApi() {
  const { supabase } = useSupabase();
  const $commonStore = useCommonStore();

  const getByCatalogCve = async (catKey: string) => {
    const { data, error } = await supabase
      .schema('System')
      .from('Catalog')
      .select('*')
      .eq('catkey', catKey);

    if (error) throw error;
    $commonStore.Remove_Request();

    return data;
  };

  return { getByCatalogCve };
}
