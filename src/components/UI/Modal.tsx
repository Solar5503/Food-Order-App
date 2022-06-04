import React from 'react';
import ReactDOM from 'react-dom';
import styles from './Modal.module.scss';

interface IModalProps {
  children?: React.ReactNode;
  onClose?: () => void;
}

const Backdrop = ({ onClose }: IModalProps) => {
  return <div className={styles.backdrop} onClick={onClose}></div>;
};

const ModalOverlay = ({ children }: IModalProps) => {
  return (
    <div>
      <div className={styles.modal}>
        <div className={styles.content}>{children}</div>
      </div>
    </div>
  );
};
const portalElement = document.getElementById('overlays') as Element;

const Modal = ({ children, onClose }: IModalProps) => {
  return (
    <>
      {ReactDOM.createPortal(<Backdrop onClose={onClose} />, portalElement)}
      {ReactDOM.createPortal(
        <ModalOverlay>{children}</ModalOverlay>,
        portalElement
      )}
    </>
  );
};

export default Modal;
