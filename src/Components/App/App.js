import React, { useState, useEffect } from 'react';
// Css
import './App.css';
// Random Id
import { uuid } from 'uuidv4';
// Router
import { BrowserRouter as Router, Route, Switch } from 'react-router-dom';
// Component
import Header from '../Header/Header';
import AddContact from '../AddContact/AddContact';
import ContactList from '../ContactList/ContactList';
import ContactDetail from '../ContactDetail/ContactDetail'; 
import UpdateContact from '../UpdateContact/UpdateContact'; 
// Apis
import ApiContacts from '../../api/ApiContacts';

function App(props) {

  const [contacts, setContacts] = useState([]);

  const [seatchTerm, setSearchTerrm] = useState('');

  const [searchResults, setsearchResults] = useState([]);

  // Get Contacts
  const retriveContacts = async () => {
    const response = await ApiContacts.get('/contacts');
    return response.data;
  }

  // Add Contact
  const addContact = async (contact) => {
    // {id: uuid() -> tạo id tự động,  ...contact -> các thuộc tính, dữ liệu lấy được từ bên form (...contact)
    const request =  { 
      id: uuid(), 
      ...contact 
    }
    const response = await ApiContacts.post('/contacts', request)
    setContacts([...contacts,response.data]);
  };

  // Update Product
  const updateContact = async (contact) => {
    const response = await ApiContacts.put(`/contacts/${contact.id}`, contact);
    const  {id, name, email} =  response.data;
    setContacts(contacts.map(contact => {
      return contact.id === id ? {...response.data} : contact; // Trả về đối tượng mới ngược lại trả về đối tượng cũ
    }))
  }

  // Remove Contact
  const removeContact = async (id) => {
    // insert, update, get có phản hồi (dữ liệu trả về), còn delete thì không mà nó chỉ có trạng thái thành công hoặc thất bại 
    await ApiContacts.delete(`/contacts/${id}`);
    const newContactList = contacts.filter(contact => { return contact.id !== id });
    setContacts(newContactList);
  }

  const onChangeValue = (searchTerm) => {
    setSearchTerrm(searchTerm);
    if(searchTerm !== ''){
      const newContactList = contacts.filter(contact => {
        return Object.values(contact).join('').toLowerCase().includes(searchTerm.toLowerCase());
      });
      setsearchResults(newContactList);
    }
    else{
      setsearchResults(contacts);
    }
  }

  useEffect(() => {
    // Tương tác với LocalStorage
    // const retriveContacts = JSON.parse(localStorage.getItem('contacts'));
    // if (retriveContacts) {
    //   setContacts(retriveContacts);
    // };

    // Tương tác với API
    const getAllContacts = async () => {
      const allContacts = await retriveContacts();
      if(allContacts){
        setContacts(allContacts);
      }
    }

    getAllContacts();
  }, []);

  // useEffect(() => {
  //   localStorage.setItem('contacts', JSON.stringify(contacts));
  // }, [contacts]);

  return (
    <Router>
      <div className='ui container'>
        <Switch>
          <Route
            path='/' exact
            //// Cách 1: Không nên sử dụng 
            // component={() => <ContactList contacts={contacts} removeContact={removeContact}/>} 
            //// Cách 2
            render={(props) => (
              <ContactList
                {...props}
                contacts={seatchTerm.length < 1 ? contacts : searchResults}
                removeContact={removeContact}
                seatchTerm={seatchTerm}
                onChangeValue={onChangeValue}
              />
            )}
          />
          <Route
            path='/add'
            //// Cách 1: Không nên sử dụng 
            // component={() => <AddContact addContact={addContact}/>} 
            //// Cách 2
            render={(props) => (
              <AddContact
                {...props}
                addContact={addContact}
              />
            )}
          />
          <Route
            path='/edit'
            render={(props) => (
              <UpdateContact
                {...props}
                updateContact={updateContact}
              />
            )}
          />
          <Route
            path='/contact/:id'
            render={(props) => (
              <ContactDetail
                {...props}
              />
            )}
          />
        </Switch>
        <Header />
      </div>
    </Router>

  );
}

export default App;
