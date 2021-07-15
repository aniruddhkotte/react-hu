import React from "react";
import "./modalForm.css";
import closeIcon from './close.png';
import successIcon from './success.svg';
import failedIcon from './failed.svg';

interface IProps {
  text: string;
  onClose: () => void;
  success: string;
  open: string;
};

function ModalForm(props: IProps) {
  return (
    <div className={props.open}>
      <div className="modal-body">
        <div className="modal-head">
          <img id="close-icon" src={closeIcon} alt="close" onClick={props.onClose} />
        </div>
        <div className="modal-content">
          <img id="status-icon" src={props.success} alt="" />
          <p>{props.text}</p>
        </div>
      </div>
    </div>
  );
}

export default ModalForm;
