
import EditableAccountDetails from './EditableAccountDetails';
import { SellerProfile } from '@/hooks/useSellerData';

interface AccountDetailsProps {
  sellerProfile: SellerProfile;
}

const AccountDetails = ({ sellerProfile }: AccountDetailsProps) => {
  return <EditableAccountDetails sellerProfile={sellerProfile} />;
};

export default AccountDetails;
