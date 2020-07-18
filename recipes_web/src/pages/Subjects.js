import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Row from 'react-bootstrap/Row';
import NavBar from '../components/NavBar';
import Subjects from '../data/Subjects.json';
import {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb
} from 'react-icons/ai';

const Icons = {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb
};

export default class Topics extends Component {
	constructor(props) {
		super(props);

		this.state = { active: '' };
	}
	renderWelcomeText () {
		return (
			<div className = 'text-white text-center'>
				<h2 className = 'display-1'>Search for topics below</h2>
				<p className = 'lead'>Or use the subject tabs to find one instead</p>
			</div>
		);
	}

	renderSubjects() {
		// let Icon = Icons['AiFillCalculator']

		const Icon = name => {
			let Icon = Icons[name];

			return <Icon size = { 30 } />;
		};

		return (
			Object.keys(Subjects).map(subject => (
				<Button
					style = {{ backgroundColor: Subjects[subject].color, border: 'none' }}
					key = { subject }
					onClick = { () => this.setState({ active: subject }) }
				>
					<Row>
						<Col>
							{ subject }
						</Col>
						<Col>
							{ Icon(Subjects[subject].icon) }
						</Col>
					</Row>
				</Button>
			))
		);
	}

	renderTopics() {
		const { active } = this.state;

		return (
			Subjects[active] && Subjects[active].topics.map(topic => (
				<h2 key = { topic }>{ topic }</h2>
			))
		);
	}

	render () {
		const { active } = this.state;

		return (
			<>
				<NavBar background = { (Subjects[active] && Subjects[active].color) || '' } />
				<div className = 'col-12 my-auto '>
					<input type = 'text' placeholder = 'Search...' />
					<Button>Search</Button>
				</div>
				{ this.renderSubjects() }
				{ this.renderTopics() }
			</>
		);
	}
}