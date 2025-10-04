import React from 'react';
import * as LucideIcons from 'lucide-react';
import { cn } from '@/lib/utils';
type IconName = keyof typeof LucideIcons;
interface DynamicIconProps extends React.ComponentProps<'svg'> {
  name: IconName | string;
}
export function DynamicIcon({ name, className, ...props }: DynamicIconProps) {
  const IconComponent = LucideIcons[name as IconName] as React.FC<React.SVGProps<SVGSVGElement>>;
  if (!IconComponent) {
    // Fallback icon
    return <LucideIcons.HelpCircle className={cn("h-5 w-5", className)} {...props} />;
  }
  return <IconComponent className={cn("h-5 w-5", className)} {...props} />;
}