import React, {useRef} from 'react';
// Component
import ContactCard from '../ContactCard/ContactCard';
// Link
import { Link } from 'react-router-dom';

function ContactList(props) {

    var { contacts, removeContact, searchTerm, onChangeValue } = props;

    const inputEle = useRef('');

    const onRemoveContact = (id) => {
        if (removeContact) {
            removeContact(id);
        }
    }

    const getSearchTerm = () => {
        if(onChangeValue){
            onChangeValue(inputEle.current.value); // Lấy dữ liệu ta nhập vào input (không khác gì e.target.value)
        }
    }

    const renderContactList = contacts.map((contact, index) => {
        return (
            <ContactCard key={index} contact={contact} onRemoveContact={onRemoveContact} />
        )
    })

    return (
        <div className='main'>
            <h2>
                Contact List
                <Link to='/add'>
                    <button className='ui button blue' style={{marginLeft: '800px'}}>ADD</button>
                </Link>
            </h2>
            <div className='ui search'>
                <div className='ui icon input'>
                    <input 
                        type='text' 
                        placeholder='Search Contacts' 
                        className='prompt' 
                        ref={inputEle}
                        value={searchTerm} 
                        onChange={getSearchTerm}
                    />
                    <i className='search icon'></i>
                </div>
            </div>
            <div className='ui celled list'>
                {renderContactList.length > 0 ? renderContactList : "Not Found"}
            </div>
        </div>
    )
}

export default ContactList
