import { Container, IconButton } from '@mui/material';
import { useMediaQuery } from '@mui/material';
import { useState } from 'react';
import { useEffect } from 'react';
import { ContactForm } from './components/ContactForm';
import { ContactsList } from './components/ContactsList';
import { FormAppBar } from './components/FormAppBar';
import { FormDialog } from './components/FormDialog';
import { MoveUp } from './components/icons/SvgIcons';

export const App = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [scrollValue, setScrollValue] = useState(0);
  const isResponsive = useMediaQuery((theme) => theme.breakpoints.down('md'));

  const handleClickClose = () => {
    setIsOpen(false);
  };

  const handleClickOpen = () => {
    setIsOpen(true);
  };

  useEffect(() => {
    const onScroll = () => {
      if (window.scrollY) {
        setScrollValue(window.scrollY);
      }
    };
    window.addEventListener('scroll', onScroll);

    return () => {
      window.removeEventListener('scroll', onScroll);
    };
  }, []);

  return (
    <Container
      maxWidth="lg"
      sx={{
        display: 'flex',
        gap: '38px',
        paddingBlock: '20px',
        minWidth: '400px',
        flexDirection: isResponsive ? 'column' : 'row',
      }}
    >
      {isResponsive && <FormAppBar openDialog={handleClickOpen} />}
      {!isResponsive && <ContactForm />}
      <ContactsList />
      <FormDialog
        open={isOpen}
        openDialog={handleClickOpen}
        closeDialog={handleClickClose}
      />
      {scrollValue > 15 && (
        <IconButton size="large" sx={{ position: 'fixed', bottom: 10 }}>
          <MoveUp sx={{ height: '54px', width: '54px' }} />
        </IconButton>
      )}
    </Container>
  );
};
