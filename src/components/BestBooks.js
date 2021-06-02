import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
// import Carousel from 'react-bootstrap/Carousel'
import UpdateBook from './UpdateBook';
import Card from 'react-bootstrap/Card';
import CardGroup from 'react-bootstrap/Card';
import AddBook from './BookFormModal';
import Button from 'react-bootstrap/Button';



class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
           // server: process.env.REACT_APP_SERVER

            displayModal: false,
            displayUpdateModal: false,

            index: 0,
            bookName: '',
            bookDescription: '',
            imgURL: '',
            bookStatus: ''
        }
    }
    
    // for rendering all books
    componentDidMount = async () => {
        const { user } = this.props.auth0;
        // console.log('inside function');
        // console.log(user);
        let resultArray = await axios.get(`${process.env.REACT_APP_SERVER}/books?email=${user.email}`)
        console.log(resultArray);
        this.setState({
            bookData: resultArray.data
        })
        // console.log(this.state.bookData);
    }

    // for deleting book
    deleteBook = async (idx) => {
        let { user } = this.props.auth0;
          user = {email : user.email}
        // console.log(idx);
        const deleteBook = await axios.delete(`${process.env.REACT_APP_SERVER}/deleteBook/${idx}`,{ params: user })

        this.setState({
            bookData: deleteBook.data
        })
    }

    // this function to have the data after adding a book
    updateBookData = (e) => {
        this.setState({
            bookData: e
        })
    }

    // this function to show the modal of adding book
    showModal = async (e) => {

        this.setState({
            displayModal: true
        })

    }
     // this function to hide the modal of adding book and updating a book
    hideModal = async (e) => {

        this.setState({
            displayModal: false,
            displayUpdateModal: false
        })

    }

    // function to select the book that we want to update 
    showUpdatingForm = (idx)=>{
        let choosenBook = this.state.bookData.filter((val, index) => {
            return idx === index;
        })
        console.log(choosenBook);
        
        // this.state.choosenBook.push(choosenBook[0])
        // console.log(this.state.choosenBook);
        
        this.setState({
            displayUpdateModal: true,
            bookName: choosenBook[0].name,
            bookDescription: choosenBook[0].description,
            imgURL: choosenBook[0].imgURL,
            bookStatus: choosenBook[0].status,
            index: idx
        })
        console.log(this.state);
    }

    // for updating the book name
    updateBookName = (event) => {
        this.setState({
            bookName: event.target.value
        })
        // console.log(this.state.bookName);
    }
    // for updating the book description
    updateDescription = (event) => {
        this.setState({
            bookDescription: event.target.value
        })
        // console.log(this.state.bookDescription);
    }
    // for updating the book img URL
    updateImg = (event) => {
        this.setState({
            imgURL: event.target.value
        })
        // console.log(this.state.imgURL);
    }
    // for updating the book status
    updateStatus = (event) => {
        this.setState({
            bookStatus: event.target.value
        })
        // console.log(this.state.bookStatus);
    }

    // for send the request to update the book
    updatingBook = async (e) => {
        e.preventDefault()
        const { user } = this.props.auth0;
        const sentData = {
            bookName: this.state.bookName,
            bookDescription: this.state.bookDescription,
            imgURL: this.state.imgURL,
            bookStatus: this.state.bookStatus,
            email: user.email
        }

        let updatedBook = await axios.put(`${process.env.REACT_APP_SERVER}/updateBook/${this.state.index}`, sentData)
        console.log(updatedBook);

        this.setState({
            bookData: updatedBook.data.books,
            displayUpdateModal: false
        })
    }

    

    render() {
        return (
            <div>
                <button onClick={this.showModal}> Add Books</button>


                <AddBook 
                displayModal={this.state.displayModal} 
                hideModal={this.hideModal} 
                updateBookData={this.updateBookData} />

                <UpdateBook
                displayUpdateModal={this.state.displayUpdateModal}
                hideAddModal={this.hideAddModal}

                bookName={this.state.bookName}
                bookDescription={this.state.bookDescription}
                imgURL={this.state.imgURL}
                bookStatus={this.state.bookStatus}

                updateBookName={this.updateBookName}
                updateDescription={this.updateDescription}
                updateImg={this.updateImg}
                updateStatus={this.updateStatus}

                updatingBook={this.updatingBook} />

                {/* <Carousel> */}
                {this.state.bookData.length &&
                    this.state.bookData.map((item, idx) => {
                        return (

                            <CardGroup >
                                <Card style={{ width: '18rem' }} >
                                    <Card.Img variant="top" src={item.imgURL} />
                                    <Card.Body>
                                        <Card.Title>{item.name}</Card.Title>
                                        <Card.Text>

                                            <p>{item.description}</p>
                                            <p>{item.status}</p>

                                        </Card.Text>
                                        <Button onClick={() => this.deleteBook(idx)} variant="primary">Delete Book</Button>
                                        <Button onClick={() => this.showUpdatingForm(idx)} variant="primary">Update Book</Button>
                                    </Card.Body>
                                </Card>
                            </CardGroup>

                            // <Carousel.Item key={idx} interval={1000}>

                            //     <img
                            //         className="d-block w-100"
                            //         src={item.imgURL}
                            //         alt="First slide" width='100' height='200'
                            //     />
                            //     <Carousel.Caption>
                            //         {/* <h3> {item.name}</h3> */}
                            //         {/* <p>{item.description}</p> */}
                            //     </Carousel.Caption>
                            //     <h4> {item.name}</h4> 
                            //     <p>{item.description}</p>
                            // </Carousel.Item>
                        )
                    })
                }
                {/* </Carousel> */}
            </div>
        )
    }
}
export default withAuth0(BestBooks);