import {useParams, useLocation} from 'react-router-dom'

function NewUser() {
  let location  = useLocation()
  let productPath = location.pathname.includes('product')
  
  return ( 
    <div className="d-flex justify-content-center mt-5">
      <form className="col-7 border border-main">
        <div className="px-5 py-3 text-start">
          <h1 className="mb-5">Thêm người dùng</h1>
          <div className="row ">
            <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 pe-5">
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <input type="text" placeholder="Enter your name" class="form-control text-white" id="fullname" />
              </div>
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <input type="text" placeholder="Enter your name" class="form-control text-white" id="fullname" />
              </div>
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <input type="text" placeholder="Enter your name" class="form-control text-white" id="fullname" />
              </div>
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <div className=" border border-main p-2">
                  <div class="form-check form-check-inline me-5">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="male" value="1" />
                    <label class="form-check-label" for="male">Nam</label>
                  </div>
                  <div class="form-check form-check-inline me-5">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="female" value="2" />
                    <label class="form-check-label" for="female">Nữ</label>
                  </div>
                  <div class="form-check form-check-inline">
                    <input class="form-check-input" type="radio" name="inlineRadioOptions" id="orther" value="3" />
                    <label class="form-check-label" for="orther">Khác</label>
                  </div>
                </div>
              </div>
            </div>
            <div className="col-12 co-sm-12 col-md-12 col-lg-6 col-xl-6 ps-5">
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <input type="text" placeholder="Enter your name" class="form-control text-white" id="fullname" />
              </div>
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <input type="text" placeholder="Enter your name" class="form-control text-white" id="fullname" />
              </div>
              <div class="mb-3">
                <label for="fullname" class="form-label fw-bold">Email address</label>
                <input type="text" placeholder="Enter your name" class="form-control text-white" id="fullname" />
              </div>
              <div class="mt-5 py-1">
                {productPath ? <input type="file" class="form-control" multiple id="file" />
                  : <input type="file" class="form-control" id="file" />}

              </div>
            </div>

          </div>
          <div className="mb-5 mt-5 col-12">
            <button className="btn btn-danger rounded-1 py-2 w-100">Thêm</button>
          </div>
</div>
      </form>
    </div>
   );
}

export default NewUser;