import { RouterProvider, createBrowserRouter } from 'react-router-dom';

import Root from './components/Root';
import ThreeD from './pages/ThreeD';
import Flat from './pages/Flat';

export const ROUTES = {
  THREED: '/threed',
  FLAT: '/flat',
};

export const router = createBrowserRouter([
  {
    path: '/',
    element: <Root />,
    children: [
      {
        path: ROUTES.THREED,
        element: <ThreeD />,
      },
      {
        path: ROUTES.FLAT,
        element: <Flat />,
      },
    ],
  },
]);

export const Router = () => {
  return (
    <RouterProvider router={router} />
  );
};
