import { Box, Typography } from '@mui/material';
import { useContactsListQuery } from '../queries/queries';
import { ContactCard } from './ContactCard';
import { Loader } from './Loader';

export const ContactsList = () => {
  const { data, isLoading, isError, error } = useContactsListQuery();
  return (
    <Box component="section" flex={3}>
      <Typography
        fontSize="20px"
        variant="h2"
        component="h2"
        sx={{
          marginBottom: '28px',
          color: 'black',
          fontWeight: 'bold',
        }}
      >
        Contacts
      </Typography>
      {isLoading && <Loader />}
      {!isLoading && isError && <p>{error.message}</p>}
      {!isLoading &&
        !isError &&
        data.map((contact) => (
          <ContactCard contact={contact} key={contact.id} />
        ))}
    </Box>
  );
};
