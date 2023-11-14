export const groupByCategory = (gptData) => {
  return gptData.reduce((acc, gpt) => {
    acc[gpt.category] = acc[gpt.category] || [];
    acc[gpt.category].push(gpt);
    return acc;
  }, {});
};


export async function getGPTsData() {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${apiBaseUrl}/gpts/`, { cache: 'no-store' });
  if (!res.ok) {
    throw new Error(`Failed to fetch GPTs: ${res.status}`);
  }
  const data = await res.json();
  return groupByCategory(data);
}