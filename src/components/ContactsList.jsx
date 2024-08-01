import { Box, CircularProgress, Typography } from '@mui/material';
import { useContactsListQuery } from '../queries/queries';
import { ContactCard } from './ContactCard';

export const ContactsList = () => {
  const { data, isLoading, isError, error } = useContactsListQuery();
  return (
    <Box component="section">
      <Typography
        fontSize="20px"
        variant="h2"
        component="h2"
        sx={{
          marginBottom: '5px',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Contacts
      </Typography>
      {isLoading && <CircularProgress />}
      {!isLoading && isError && <p>{error.message}</p>}
      {!isLoading &&
        !isError &&
        data.map((contact) => (
          <Box
            key={contact.id}
            sx={{
              marginBottom: '20px',
            }}
          >
            <ContactCard contact={contact} />
          </Box>
        ))}
    </Box>
  );
};
