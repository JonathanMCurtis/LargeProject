import React, { Component } from 'react';
import Container from 'react-bootstrap/Container';
import page from '../data/images/page.png';
import { FaArrowLeft } from 'react-icons/fa';
import Row from 'react-bootstrap/Row';
import Col from 'react-bootstrap/Col';

class App extends Component {
	render() {
		return (
			<Container fluid = 'md' className = 'd-flex align-items-start flex-column'
				style = {{ border: '1px solid #cecece', width: '30%' }}>
				<h2>Error 404!</h2>
				<Row around='xs'>
                    <Col style = {{ border: '1px solid #cecece', width: '40%' }}>
                        <h4>Sorry, the page you are looking for is not found and we could not find it either!</h4>
                        <p><a href = { '#' } ><FaArrowLeft /> Return home</a></p></Col>
                    <Col><img src = { page } alt = 'Page' width = '50%' height = '50%' /></Col>
                </Row>
			</Container>
		);
	}
}

export default App;