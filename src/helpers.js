
export const preparedValues = (fields) => {
  const { 'first name': firstName, 'last name': lastName, email} = fields;
  
  const fullName = `${!firstName ? '' : firstName[0].value} ${!lastName ? '' : lastName[0].value}`
  return {
    userFullName: fullName.trim(),
    userEmail: !email ? 'There is no information' : email[0].value,
  }
}

export const getPreparedFields = (data) => {
  const {firstName, lastName, email} = data;

  const firstNameValue = {
    value: firstName,
    modifier: '',
    label: 'first name',
  };

  const lastNameValue = {
    value: lastName,
    modifier: '',
    label: 'last name',
  };

  const emailValue = {
    value: email,
    modifier: '',
    label: 'email',
  };

   return {
    firstNameValue, lastNameValue, emailValue
   }
}