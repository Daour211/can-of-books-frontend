import React from 'react';
import Form from 'react-bootstrap/Form';
import Modal from 'react-bootstrap/Modal';
import Button from 'react-bootstrap/Button';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";;

// import Card from 'react-bootstrap/Card'


class AddBook extends React.Component {
    constructor(props) {
        super(props)
        this.state = {
            newBookName: '',
            newDescription: '',
            newImg: '',
            newStatus: '',
            // newBookData:{}
        }
    }

    updateBookName = (event) => {
        this.setState({
            newBookName: event.target.value
        })
        console.log(this.state.newBookName);
    }

    updateDescription = (event) => {
        this.setState({
            newDescription: event.target.value
        })
        console.log(this.state.newDescription);
    }

    updateImg = (event) => {
        this.setState({
            newImg: event.target.value
        })
        console.log(this.state.newImg);
    }

    updateStatus = (event) => {
        this.setState({
            newStatus: event.target.value
        })
        console.log(this.state.newStatus);
    }

    addingBook = async () => {

        const { user } = this.props.auth0;
        const bookData = {
            email: user.email,
            newBookName: this.state.newBookName,
            newDescription: this.state.newDescription,
            newImg: this.state.newImg,
            newStatus: this.state.newStatus,
        }
        // console.log(bookData);
        const newBook = await axios.post(`${process.env.REACT_APP_SERVER}/addbook`,bookData)
        console.log(newBook.data.books);
        this.props.updateBookData(newBook.data.books);
        this.props.hideModal();

    }
    
    

    render() {
        return (
            <div>


                <Modal show={this.props.displayModal} onHide={this.props.hideModal} >
                    <Modal.Header closeButton>
                        <Modal.Title>Add Book  To Favorites</Modal.Title>
                    </Modal.Header>
                    <Modal.Body>
                        <Form>
                            <Form.Group className="mb-3" controlId="formBasicEmail">
                                <Form.Label>Books Name</Form.Label>
                                <Form.Control type="text" placeholder="Enter book name" onChange={this.updateBookName} />

                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicPassword">
                                <Form.Label>Book Description</Form.Label>
                                <Form.Control type="text" placeholder="book description" onChange={this.updateDescription} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label>Book Img</Form.Label>
                                <Form.Control type="text" label="book image" onChange={this.updateImg} />
                            </Form.Group>

                            <Form.Group className="mb-3" controlId="formBasicCheckbox">
                                <Form.Label>Status</Form.Label>
                                <Form.Control type="text" label="book status" onChange={this.updateStatus} />
                            </Form.Group>

                        </Form>

                    </Modal.Body>
                    <Modal.Footer>
                        <Button variant="secondary" onClick={this.props.hideModal}>
                            Close
                       </Button>
                        <Button variant="primary" onClick={this.addingBook}>
                            Add Book
                         </Button>
                    </Modal.Footer>
                </Modal>



            </div>
        )
    }
}

export default withAuth0(AddBook);