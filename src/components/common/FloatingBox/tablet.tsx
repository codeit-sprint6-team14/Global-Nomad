import TabletComponents from './TabletComponents';

const Tablet = ({ handleReservationSubmit }: { handleReservationSubmit: () => void }) => {
  return (
    <section className="sticky top-0 h-423 w-251 rounded-8 border border-gray-300 bg-white shadow-[0px_10px_30px_3px_rgba(5,16,55,0.15)]">
      <TabletComponents.Header />
      <TabletComponents.Main handleReservationSubmit={handleReservationSubmit} />
      <TabletComponents.Footer />
    </section>
  );
};

export default Tablet;
