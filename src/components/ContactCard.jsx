import DeleteIcon from '@mui/icons-material/Delete';
import {
  Box,
  Card,
  CardContent,
  CardMedia,
  IconButton,
  Typography,
} from '@mui/material';
import { Link } from 'react-router-dom';
import { useDeleteContactQuery } from '../queries/queries';

export const ContactCard = ({ contact }) => {
  const { fields, tags, id } = contact;
  const { mutate: removeContact } = useDeleteContactQuery(id);
  return (
    <Link
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
          position: 'relative',
          paddingBlock: '14px 25px',
          paddingInline: '15px 46px',
        }}
      >
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
        <CardMedia
          sx={{
            flexBasis: '58px',
            height: '58px',
            display: 'flex',
            justifyContent: 'center',
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
            flex: 3,
          }}
        >
          <Typography component="div">
            <Typography component={'h2'} fontWeight={'bold'}>
              {`${fields['first name'][0]?.value || ''} ${fields['last name'][0].value || ''}`}
            </Typography>
            <Link underline="hover" color="black">
              {fields.email[0].value}
            </Link>
          </Typography>
          <Typography component="div">
            <Typography
              sx={{ display: 'flex', flexWrap: 'wrap' }}
              component={'div'}
              gap={2}
            >
              {tags.length === 0 ? (
                <Typography> There no tags</Typography>
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
  );
};
