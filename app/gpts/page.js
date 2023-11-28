import GPTList from "@/components/GPTList";
import { getGPTsData } from "@/hooks/utilityFunctions";

export default async function GPTListPage() {
  // const groupedGPTs = await getGPTsData();
  return (
    // <GPTList groupedGPTs={groupedGPTs} />
    <GPTList/>
  );
}
