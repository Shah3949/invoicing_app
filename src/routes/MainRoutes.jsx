import React, { lazy } from 'react';

// project import
import MainLayout from 'layout/MainLayout';
import Loadable from 'component/Loadable';
import InvoiceApp from 'views/invoice/InvoiceApp';
import InvoicesPage from 'views/invoice/InvoicesPage';
import ProductsPage from 'views/invoice/ProductsPage';
import ClientsPage from 'views/invoice/ClientsPage';

const DashboardDefault = Loadable(lazy(() => import('views/Dashboard/Default')));
const UtilsTypography = Loadable(lazy(() => import('views/Utils/Typography')));
const SamplePage = Loadable(lazy(() => import('views/SamplePage')));

// ==============================|| MAIN ROUTES ||============================== //

const MainRoutes = {
  path: '/',
  element: <MainLayout />,
  children: [
    {
      path: '/',
      element: <DashboardDefault />
    },
    {
      path: '/dashboard/default',
      element: <DashboardDefault />
    },
    { path: '/utils/util-typography', element: <UtilsTypography /> },
    { path: '/sample-page', element: <SamplePage /> },
    { path: '/dashboard/create-new-invoice', element: <InvoiceApp /> },
    { path: '/dashboard/invoices', element: <InvoicesPage /> },
    { path: '/dashboard/products', element: <ProductsPage /> },
    { path: '/dashboard/clients', element: <ClientsPage /> }
  ]
};

export default MainRoutes;
