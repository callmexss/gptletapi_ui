export const groupByCategory = (gptData) => {
  return gptData.reduce((acc, gpt) => {
    acc[gpt.category] = acc[gpt.category] || [];
    acc[gpt.category].push(gpt);
    return acc;
  }, {});
};
