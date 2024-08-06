import {
  Box,
  Card,
  CardMedia,
  Container,
  Link,
  Typography,
} from '@mui/material';
import { useParams } from 'react-router-dom';
import { Loader } from '../components/Loader';
import { TagsForm } from '../components/TagsForm';
import { preparedValues } from '../helpers';
import { useOneContactQuery } from '../queries/queries';

export const ContactPage = () => {
  const { contactId } = useParams();
  const { data, isError, isLoading } = useOneContactQuery(contactId);

  if (isLoading) {
    return <Loader />;
  }
  const { fields, tags } = data.resources[0];
  const { userEmail, userFullName } = preparedValues(fields);

  return (
    <Container maxWidth="md">
      <Card variant="outlined" sx={{ height: '100dvh', padding: '22px' }}>
        <Box
          sx={{
            display: 'flex',
            gap: '12px',
            alignItems: 'center',
            marginBottom: '26px',
          }}
        >
          <CardMedia
            sx={{
              height: '78px',
              display: 'flex',
              justifyContent: 'center',
              flexBasis: '78px',
            }}
            image="contact_page_icon.svg"
            title="contact photo"
            component={'div'}
          />
          <Typography
            component="div"
            sx={{
              display: 'flex',
              alignItems: 'center',
              flexDirection: 'column',
            }}
          >
            <Typography component={'h2'} fontWeight={'bold'}>
              {userFullName}
            </Typography>
            <Link underline="hover" color="black">
              {userEmail}
            </Link>
          </Typography>
        </Box>
        <Typography component={'div'} marginBottom={'36px'}>
          <Typography
            variant="h3"
            component={'h3'}
            sx={{
              fontSize: '16px',
              marginBottom: '12px',
              color: 'black',
              fontWeight: 'bold',
            }}
          >
            Tags
          </Typography>
          <Typography
            sx={{
              display: 'flex',
              flexWrap: 'wrap',
              width: '100%',
              marginBottom: '36px',
            }}
            component={'div'}
            gap={2}
          >
            {tags.length === 0 || !tags ? (
              <Typography>There are no tags</Typography>
            ) : (
              tags.map(({ id, tag }) => (
                <Box
                  item
                  sx={{
                    backgroundColor: '#A6A6A6',
                    padding: '10px',
                    borderRadius: '2px',
                  }}
                  key={id}
                >
                  <Typography textAlign={'center'}>{tag}</Typography>
                </Box>
              ))
            )}
          </Typography>
        </Typography>
        <TagsForm currenTags={tags} contactId={contactId} />
      </Card>
    </Container>
  );
};
