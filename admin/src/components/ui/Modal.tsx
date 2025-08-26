import { motion } from "framer-motion";
import { X } from "lucide-react";
import { useEffect } from "react";

interface ModalProps {
  isOpen: boolean;
  onClose: () => void;
  children: React.ReactNode;
  title?: string;
}

const Modal = ({ isOpen, onClose, children, title }: ModalProps) => {
  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = "hidden";
    } else {
      document.body.style.overflow = "auto";
    }

    return () => {
      document.body.style.overflow = "auto";
    };
  }, [isOpen]);
  return (
    <div className="fixed inset-0 z-100 center">
      <motion.div
        onClick={onClose}
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        exit={{ opacity: 0 }}
        className="absolute inset-0 bg-black/50 z-40 backdrop-blur-sm"
      />
      <motion.div
        initial={{ opacity: 0, y: 100 }}
        animate={{ opacity: 1, y: 0 }}
        exit={{ opacity: 0, y: 100 }}
        className=" rounded-xl shadow-md bg-background w-[90%] max-w-[480px] mx-auto p-4 z-50"
      >
        <div className="flex items-center justify-between mb-2">
          <h2 className="text-lg font-bold font-outfit">{title}</h2>
          <button
            onClick={onClose}
            className="bg-foreground btn h-10 w-10 rounded-full"
          >
            <X size={20} />
          </button>
        </div>
        {children}
      </motion.div>
    </div>
  );
};

export default Modal;
