import Button from '@/components/Button';

interface FooterProps {
  isReservationPossible: boolean;
}

const Footer = ({ isReservationPossible }: FooterProps) => {
  return (
    <div>
      <footer>
        <Button.Default disabled={!isReservationPossible} className="h-56 w-432">
          예약하기
        </Button.Default>
      </footer>
    </div>
  );
};

export default Footer;
