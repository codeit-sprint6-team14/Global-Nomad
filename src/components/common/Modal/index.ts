import CancelConfirmPopup from './CancelConfirm';
import CancelReservation from './CancelReservation';
import DateSelect from './DateSelect';
import ModalOverlay from './Overlay';
import RegisterConfirmPopup from './RegisterConfirm';
import Review from './Review';

const Modal = {
  DateSelect: DateSelect,
  Review: Review,
  CancelReservation: CancelReservation,
  Overlay: ModalOverlay,
  RegisterConfirm: RegisterConfirmPopup,
  CancelConfirm: CancelConfirmPopup,
};

export default Modal;
