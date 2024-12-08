import { RefreshCw } from 'lucide-react';

interface LoadingSpinnerProps {
  message?: string;
  size?: 'default' | 'large';
}

export const LoadingSpinner = ({
  message = 'Loading...',
  size = 'default',
}: LoadingSpinnerProps) => {
  const sizeClasses = {
    default: 'h-6 w-6 mb-2',
    large: 'h-12 w-12 mb-4',
  };

  const textClasses = {
    default: 'text-base',
    large: 'text-xl',
  };

  return (
    <div className="flex justify-center items-center h-full">
      <div className="flex flex-col items-center">
        <RefreshCw
          className={`${sizeClasses[size]} animate-spin text-blue-500 ${sizeClasses[size] === 'large' ? 'mb-4' : ''}`}
        />
        <p className={`${textClasses[size]} text-gray-700`}>{message}</p>
      </div>
    </div>
  );
};
