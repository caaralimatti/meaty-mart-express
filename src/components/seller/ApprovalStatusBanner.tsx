
import { AlertCircle, Clock, CheckCircle, XCircle } from 'lucide-react';
import { Alert, AlertDescription } from '@/components/ui/alert';
import { Badge } from '@/components/ui/badge';

interface ApprovalStatusBannerProps {
  status: 'pending' | 'approved' | 'rejected';
  approvedAt?: string;
  className?: string;
}

const ApprovalStatusBanner = ({ status, approvedAt, className = '' }: ApprovalStatusBannerProps) => {
  const getStatusConfig = () => {
    switch (status) {
      case 'pending':
        return {
          icon: Clock,
          title: 'Account Pending Approval',
          description: 'Your seller account is under review. You can view your dashboard but cannot add products or livestock listings until approved.',
          variant: 'default' as const,
          badgeVariant: 'secondary' as const,
          badgeText: 'Pending Review'
        };
      case 'approved':
        return {
          icon: CheckCircle,
          title: 'Account Approved',
          description: `Your seller account was approved${approvedAt ? ` on ${new Date(approvedAt).toLocaleDateString()}` : ''}. You can now add products and livestock listings.`,
          variant: 'default' as const,
          badgeVariant: 'default' as const,
          badgeText: 'Approved'
        };
      case 'rejected':
        return {
          icon: XCircle,
          title: 'Account Rejected',
          description: 'Your seller account application was rejected. Please contact support for more information.',
          variant: 'destructive' as const,
          badgeVariant: 'destructive' as const,
          badgeText: 'Rejected'
        };
      default:
        return {
          icon: AlertCircle,
          title: 'Unknown Status',
          description: 'Account status is unclear. Please contact support.',
          variant: 'default' as const,
          badgeVariant: 'secondary' as const,
          badgeText: 'Unknown'
        };
    }
  };

  const config = getStatusConfig();
  const Icon = config.icon;

  return (
    <Alert variant={config.variant} className={`border-l-4 ${className}`}>
      <div className="flex items-start space-x-3">
        <Icon className="w-5 h-5 mt-0.5 flex-shrink-0" />
        <div className="flex-1 min-w-0">
          <div className="flex items-center justify-between mb-1">
            <h4 className="font-semibold text-sm">{config.title}</h4>
            <Badge variant={config.badgeVariant} className="text-xs">
              {config.badgeText}
            </Badge>
          </div>
          <AlertDescription className="text-sm">
            {config.description}
          </AlertDescription>
        </div>
      </div>
    </Alert>
  );
};

export default ApprovalStatusBanner;
