import { createBrowserRouter } from 'react-router-dom';
import RootLayout from './layout/RootLayout';
import Home from '../pages/home/Home';
import Profile from '../pages/profile/Profile';
import SingleProduct from '../pages/single/SingleProduct';
import ProtectedLayout from './layout/ProtectedLayout';
import UpdateUser from '../pages/update/UpdateDetails';
import Menus from '../pages/menus/Menus';
import Orders from '../pages/orders/Orders';
import RestaurantDishes from '../pages/restaurant/RestaurantDishes';
import Cart from '../pages/cart/Cart';
import Partner from '../pages/partner/Partner';
import Success from '../pages/checkout/Success';
import CreateProduct from '../pages/new/CreateProduct';
import Search from '../pages/search/Search';
import AccountLayout from './layout/AccountLayout';
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
        path: '/search',
        element: <Search />,
      },
      {
        path: '/',
        element: <ProtectedLayout />,
        children: [
          {
            path: '/partner',
            element: <Partner />,
          },
          {
            path: '/checkout-success',
            element: <Success />,
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
          {
            path: '/new',
            element: <CreateProduct />,
          },
          {
            path: '/profile',
            element: <AccountLayout />,
            children: [
              {
                path: '/profile',
                element: <Profile />,
              },
            ],
          },
        ],
      },
    ],
  },
]);
