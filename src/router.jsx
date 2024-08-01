import { createHashRouter } from 'react-router-dom';
import { App } from './App';
import { ContactPage } from './routes/ContactPage';

export const router = createHashRouter([
  {
    path: '/',
    element: <App />,
  },
  {
    path: 'contact/:contactId',
    element: <ContactPage />,
  },
]);
