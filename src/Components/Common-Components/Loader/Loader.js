import * as React from 'react';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';
import './Loader.css'
export default function Loader({cssClass='' , loaderSize='1rem'}) {
  return (
    <Box className={cssClass}>
      <CircularProgress size={loaderSize} />
    </Box>
  );
}
