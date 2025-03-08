
import { ReactNode } from 'react';
import { AlertCircle, Info, CheckCircle2, XCircle } from 'lucide-react';
export type AlertVariant = 'destructive' | 'success' | 'warning' | 'default';
export interface AlertIconProps {
  variant: AlertVariant;
}

const getAlertIcon = (variant: AlertIconProps['variant']) => {
  switch (variant) {
    case 'destructive':
      return XCircle;
    case 'success':
      return CheckCircle2;
    case 'warning':
      return AlertCircle;
    default:
      return Info;
  }
};

export interface AlertStylesProps {
  variant: AlertVariant;
}

const getAlertStyles = (variant: AlertStylesProps['variant']): string => {
  const baseStyles = 'relative w-full rounded-lg border p-4 text-sm [&>svg]:absolute [&>svg]:left-4 [&>svg]:top-4 [&>svg+div]:translate-y-[-3px] [&>svg]:h-4 [&>svg]:w-4';
  
  switch (variant) {
    case 'destructive':
      return `${baseStyles} border-red-200 bg-red-50 text-red-700 [&>svg]:text-red-600`;
    case 'success':
      return `${baseStyles} border-green-200 bg-green-50 text-green-700 [&>svg]:text-green-600`;
    case 'warning':
      return `${baseStyles} border-yellow-200 bg-yellow-50 text-yellow-700 [&>svg]:text-yellow-600`;
    default:
      return `${baseStyles} border-blue-200 bg-blue-50 text-blue-700 [&>svg]:text-blue-600`;
  }
};

export interface AlertProps {
  children: ReactNode;
  variant?: AlertVariant;
  className?: string;
  [key: string]: any;
}

const Alert = ({ children, variant = 'default', className = '', ...props }: AlertProps) => {
  const Icon = getAlertIcon(variant);
  
  return (
    <div
      role="alert"
      className={`${getAlertStyles(variant)} ${className}`}
      {...props}
    >
      <Icon />
      {children}
    </div>
  );
};

const AlertDescription = ({ className = '', ...props }) => (
  <div
    className={`pl-7 text-sm [&_p]:leading-relaxed ${className}`}
    {...props}
  />
);

export { Alert, AlertDescription, getAlertStyles, getAlertIcon };