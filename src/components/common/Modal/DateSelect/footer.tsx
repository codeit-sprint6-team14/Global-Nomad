import Button from '@/components/common/Button';

interface FooterProps {
  isReservationPossible: boolean;
}

const Footer = ({ isReservationPossible }: FooterProps) => {
  return (
    <div>
      <footer>
        <Button.Default disabled={!isReservationPossible} className="h-56 w-432">
          확인
        </Button.Default>
      </footer>
    </div>
  );
};

export default Footer;
