import { Box, Dialog, IconButton } from '@mui/material';
import { ContactForm } from './ContactForm';
import { CloseIcon } from './icons/SvgIcons';

export const FormDialog = ({ open, closeDialog }) => {
  return (
    <Dialog fullWidth open={open}>
      <Box sx={{ padding: '20px', position: 'relative' }}>
        <IconButton
          onClick={() => {
            closeDialog();
          }}
          sx={{ position: 'absolute', top: 10, right: 5 }}
        >
          <CloseIcon />
        </IconButton>
        <ContactForm />
      </Box>
    </Dialog>
  );
};
