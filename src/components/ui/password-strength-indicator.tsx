import { Check, AlertCircle } from 'lucide-react';

const PasswordStrengthIndicator = ({ criteria, met }: { criteria: string; met: boolean }) => (
  <div className="flex items-center gap-2 text-sm">
    {met ? (
      <Check className="w-4 h-4 text-green-500" />
    ) : (
      <AlertCircle className="w-4 h-4 text-gray-300" />
    )}
    <span className={met ? 'text-green-500' : 'text-gray-500'}>{criteria}</span>
  </div>
);

export default PasswordStrengthIndicator;