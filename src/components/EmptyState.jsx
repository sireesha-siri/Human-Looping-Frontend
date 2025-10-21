// ============================================
// Empty state component
// ============================================
import { FileX } from 'lucide-react';

const EmptyState = ({ message, actionLabel, onAction }) => {
  return (
    <div className="p-12 text-center bg-white rounded-lg shadow-md">
      <FileX size={48} className="mx-auto mb-4 text-gray-400" />
      <p className="mb-6 text-lg text-gray-500">{message}</p>
      {actionLabel && onAction && (
        <button
          onClick={onAction}
          className="px-6 py-3 font-medium text-white transition rounded-lg bg-primary hover:bg-blue-600"
        >
          {actionLabel}
        </button>
      )}
    </div>
  );
};

export default EmptyState;