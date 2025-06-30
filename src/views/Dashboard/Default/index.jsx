import React from 'react';
import { useNavigate } from 'react-router-dom';


// material-ui
// import { useTheme, styled } from '@mui/material/styles';
// import { useTheme } from '@mui/material/styles';
// import { Grid, Card, CardHeader, CardContent, Typography, Divider, LinearProgress } from '@mui/material';
import { Grid } from '@mui/material';
import { FaFileInvoice, FaClipboardList, FaBoxOpen, FaUsers } from 'react-icons/fa';

//project import
// import SalesLineCard from 'views/Dashboard/card/SalesLineCard';
// import SalesLineCardData from 'views/Dashboard/card/sale-chart-1';
// import RevenuChartCard from 'views/Dashboard/card/RevenuChartCard';
// import RevenuChartCardData from 'views/Dashboard/card/revenu-chart';
import ReportCard from './ReportCard';

import { gridSpacing } from 'config.js';

// assets
// import TrendingUpIcon from '@mui/icons-material/TrendingUp';
// import TrendingDownIcon from '@mui/icons-material/TrendingDown';
// import MonetizationOnTwoTone from '@mui/icons-material/MonetizationOnTwoTone';
// import DescriptionTwoTone from '@mui/icons-material/DescriptionTwoTone';
// import ThumbUpAltTwoTone from '@mui/icons-material/ThumbUpAltTwoTone';
// import CalendarTodayTwoTone from '@mui/icons-material/CalendarTodayTwoTone';

// custom style
// const FlatCardBlock = styled((props) => <Grid item sm={6} xs={12} {...props} />)(({ theme }) => ({
//   padding: '25px 25px',
//   borderLeft: '1px solid' + theme.palette.background.default,
//   [theme.breakpoints.down('sm')]: {
//     borderLeft: 'none',
//     borderBottom: '1px solid' + theme.palette.background.default
//   },
//   [theme.breakpoints.down('md')]: {
//     borderBottom: '1px solid' + theme.palette.background.default
//   }
// }));

// ==============================|| DASHBOARD DEFAULT ||============================== //

const Default = () => {
  // const theme = useTheme();
  const navigate = useNavigate();

  const cardOptions = [
    {
      label: 'Create Invoice',
      icon: FaFileInvoice,
      route: '/dashboard/create-new-invoice'
    },
    {
      label: 'Invoices',
      icon: FaClipboardList,
      route: '/dashboard/invoices'
    },
    {
      label: 'Products',
      icon: FaBoxOpen,
      route: '/dashboard/products'
    },
    {
      label: 'Clients',
      icon: FaUsers,
      route: '/dashboard/clients'
    }
  ];

  return (
    <Grid container spacing={gridSpacing} className='p-10'>
      {cardOptions.map((card, index) => (
        <Grid item lg={3} sm={6} xs={12} key={index}>
          <ReportCard
            label={card.label}
            icon={card.icon}
            onClick={() => navigate(card.route)}
          />
        </Grid>
      ))}
    </Grid>
  );
};

export default Default;
