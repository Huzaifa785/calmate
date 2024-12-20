// src/components/ui/progress.tsx
interface ProgressProps {
  value: number;
  className?: string;
  indicatorColor?: string;
  trackColor?: string;
}

export function Progress({ 
  value, 
  className = "", 
  indicatorColor = "bg-green-500",
  trackColor = "bg-gray-100"
}: ProgressProps) {
  const clampedValue = Math.min(100, Math.max(0, value));
  
  return (
    <div className={`h-2 w-full rounded-full ${trackColor} ${className}`}>
      <div
        className={`h-full rounded-full transition-all duration-300 ${indicatorColor}`}
        style={{ width: `${clampedValue}%` }}
      />
    </div>
  );
}