import React, { Component } from 'react'

export class UpdateContact extends Component {

    constructor(props){
        super(props);
        const { id, name, email } = props.location.state.contact; // => Lấy ra các thuộc tính, state từ đường dẫn
        this.state = {
            id: id,
            name: name,
            email: email
        }
    }

    update = (e) => {
        e.preventDefault();
        if(this.state.name === '' && this.state.email === ''){
            alert('Name and Email cannot be empty !!!');
            return;
        }
        this.props.updateContact(this.state);
        this.setState({
            name: '',
            email: ''
        })
        // console.log(this.props); => DEBUG
        this.props.history.push('/');
    }

    render() {
        return (
            <div className='ui main'>
                <h2>Update Contact</h2>
                <form className='ui form' onSubmit={this.update}>
                    <div className='field'>
                        <label>Name</label>
                        <input type='text' name='name' placeholder='Enter Your Name: ' value={this.state.name} onChange={(e) => this.setState({name: e.target.value})}/>
                    </div>
                    <div className='field'>
                        <label>Email</label>
                        <input type='email' name='email' placeholder='Enter Your Email: ' value={this.state.email} onChange={(e) => this.setState({email: e.target.value})}/>
                    </div>
                    <button className='ui button blue'>Update</button>
                </form>
            </div>
        )
    }
}

export default UpdateContact
