'use client';

interface SecurityBadgeProps {
  size?: 'small' | 'medium' | 'large';
  variant?: 'inline' | 'block';
}

export default function SecurityBadge({ size = 'small', variant = 'inline' }: SecurityBadgeProps) {
  const sizeClasses = {
    small: 'text-xs py-1 px-2',
    medium: 'text-sm py-2 px-3',
    large: 'text-base py-3 px-4'
  };

  const containerClasses = variant === 'inline'
    ? 'inline-flex items-center gap-2'
    : 'flex items-center gap-2 w-full';

  return (
    <div className={`${containerClasses} ${sizeClasses[size]} bg-green-50 border border-green-200 rounded text-green-800`}>
      <span className="text-lg">🔒</span>
      <span className="font-medium">Tus datos están protegidos - LFPDPPP Cumplimiento</span>
    </div>
  );
}
