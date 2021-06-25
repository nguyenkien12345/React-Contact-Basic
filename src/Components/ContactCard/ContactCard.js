import React from 'react'
// Link
import { Link } from 'react-router-dom';
// Image
import man from '../../images/man-user.png';

function ContactCard(props) {

    var { contact, onRemoveContact } = props;

    const onHandleRemoveContact = (id) => {
        if (onRemoveContact) {
            onRemoveContact(id);
        }
    }

    return (
        <div className='item'>
            <Link to={`/contact/${contact.id}`}>
                <img className='ui avatar image' src={man} alt='user' />
            </Link>
            <div className='content'>
                {/* Lưu ý (cái state: { contact: props.contact } phải ghi ik chang nếu không sẽ lỗi) (Thẻ Link phải bao toàn bộ thuộc tính) Để lấy được toàn bộ thuộc tính và trạng thái của router thì thay vì dùng mỗi {`/contact/${contact.id}` ta dùng như sau */}
                <Link to={{ pathname: `/contact/${contact.id}`, state: { contact: props.contact } }}> 
                    <div className='header'>{contact.name}</div>
                    <div>{contact.email}</div>
                </Link>
            </div>
            <i className='trash alternate outline icon' style={{ color: 'red', marginTop: '7px', marginRight: '10px'}} onClick={() => onHandleRemoveContact(contact.id)}></i>
            {/* Cách dùng như trên */}
            <Link to={{ pathname: '/edit', state: { contact: props.contact } }}> 
                <i className='edit alternate outline icon' style={{ color: 'blue', marginTop: '7px'}}></i>
            </Link>
        </div>
    )
}

export default ContactCard
