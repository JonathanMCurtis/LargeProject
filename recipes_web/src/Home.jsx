import React, { Component } from 'react';
import  NavigationBar  from "./components/NavigationBar";
import { Login } from "./components/Forms";
import { Signup } from "./components/Forms";
import  Button  from "react-bootstrap/Button";
import Modal from "react-bootstrap/Modal";

class Home extends Component {    
    constructor (props) {
        super(props)
        this.state = { visible: false }
    }

    // Render functions for the modal forms

    renderLoginModal () {
        return (
            <Modal centered id="login" show = { this.state.visible }
                onHide = { () => this.setState({visible: false}) }
            >
                <Modal.Header closeButton>
                    <Modal.Title>Please log into your account:</Modal.Title>
                </Modal.Header>

                <Modal.Body>
                    <Login />
                </Modal.Body>

                <Modal.Footer>
                    <Button variant="success">Login</Button>
                </Modal.Footer>
            </Modal>
        );
    }

    returnSignupModal () {
        return (
            <Modal centered id="signup" show = { this.state.visible }
            onHide = { () => this.setState({visible: false}) }
        >
            <Modal.Header closeButton>
                <Modal.Title>Please log into your account:</Modal.Title>
            </Modal.Header>

            <Modal.Body>
                <Signup />
            </Modal.Body>

            <Modal.Footer>
                <Button variant="success">Sign Up</Button>
            </Modal.Footer>
        </Modal>
        );
    }


    renderWelcomeText () {
        return (
            <div className="text-white text-center mt-5">
                <h1 className="display-1">Welcome to Project Recipe!</h1>
                <p className="lead">A place to find new recipes and share your own with others!</p>
            </div>
        );
    }

    render () {
        return (
            <div>
                <NavigationBar />
                { this.renderLoginModal() }
                {/* { this.renderSignupModal() } */}
                { this.renderWelcomeText() }

                <div className="d-flex justify-content-center">
                    <Button className="mr-2" 
                            variant="primary" 
                            size="lg"
                            onClick={ () => this.setState({visible:true}) }>Login
                    </Button>
                    <Button variant="secondary" 
                            size="lg"
                            onClick="">Sign Up
                    </Button>
            </div>
            </div>
        );
    }
  }
  
  export default Home;