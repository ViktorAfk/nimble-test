import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Link,
  Typography,
} from '@mui/material';
import { Link as RouterLink } from 'react-router-dom';
import { preparedValues } from '../helpers';
import { useDeleteContactQuery } from '../queries/queries';
import { Loader } from './Loader';

export const ContactCard = ({ contact }) => {
  const { fields, tags, id } = contact;
  const { mutate: removeContact, isPending } = useDeleteContactQuery(id);

  const { userFullName, userEmail } = preparedValues(fields);

  return (
    <Box
      sx={{
        marginBottom: '20px',
        position: 'relative',
        opacity: isPending ? 0.5 : 1,
      }}
    >
      {isPending && <Loader isPending={isPending} />}
      <IconButton
        sx={{
          position: 'absolute',
          right: 5,
          zIndex: 100,
        }}
        aria-label="delete"
        onClick={() => removeContact(id)}
      >
        <DeleteIcon />
      </IconButton>
      <Link
        component={RouterLink}
        to={`contact/${id}`}
        underline="none"
        sx={{ width: '100%', display: 'block' }}
      >
        <Card
          variant="outlined"
          sx={{
            display: 'flex',
            minHeight: '150px',
            backgroundColor: '#EDEDED',
            paddingBlock: '14px 25px',
            paddingInline: '15px 46px',
            maxHeight: '250px',
            overflowY: 'scroll',
          }}
        >
          <CardMedia
            sx={{
              height: '58px',
              display: 'flex',
              justifyContent: 'center',
              flexBasis: '58px',
            }}
            image="account_icon.svg"
            title="account photo"
            component={'div'}
          />
          <CardContent
            sx={{
              display: 'flex',
              flexDirection: 'column',
              gap: '18px',
              flex: 1,
            }}
          >
            <Typography component="div">
              <Typography component={'h2'} fontWeight={'bold'}>
                {userFullName}
              </Typography>
              <Link underline="hover" color="black">
                {userEmail}
              </Link>
            </Typography>
            <Typography sx={{ justifyItems: 'self-end' }} component="div">
              <Typography
                sx={{ display: 'flex', flexWrap: 'wrap', width: '100%' }}
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
          </CardContent>
        </Card>
      </Link>
    </Box>
  );
};
