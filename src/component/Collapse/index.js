import Collapse from 'react-bootstrap/Collapse';
export default function MyCollapse({ open, children, id }) {
    return (
        <Collapse in={open}>
            <div id={id}>
                {children}
            </div>
        </Collapse>
    )
}