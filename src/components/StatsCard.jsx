// ============================================
// Statistics card component
// ============================================
const StatsCard = ({ title, value, icon: Icon, color }) => {
  return (
    <div className="p-6 transition bg-white rounded-lg shadow-md hover:shadow-lg">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-gray-500">{title}</p>
          <p className="mt-2 text-3xl font-bold">{value}</p>
        </div>
        <div className={`p-3 rounded-full ${color}`}>
          <Icon size={24} className="text-white" />
        </div>
      </div>
    </div>
  );
};

export default StatsCard;
