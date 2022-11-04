import Table from 'react-bootstrap/Table';
import { useState } from 'react';
import Toast from 'react-bootstrap/Toast';

import Navbars from "../../component/Navbars"
import Footer from "../../component/Footer"
import ModalReact from "../../component/Modal"
import { ToastContainer } from 'react-bootstrap';

export default function Carts() {
  const [show, setShow] = useState(false);
  const [toast, setToast] = useState(false);
  const handleClose = () => {
    setShow(false);
    setToast(true);
  };
  return (
    <div className='bg-main shadow-sm'>
      {toast && <ToastContainer position='middle-end'><Toast onClose={() => setToast(false)}  bg="success" show={toast} delay={3000} autohide>
        <Toast.Body>Woohoo, you're reading this text in a Toast!</Toast.Body>
      </Toast></ToastContainer>}
      <ModalReact
        children={
          <table class="table">
            <thead className='text-center'>
              <tr className='border-underline'>
                <th scope="col">Tên</th>
                <th scope="col">Số lượng</th>
                <th scope="col">Đơn giá</th>
                <th scope="col">Thành tiền</th>
              </tr>
            </thead>
            <tbody className=' text-center'>
              <tr>
                <td>Mark</td>
                <td>12</td>
                <td>10.000</td>
                <td>120.000</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>12</td>
                <td>10.000</td>
                <td>120.000</td>
              </tr>
              <tr>
                <td>Mark</td>
                <td>12</td>
                <td>10.000</td>
                <td>120.000</td>
              </tr>
              <tr>
                <th scope="row" className='text-start' colSpan={3}>Tổng tiền</th>
                <td className='fw-bold'>120.000</td>
              </tr>
            </tbody>
          </table>}
        show={show}
        handleClose={handleClose}
        title="Thanh toán">

      </ModalReact>
      <Navbars />

      <div className='container mt-5 mb-5 position-relative bg-white p-3 rounded-3'>
        <h1 className="mb-5">Giỏ hàng</h1>
        <Table striped bordered hover>
          <thead>
            <tr className='border-underline'>
              <th>STT</th>
              <th>Hình ảnh</th>
              <th>Tên sản phẩm</th>
              <th>Giá</th>
              <th>Số lượng</th>
              <th>Thao tác</th>
            </tr>
          </thead>
          <tbody>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
            <tr>
              <td>1</td>
              <td><img src="https://hc.com.vn/i/ecommerce/media/ckeditor_2788029.jpg" style={{ width: '50px', height: '50px' }} /></td>
              <td>Tủ lạnh</td>
              <td>10000</td>
              <td>1</td>
              <td>
                <button className="btn btn-danger">Remove</button>
              </td>

            </tr>
          </tbody>
        </Table>

        <div className="text-right mb-4">
          <h3 className="mt-4 mb-5 uppercase">Tổng sản phẩm: 20</h3>
          <button onClick={() => setShow(true)} className="btn btn-outline-success px-5 rounded-5 mr-0">
            Check out
          </button>
        </div>
      </div>
      <Footer />
    </div>
  )
}