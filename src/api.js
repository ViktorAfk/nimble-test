import axios from "axios";
import { array } from "yup";

// const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const instance = axios.create({
  baseURL: '/api/',
  headers: {
     'Authorization': `Bearer ${TOKEN}`
  },
})

export const getAllContacts = async() => {
  try {
    const response = await instance.get('contacts', {params: {
      sort: 'created:desc',
    }})

    return response.data
  } catch (error) {
    console.error(`Oops, something went wrong ${error.message}`)
  }
}

export const getOneContact = async(contactId) => {
  try {
    const response = await instance.get(`contact/${contactId}`);
    return response.data;

  } catch (error) {
    console.error(`Oops, something went wrong ${error.message}`)
  }
}

export const addContact = async(newContact) => {
  try {
    const response = await instance.post('contact', newContact)
    return response.data
  } catch (error) {
    console.error(`Oops, something went wrong ${error.message}`)
  }
}

export const deleteContact = async(contactId) => {
  try {
    const response = await instance.delete(`contact/${contactId}`)
    return response.data
  } catch (error) {
    console.error(`Oops, something went wrong ${error.message}`)
  }
}
export const addTag = async (contactId, data) => {
  try {
    const response = await instance.put(`contacts/${contactId}/tags`, {tags: data})
    return response.data
  } catch (error) {
    console.error(`Oops, something went wrong ${error.message}`)
  }
  
}
