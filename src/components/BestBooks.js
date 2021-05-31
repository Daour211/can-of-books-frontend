import React from 'react';
import axios from 'axios';
import { useAuth0, withAuth0 } from "@auth0/auth0-react";
import Carousel from 'react-bootstrap/Carousel'
class BestBooks extends React.Component {
    constructor(props) {
        super(props);
        this.state = {
            bookData: [],
            // server: process.env.REACT_APP_SERVER
        }
    }
    componentDidMount = async () => {
        const { user } = this.props.auth0;
        console.log('inside function');
        console.log(user);
        let resultArray = await axios.get(`http://localhost:3001/books?email=${user.email}`)
        console.log(resultArray);
        this.setState({
            bookData: resultArray.data
        })
        console.log(this.state.bookData);
    }
    render() {
        return (
            <div>
                <Carousel>
                    {this.state.bookData.length &&
                        this.state.bookData.map((item, idx) => {
                            return (
                                <Carousel.Item key={idx} interval={1000}>

                                    <img
                                        className="d-block w-100"
                                        src={item.imgURL}
                                        alt="First slide" width='100' height='200'
                                    />
                                    <Carousel.Caption>
                                        {/* <h3> {item.name}</h3> */}
                                        {/* <p>{item.description}</p> */}
                                    </Carousel.Caption>
                                    <h4> {item.name}</h4> 
                                    <p>{item.description}</p>
                                </Carousel.Item>
                            )
                        })
                    }
                </Carousel>
            </div>
        )
    }
}
export default withAuth0(BestBooks);