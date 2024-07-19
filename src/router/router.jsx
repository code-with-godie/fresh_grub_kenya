import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import SingleProduct from '../pages/single/SingleProduct';
import ProtectedLayout from './layout/ProtectedLayout';
import CreatePost from '../pages/new/CreatePost';
import UpdateUser from '../pages/update/UpdateDetails';
import Menus from '../pages/menus/Menus';
import Orders from '../pages/orders/Orders';
import RestaurantDishes from '../pages/restaurant/RestaurantDishes';
import Cart from '../pages/cart/Cart';
export const router = createBrowserRouter([
  {
    path: '/',
    element: <RootLayout />,
    children: [
      {
        path: '/',
        element: <Home />,
      },
      {
        path: '/menus',
        element: <Menus />,
      },
      {
        path: '/dish/:id',
        element: <SingleProduct />,
      },
      {
        path: '/restaurant/:id',
        element: <RestaurantDishes />,
      },
      {
        path: '/',
        element: <ProtectedLayout />,
        children: [
          {
            path: '/profile',
            element: <Profile />,
          },
          {
            path: '/new/post',
            element: <CreatePost />,
          },
          {
            path: '/update/details',
            element: <UpdateUser />,
          },
          {
            path: '/orders',
            element: <Orders />,
          },
          {
            path: '/cart',
            element: <Cart />,
          },
        ],
      },
    ],
  },
]);
