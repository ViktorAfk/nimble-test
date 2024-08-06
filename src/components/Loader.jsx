import { Box, CircularProgress } from '@mui/material';
export const Loader = (isPending = false) => {
  return (
    <Box
      sx={{
        height: '100%',
        position: isPending ? 'absolute' : 'relative',
        right: 0,
        left: 0,
        marginInline: 'auto',
      }}
    >
      <CircularProgress
        sx={{
          color: '#5f6368',
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
          position: 'absolute',
          top: '50%',
          left: '50%',
          transform: 'translate(-50%, -50%)',
        }}
      />
    </Box>
  );
};
