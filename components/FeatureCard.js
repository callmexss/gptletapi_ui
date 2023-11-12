export default function FeatureCard({ title, description, icon }) {
  return (
    <div className="max-w-sm rounded overflow-hidden shadow-md bg-white m-4">
      <div className="px-6 py-4">
        <img className="mx-auto h-20 w-20" src={icon} alt={title} />
        <h3 className="font-bold text-xl mb-2 text-center text-gray-800">{title}</h3>
        <p className="text-gray-600 text-base text-center">
          {description}
        </p>
      </div>
    </div>
  );
}