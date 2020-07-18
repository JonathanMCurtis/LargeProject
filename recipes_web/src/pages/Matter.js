import React, { Component } from 'react';
import NavBar from '../components/NavBar';
import {
	Button,
	Nav,
	Col,
	Row,
	Tab
} from 'react-bootstrap';
import Subjects from '../data/Subjects.json';
import './styles.css';
// import the fuckin logos cus react memery
import {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb
} from 'react-icons/ai';

class Matter extends Component {
	// super cringe but i couldnt find a way to dynamically use icon tags so here we are
	renderIcon(iconName, color) {
		let size = 32;

		switch (iconName) {
			case 'Math' 				: return (<AiFillCalculator size = { size } color = { color } />);
			case 'Science' 				: return (<AiOutlineExperiment size = { size } color = { color } />);
			case 'Engineering' 			: return (<AiFillTool size = { size } color = { color } />);
			case 'Arts and Humanities' 	: return (<AiOutlineHighlight size = { size } color = { color } />);
			case 'Social Science' 		: return (<AiOutlineRead size = { size } color = { color } />);
			case 'Other' 				: return (<AiOutlineBulb size = { size } color = { color } />);
			default 					: return (<div></div>);
		}
	}

	// renders the text at the top
	renderWelcomeText () {
		return (
			<div className = "text-white text-center">
				<h2 className = "display-1">Search for topics below</h2>
				<p className = "lead">Or use the category tabs to find one instead</p>
			</div>
		);
	}

	// renders the subject tabs (and their subsequent categories)
	renderSubjects() {
		return (
			<Tab.Container id = "subject-tabs"
				defaultActiveKey = "none">
				<Col>
					<Row className = "justify-content-center">
						<Nav variant = "tabs" className = "flex-row justify-content-center testinglol">
							{
								Object.keys(Subjects).map(
									(item) => (
										<Nav.Item>
											<Nav.Link eventKey = { item }>
												<div className = "icon-art">
													<div class = "d-inline-flex p-2">
														<h1><b> { item } </b></h1>
														{ this.renderIcon(item, Subjects[item].color) }
													</div>

												</div>
											</Nav.Link>
										</Nav.Item>
									))
							}
						</Nav>
					</Row>
					{ /* These define the events upon clicking a tab (shows categories) */ }
					<Row sm = { 9 } className = "justify-content-center">
						<Tab.Content>
							{
								Object.keys(Subjects).map(
									(item) => (
										<Tab.Pane eventKey = { item }>
											{ this.renderCategory(Subjects[item]) }
										</Tab.Pane>
									))
							}
						</Tab.Content>
					</Row>
				</Col>
			</Tab.Container>
		);
	}

	// Creates buttons of each category in a subject
	renderCategory (obj) {
		if (obj != null) {
			return (
				<div className = "item-list top30">
					{
						obj.topics.map(
							// item is the category name (can also set button as submit type for search API)
							(item) => (
								<Button size = "lg" className = "mr-3"> { item } </Button>
							))
						// TODO: put buttons in a grid of sorts?
					}
				</div>
			);
		}
		else { return (<div> LOL ERROR IDIOT </div>) }
	}

	render () {
		return (
			<div id = "home-content" class = "">
				<NavBar></NavBar>
				{ this.renderWelcomeText() }
				{ /* Searchbox shit */ }
				<div className = "container h-100 px-md-20 shadow-sm">
					<div className = "row h-100 top30">
						<div className = "col-12 my-auto d-inline-flex">
							<input type = "text"
								placeholder = "Search.."
								className = "col-12 search-box">
							</input>
							<Button className = "row-1 search-btn btn-large">
								Search
							</Button>
						</div>
					</div>
				</div>

				{ /* Below are the subject tabs */ }
				<div className = "overlay text-center">
					{ this.renderSubjects() }
				</div>
			</div>

		);
	}
}

export default Matter;