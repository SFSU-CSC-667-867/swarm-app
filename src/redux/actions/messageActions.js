import axios from 'axios';

export const updateMessages = messages => {
  return {
    type: 'UPDATE_MESSAGES',
    messages,
  };
};

export const insertMessage = message => {
  console.log('inserting message')
  return {
    type: 'INSERT_MESSAGE',
    message,
  };
};

export const handlTextChange = text => {
  return {
    type: 'UPDATE_TEXT',
    text,
  };
};

export const submitMessage = () => (dispatch, getState) => {
  axios.post('/messanger/postMessage', { message: getState().messageReducer.text })
    .then(() => { })
    .catch(e => console.log(e));
  dispatch(handlTextChange(''));
};