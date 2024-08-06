import { AppBar, Box, Button, Toolbar } from '@mui/material';

export const FormAppBar = ({ openDialog }) => {
  return (
    <Box
      sx={{ flexGrow: 1, zIndex: 200, marginBottom: '20px' }}
      position={'sticky'}
    >
      <AppBar>
        <Toolbar sx={{ backgroundColor: '#5f6368' }}>
          {/* <IconButton
            size="large"
            edge="start"
            color="inherit"
            aria-label="menu"
            sx={{ mr: 2 }}
          ></IconButton> */}
          <Button
            onClick={() => {
              openDialog();
            }}
            color="inherit"
          >
            Add contact
          </Button>
        </Toolbar>
      </AppBar>
    </Box>
  );
};
