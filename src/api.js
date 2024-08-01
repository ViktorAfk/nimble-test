import axios from "axios";

// const API_URL = import.meta.env.VITE_API_URL;
const TOKEN = import.meta.env.VITE_TOKEN;

const instance = axios.create({
  baseURL: '/api/',
  sort: 'created:desc',
  headers: {
     'Authorization': `Bearer ${TOKEN}`
  },
})

export const getAllContacts = async() => {
  try {
    const response = await instance.get('contacts')
    console.log(response.data)
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
    const response = await instance.post(newContact)
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
