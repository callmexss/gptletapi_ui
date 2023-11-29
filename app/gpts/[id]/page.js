async function getGPTData(id) {
  const apiBaseUrl = process.env.NEXT_PUBLIC_API_BASE_URL;
  const res = await fetch(`${apiBaseUrl}/gpts/${id}`, { cache: 'no-store' });
  const gptData = await res.json();

  return gptData;
}

export default async function GPTPage({ params }) {
  const gptData = await getGPTData(params.id);

  return (
    <div className="relative flex min-h-screen flex-col justify-center overflow-hidden bg-gray-50 py-6 sm:py-12">
      <div className="relative bg-white rounded-lg shadow-xl ring-1 ring-gray-900/5 sm:mx-auto sm:max-w-lg sm:rounded-lg sm:p-6">
        <div className="mx-auto max-w-md">
          <h3 className="font-bold text-lg text-gray-900 mb-2">{gptData.name}</h3>
          <img
            src={gptData.image_url}
            className="w-32 h-32 rounded-full mx-auto mb-3"
            alt={gptData.name}
          />
          <p className="text-base leading-7 text-gray-600">{gptData.description}</p>
          <p className="mt-4 text-sm font-semibold">Category: {gptData.category}</p>
          <div className="mt-4">
            <a href={gptData.link_url} className="text-sky-500 hover:text-sky-600">Visit the GPT &rarr;</a>
          </div>
        </div>
      </div>
    </div>
  );
}
