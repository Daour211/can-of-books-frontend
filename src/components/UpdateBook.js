import React, { Component } from 'react'
import Form from 'react-bootstrap/Form'
import Modal from 'react-bootstrap/Modal'
import Button from 'react-bootstrap/Button'



class UpdateBook extends Component {

    render() {
        return (

            <Modal show={this.props.displayUpdateModal} onHide={this.props.hideAddModal} >
                <Modal.Header closeButton>
                    <Modal.Title>Update Book</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Form>

                        <Form.Group className="mb-3" controlId="formBasicEmail">
                            <Form.Label>Books Name</Form.Label>
                            <Form.Control value={this.props.bookName} type="text" onChange={(e) => this.props.updateBookName(e)} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicPassword">
                            <Form.Label>Book Description</Form.Label>
                            <Form.Control value={this.props.bookDescription} type="text" onChange={(e) => this.props.updateDescription(e)} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Book Img</Form.Label>
                            <Form.Control value={this.props.imgURL} type="text" label="book image" onChange={(e) => this.props.updateImg(e)} />
                        </Form.Group>


                        <Form.Group className="mb-3" controlId="formBasicCheckbox">
                            <Form.Label>Status</Form.Label>
                            <Form.Control value={this.props.bookStatus} type="text" label="book status" onChange={(e) => this.props.updateStatus(e)} />
                        </Form.Group>

                    </Form>

                </Modal.Body>

                <Modal.Footer>
                    <Button variant="secondary" onClick={this.props.hideAddModal}>
                        Close
               </Button>
                    <Button variant="primary" onClick={this.props.updatingBook}>
                        Update Book
                 </Button>
                </Modal.Footer>
            </Modal>

        )
    }
}

export default UpdateBook