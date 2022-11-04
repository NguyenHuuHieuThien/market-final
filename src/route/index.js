
import HomePage from '../layout/Home';
import ProductPage from '../layout/Product';
import DetailProduct from '../layout/DetailProduct';
import Carts from '../layout/Carts';
import SignIn from '../layout/Login/SignIn';
import SignUp from '../layout/Login/SignUp';
import ProductList from '../layout/Admin/productList';
import Users from '../layout/Admin/UserList';
import Trash from '../layout/Admin/trash';
import ProfilePage from '../layout/Profile';
import UpdatePage from '../layout/UpdatePage';
import AddproductPage from '../layout/Addproduct';
import Adduser from '../layout/Adduser';


//Public Routes
export const publicRoutes = [
  { path: '/', component: HomePage },
  { path: '/products', component: ProductPage },
  { path: '/product-detail/:id', component: DetailProduct },
  { path: '/carts', component: Carts },
  { path: '/sign-in', component: SignIn },
  { path: '/sign-up', component: SignUp },
  { path: '/admin/product-list', component: ProductList },
  { path: '/product-add', component: AddproductPage },
  { path: '/admin/users', component: Users },
  { path: '/admin/trash', component: Trash },
  { path: '/profile', component: ProfilePage },
  { path: '/product/update/:id', component: AddproductPage },
  { path: 'user/update/:id', component: Adduser },
  { path: '/add-user', component: Adduser },
];

export const privateRoutes = [];