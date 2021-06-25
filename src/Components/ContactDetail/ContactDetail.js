import React from 'react';
import girl from '../../images/girl-user.png';
import {Link} from 'react-router-dom';

function ContactDetail(props) {

    console.log(props); 
    const { name, email } = props.location.state.contact; // => Lấy ra các thuộc tính, state từ đường dẫn

    return (
        <div className='main'>
            <div className='ui card centered'>
                <div className='image'> <img src={girl} alt='girl' /> </div>
                <div className='content'>
                    <div className='header'>{name}</div>
                    <div className='description'>{email}</div>
                </div>
            </div>
            <div className='center-div'>
                <Link to='/'>
                    <button className='ui button green center'>Back To List</button>
                </Link>
            </div>
        </div>
    )
}

export default ContactDetail
