import { yupResolver } from '@hookform/resolvers/yup';
import { Box, Button, TextField } from '@mui/material';
import { useState } from 'react';
import { Controller, useForm } from 'react-hook-form';
import * as yup from 'yup';
import { useAddTagQuery } from '../queries/queries';

const tagSchema = yup
  .object({
    tag: yup.string().min(1).required(),
  })
  .required();

const setStyles = () => {
  return {
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
};

export const TagsForm = ({ currenTags, contactId }) => {
  const {
    control,
    handleSubmit,
    reset,
    clearErrors,

    formState: { errors },
  } = useForm({
    resolver: yupResolver(tagSchema),
    defaultValues: {
      tag: '',
    },
  });
  const { mutate: addTagToContact, isPending, isSuccess } = useAddTagQuery();
  const [isCreated, setIsCreated] = useState(isSuccess);

  const onHandleSubmit = handleSubmit(({ tag }) => {
    const preparedTags = currenTags ? currenTags.map(({ tag }) => tag) : [];
    const tags = [...preparedTags, tag];

    addTagToContact(
      { contactId, tags },
      {
        onSuccess: () => {
          reset();
          setIsCreated(isSuccess);
          setTimeout(() => {
            setIsCreated(false);
          }, 2000);
        },
      },
    );
  });
  return (
    <Box
      onSubmit={onHandleSubmit}
      component={'form'}
      sx={{
        display: 'flex',
        flexDirection: 'column',
        gap: '24px',
      }}
    >
      <Controller
        name="tag"
        control={control}
        render={({ field }) => (
          <TextField
            variant="outlined"
            helperText={errors.tag?.message}
            label={'Add tag'}
            {...field}
            sx={setStyles()}
          />
        )}
      />
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
        {isCreated ? 'Tag is added' : 'Add Tag'}
      </Button>
    </Box>
  );
};
