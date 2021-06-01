import React from 'react';
import axios from 'axios';
import { withAuth0 } from "@auth0/auth0-react";
// import Carousel from 'react-bootstrap/Carousel'
import Card from 'react-bootstrap/Card'
import CardGroup from 'react-bootstrap/Card'
import AddBook from './BookFormModal';
import Button from 'react-bootstrap/Button'
// import { CardDeck } from 'react-bootstrap';


class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            displayModal: false,

            // server: process.env.REACT_APP_SERVER
        }
    }
    componentDidMount = async () => {
        const { user } = this.props.auth0;
        // console.log('inside function');
        // console.log(user);
        let resultArray = await axios.get(`http://localhost:3001/books?email=${user.email}`)
        console.log(resultArray);
        this.setState({
            bookData: resultArray.data
        })
        // console.log(this.state.bookData);
    }

    deleteBook = async (idx) => {
        let { user } = this.props.auth0;
          user = {email : user.email}
        // console.log(idx);
        const deleteBook = await axios.delete(`http://localhost:3001/deleteBook/${idx}`,{ params: user })

        this.setState({
            bookData: deleteBook.data
        })
    }
    updateBookData = (e) => {
        this.setState({
            bookData: e
        })
    }

    showModal = async (e) => {

        this.setState({
            displayModal: true
        })

    }
    hideModal = async (e) => {

        this.setState({
            displayModal: false
        })

    }

    render() {
        return (
            <div>
                <button onClick={this.showModal}> Add Books</button>


                <AddBook displayModal={this.state.displayModal} hideModal={this.hideModal} updateBookData={this.updateBookData} />

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