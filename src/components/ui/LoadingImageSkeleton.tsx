import { cn } from '../../shared/utils';

export const LoadingImageSkeleton = ({ className }: { className?: string }) => {
  return (
    <div className={cn(
      "animate-pulse bg-gradient-to-r from-gray-800 to-gray-700 rounded-t-xl",
      className
    )} />
  );
}; 