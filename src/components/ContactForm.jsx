import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField, Typography } from '@mui/material';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { getPreparedFields } from '../helpers';
import { useAddNewContactQuery } from '../queries/queries';

const record = {
  record_type: 'person',
  privacy: {
    edit: null,
    read: null,
  },
  owner_id: null,
};

const helperTextStyle = {
  '& .MuiFormHelperText-root': {
    position: 'absolute',
    bottom: '-1.5rem',
    marginInline: 'auto',
    right: 0,
    left: 0,
    textAlign: 'center',
    color: 'red',
  },
};

const userSchema = yup
  .object({
    firstName: yup.string().required().min(1),
    lastName: yup
      .string()
      .trim()
      .when('firstName', ([firstName], schema) => {
        return !firstName ? schema.required() : schema;
      }),
    email: yup.string().email().trim().required(),
  })
  .required();

export const ContactForm = ({ matches }) => {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,
    formState: { errors },
  } = useForm({
    defaultValues: {
      firstName: '',
      lastName: '',
      email: '',
    },
    resolver: yupResolver(userSchema),
  });

  const {
    mutate: addNewContact,
    isPending,
    isSuccess,
  } = useAddNewContactQuery();

  const onHandleSubmit = handleSubmit(({ firstName, lastName, email }) => {
    const { firstNameValue, lastNameValue, emailValue } = getPreparedFields({
      firstName,
      lastName,
      email,
    });
    const value = {
      ...record,
      fields: {
        'first name': firstName ? [firstNameValue] : [],
        'last name': lastName ? [lastNameValue] : [],
        email: email ? [emailValue] : [],
      },
    };

    addNewContact(value, {
      onSuccess: () => {
        reset();
      },
    });
  });

  return (
    <Box display={matches ? 'none' : ''} component={'section'} flex={2}>
      <Typography
        variant="h2"
        fontSize="20px"
        component={'h2'}
        sx={{
          color: 'black',
          marginBottom: '28px',
          fontWeight: 'bold',
        }}
      >
        Create Contact
      </Typography>
      <Box
        component={'form'}
        onSubmit={onHandleSubmit}
        sx={{
          display: 'flex',
          flexDirection: 'column',
        }}
      >
        <Box
          component={'div'}
          sx={{
            display: 'flex',
            flexDirection: 'column',
            gap: '36px',
            marginBottom: '36px',
          }}
        >
          <Controller
            name="firstName"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                helperText={errors.firstName?.message}
                label={'First Name'}
                {...field}
                sx={helperTextStyle}
              />
            )}
          />
          <Controller
            name="lastName"
            control={control}
            render={({ field }) => (
              <>
                <TextField
                  variant="outlined"
                  sx={helperTextStyle}
                  label={'Last Name'}
                  helperText={errors.lastName?.message}
                  {...field}
                />
              </>
            )}
          />
          <Controller
            name="email"
            control={control}
            render={({ field }) => (
              <TextField
                variant="outlined"
                sx={helperTextStyle}
                helperText={errors.email?.message}
                label={'Email'}
                {...field}
              />
            )}
          />
        </Box>
        <Button
          onClick={() =>
            setTimeout(() => {
              clearErrors();
            }, 3000)
          }
          type="submit"
          size="large"
          variant="outlined"
          sx={{ color: 'black', border: ' 1px solid #AAAAAA' }}
          disabled={isPending}
        >
          {isSuccess ? 'Contact created' : 'Add Contact'}
        </Button>
      </Box>
    </Box>
  );
};
