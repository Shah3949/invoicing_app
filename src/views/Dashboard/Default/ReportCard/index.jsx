import PropTypes from 'prop-types';
import React from 'react';
import { useTheme } from '@mui/material/styles';
import { Card, CardContent, Grid, Typography } from '@mui/material';

const ReportCard = ({ label, icon: Icon, borderColor = '#8bbe14', onClick }) => {
  const theme = useTheme();

  return (
    <Card
      onClick={onClick}
      sx={{
        cursor: 'pointer',
        height: '100%',
        borderLeft: `4px solid ${borderColor}`,
        transition: 'all 0.3s ease',
        boxShadow: theme.shadows[1],
        '&:hover': {
          transform: 'translateY(-2px)',
          boxShadow: theme.shadows[4],
        },
      }}
    >
      <CardContent>
        <Grid container justifyContent="space-between" alignItems="center" wrap="nowrap">
          <Grid item>
            <Typography
              variant="body2"
              fontWeight="bold"
              sx={{ textTransform: 'uppercase', color: theme.palette.text.primary }}
            >
              {label}
            </Typography>
          </Grid>
          <Grid item>
            {Icon && <Icon fontSize="large" sx={{ color: theme.palette.text.secondary }} />}
          </Grid>
        </Grid>
      </CardContent>
    </Card>
  );
};

ReportCard.propTypes = {
  label: PropTypes.string.isRequired,
  icon: PropTypes.elementType.isRequired,
  borderColor: PropTypes.string,
  onClick: PropTypes.func, // optional click handler for future navigation
};

export default ReportCard;
