interface ErrorDisplayProps {
  message?: string;
}

export const ErrorMessage = ({
  message = 'Error loading data. Please try again.',
}: ErrorDisplayProps) => (
  <div className="flex justify-center items-center h-full text-red-500">
    <p>{message}</p>
  </div>
);
