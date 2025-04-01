import Modal from "@mui/material/Modal";
import { PropsWithChildren } from "react";
import { RiCloseLargeFill } from "react-icons/ri";

type ModalProps = PropsWithChildren<{
  title: string;
  open: boolean;
  handleClose: () => void;
}>;
const ModalComponent = ({ title, open, handleClose, children }: ModalProps) => {
  return (
    <Modal
      open={open}
      onClose={handleClose}
      aria-labelledby="modal-modal-title"
      aria-describedby="modal-modal-description"
      className="backdrop-blur-sm bg-[#0000000F] flex items-center justify-center w-screen h-screen p-5"
    >
      <div className="bg-white max-w-lg w-full h-fit p-5 rounded-xl">
        <div className="flex items-center justify-between mb-10">
          <p className="text-xl sm:text-3xl font-bold">{title}</p>
          <RiCloseLargeFill
            className="text-4xl cursor-pointer"
            onClick={handleClose}
          />
        </div>
        {children}
      </div>
    </Modal>
  );
};

export default ModalComponent;
