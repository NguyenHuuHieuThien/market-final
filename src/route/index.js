import HomePage from "../layout/Home";
import ProductPage from "../layout/Product";
import DetailProduct from "../layout/DetailProduct";
import Carts from "../layout/Carts";
import SignIn from "../layout/Login/SignIn";
import SignUp from "../layout/Login/SignUp";
import productManager from "../layout/Admin/productManager";
import Users from "../layout/Admin/UserList";
import Trash from "../layout/Admin/trash";
import ProfilePage from "../layout/Profile";
import AddproductPage from "../layout/Addproduct";
import Adduser from "../layout/Adduser";
import Posted from "../layout/Posted";
import SellerManager from '../layout/AcceptOrder'
import SellBill from "../layout/SellBill";
import BillDetail from "../layout/BillDetail";
import ProductList from "../layout/Admin/productList";
import AwaitAccept from "../layout/awaitAccept";
import Notification from "../layout/Notification";
import NoPermision from "../component/Nopermision";

//Public Routes
const userRole = JSON.parse(localStorage.getItem('token'))?.roles[0]
export const publicRoutes = [
  { path: "/", component: HomePage },
  { path: "/product/list", component: ProductPage },
  { path: "/product/add", component: userRole&& userRole === 'ROLE_MODERATOR'?AddproductPage:NoPermision},
  { path: "/product/update/:id", component: userRole&& userRole === 'ROLE_MODERATOR'?AddproductPage:NoPermision},
  { path: "/product/:id", component: DetailProduct },
  { path: "/user/profile", component: ProfilePage },
  { path: "/user/update/:id", component: Adduser },
  { path: "/user/posted", component: userRole&& userRole === 'ROLE_MODERATOR'?Posted:NoPermision},
  { path: "/user/await", component:userRole&& userRole === 'ROLE_USER'?AwaitAccept:NoPermision},
  { path: "/user/notification", component: Notification },
  { path: "/sell/manager", component: userRole&& userRole === 'ROLE_MODERATOR'?SellerManager:NoPermision },
  { path: "/sell/list", component: userRole&& userRole === 'ROLE_MODERATOR'?SellBill:NoPermision },
  // { path: "/sell/product", component: BillDetail},
  { path: "/carts", component: userRole&& userRole === 'ROLE_USER'?Carts:NoPermision },
  { path: "/sign-in", component: SignIn },
  { path: "/sign-up", component: SignUp },
  { path: "/admin/product/manager", component:userRole&& userRole === 'ROLE_ADMIN'?productManager:NoPermision},
  { path: "/admin/products", component:userRole&& userRole === 'ROLE_ADMIN'?ProductList:NoPermision},
  { path: "/admin/users", component:userRole&& userRole === 'ROLE_ADMIN'?Users:NoPermision},
  { path: "/admin/user/create", component:userRole&& userRole === 'ROLE_ADMIN'?Adduser:NoPermision},
  { path: "/admin/user/edit/:id", component:userRole&& userRole === 'ROLE_ADMIN'?Adduser:NoPermision},
  { path: "/admin/trash", component: Trash },
];

export const privateRoutes = [];
