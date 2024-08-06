import { useMutation, useQuery, useQueryClient } from '@tanstack/react-query';
import {
  addContact,
  addTag,
  deleteContact,
  getAllContacts,
  getOneContact,
} from '../api';

export const useContactsListQuery = () => {
  return useQuery({
    queryKey: ['contacts'],
    queryFn: getAllContacts,
    select: (data) =>
      data.resources.filter((item) => item.record_type === 'person'),
  });
};

export const useOneContactQuery = (contactId) => {
  return useQuery({
    queryKey: ['contact', contactId],
    queryFn: () => getOneContact(contactId),
  });
};

export const useDeleteContactQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: deleteContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
    },
  });
};

export const useAddNewContactQuery = () => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: addContact,
    onSuccess: () => {
      queryClient.invalidateQueries(['contacts']);
    },
  });
};

export const useAddTagQuery = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: ({ contactId, tags }) => addTag(contactId, tags),
    onSuccess: () => {
      queryClient.invalidateQueries(['contact']);
    },
  });
};
