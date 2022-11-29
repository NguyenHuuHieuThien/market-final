import Accordion from 'react-bootstrap/Accordion';

export default function MyAccordion({children, title}) {
  return (
    <Accordion>
      <Accordion.Item eventKey="0">
        <Accordion.Header>{title}</Accordion.Header>
        <Accordion.Body>
          {children}
        </Accordion.Body>
      </Accordion.Item>
    </Accordion>
  );
}