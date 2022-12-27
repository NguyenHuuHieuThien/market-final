import {Link} from 'react-router-dom'
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import {faArrowLeft} from '@fortawesome/free-solid-svg-icons'
export default function NoPermision() {
    return ( 
        <div>
       <div class="alert alert-danger" role="alert">
         Bạn không có quyền truy cập vào trang này.
       </div>
       <Link to="/">
         <button className="btn btn-warning text-white">
           <FontAwesomeIcon icon={faArrowLeft} className="me-2" />
           Quay lại
         </button>
       </Link>
     </div>
     );
}
