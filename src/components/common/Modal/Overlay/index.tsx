interface ModalOverlayProps {
  children: React.ReactNode;
}

const ModalOverlay = ({ children }: ModalOverlayProps) => {
  return <div className="fixed inset-0 z-10 flex items-center justify-center bg-black bg-opacity-50">{children}</div>;
};

export default ModalOverlay;
