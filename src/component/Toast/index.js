import React, { useState } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import Toast from 'react-bootstrap/Toast';

export default function MyToast({children}) {
  const [show, setShow] = useState(false);

  return (
        <Toast onClose={() => setShow(false)} show={show} delay={3000} autohide>
          <Toast.Body>{children}</Toast.Body>
        </Toast>
  );
}
