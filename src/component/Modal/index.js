import React, { Children, useState } from 'react';
import Button from 'react-bootstrap/Button';
import Modal from 'react-bootstrap/Modal';
export default function ModalReact({children, show, handleClose, size, title, handleFunction}){

    return(
        <>
      <Modal show={show} onHide={handleClose} size={size}>
        <Modal.Header closeButton>
          <Modal.Title>{title}</Modal.Title>
        </Modal.Header>
        <Modal.Body>{children}</Modal.Body>
        <Modal.Footer>
          <Button variant="secondary" onClick={handleClose}>
            Đóng
          </Button>
          <Button variant="primary" onClick={handleFunction}>
            Xác nhận
          </Button>
        </Modal.Footer>
      </Modal>
    </>
    )
}