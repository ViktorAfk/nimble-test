import { useParams } from 'react-router-dom';
import { useOneContactQuery } from '../queries/queries';

export const ContactPage = () => {
  const { contactId } = useParams();
  const { data: contact } = useOneContactQuery(contactId);
  console.log(contact);
  return <div>{'hello'}</div>;
};
