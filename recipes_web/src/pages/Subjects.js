import React, { Component } from 'react';
import Button from 'react-bootstrap/Button';
import Col from 'react-bootstrap/Col';
import Container from 'react-bootstrap/Container';
import Row from 'react-bootstrap/Row';
import Table from 'react-bootstrap/Table';
import NavBar from '../components/NavBar';
import Subjects from '../data/Subjects.json';
import {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb,
	AiOutlineSearch
} from 'react-icons/ai';

const Icons = {
	AiFillCalculator,
	AiOutlineExperiment,
	AiFillTool,
	AiOutlineHighlight,
	AiOutlineRead,
	AiOutlineBulb,
	AiOutlineSearch
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

			return <Icon size = { 30 }
						 style = {{
							 marginLeft: '10%'
						 }} />;
		};

		return (
			<div className = 'my-4 d-flex justify-content-center'>
				{
					Object.keys(Subjects).map(subject => (
						<Button
							className = 'ml-1 shadow'
							style = {{
								backgroundColor: Subjects[subject].color,
								border: 'none',
								textShadow: '2px 3px 3px #474747',
								padding: '1%',
								width: '15%'
							}}
							key = { subject }
							onClick = { () => this.setState({ active: subject }) }
						>
							<div >
								{ subject }
								{ Icon(Subjects[subject].icon) }
							</div>
						</Button>
					))
				}
			</div>
		);
	}

	renderTopics() {
		const { active } = this.state;

		// note: I tried subject.length, JS just doesnt let me...
		let len = Subjects[active] && Subjects[active].topics.length;
		let subject = Subjects[active] && Subjects[active].topics;
		const COLUMN = 3; // Change this for number of columns
		let i = 0;
		let temp = [];

		for (i = 0; i < len; i += COLUMN) {
			let part = subject.slice(i, i + COLUMN);

			temp.push(part);
		}

		let last = temp.pop();

		if (last === undefined)
			last = [];

		// We will render a table of buttons
		return (
			<>
				<Table
					bordless = 'true'
					className = 'm-0 d-flex justify-content-center'
					style = {{ tableLayout: 'fixed' }}>
					<tbody>
						{
							temp.map(sub => (
								<tr> {
									sub.map(topic => (
										<td>
											<Button style = {{
												backgroundColor: Subjects[active].color,
												border: 'none',
												textShadow: '2px 3px 3px #474747'
											}}>
												<h2 key = { topic }>{ topic }</h2>
											</Button>
										</td>
									))
								} </tr>
							))
						}
					</tbody>
				</Table>
				{ /* gotta do the last row separately for centering */ }
				<Table
					className = 'm-0 d-flex justify-content-center'
					style = {{ tableLayout: 'fixed' }}>
					<tbody><tr>
						{ last.map(topic => (
							<td>
								<Button style = {{
									backgroundColor: Subjects[active].color,
									border: 'none',
									textShadow: '2px 3px 3px #474747'
								}}
								onClick = ''>
									<h2 key = { topic }>{ topic }</h2>
								</Button>
							</td>
						))
						}
					</tr></tbody>
				</Table>
			</>
		);
	}

	render () {
		const { active } = this.state;

		return (
			<>
				<NavBar background = { (Subjects[active] && Subjects[active].color) || '' } />

				<Container className = 'subjects' fluid = 'true'>
					<h1> SEARCH FOR YO SHIT BITCH </h1>
					<div className = 'col-12 my-auto d-flex justify-content-center'>
						<input type = 'text' placeholder = 'Search...' className = 'rounded shadow-sm' />
						<Button className = 'shadow-sm'> <AiOutlineSearch /> </Button>
					</div>
						OR JUST USE THESE TABS IDK
					{ this.renderSubjects() }

					{ this.renderTopics() }

				</Container>
			</>
		);
	}
}