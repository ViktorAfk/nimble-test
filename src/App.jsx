import { Container } from '@mui/material';
import { ContactsList } from './components/ContactsList';

export const App = () => {
  return (
    <Container maxWidth="lg">
      <h1>Hello It is me</h1>
      <ContactsList />
    </Container>
  );
};
