import React from 'react';
import Table from 'react-bootstrap/Table';

export const CodeInput = props => {
	const { numInputs, onSubmit, style } = props;
	const elemRefs = [];
	const code = [];

	const autoTab = event => {
		const BACKSPACE_KEY = 8;
		const DELETE_KEY = 46;
		const ENTER_KEY = 13;
		const maxLength = elemRefs.length;

		let tabIndex = Number(event.target.getAttribute('index') || 0);
		let elem;

		if (event.keyCode === BACKSPACE_KEY) {
			elem = tabIndex > 0 && elemRefs[(code.length === maxLength && tabIndex) || tabIndex - 1];
			code.pop();
		}
		else if (event.keyCode === ENTER_KEY) {
			onSubmit && onSubmit(code.toString());
		}
		else if (event.keyCode !== DELETE_KEY) {
			elem = tabIndex < maxLength - 1 && elemRefs[tabIndex + 1];
			if (code.length < maxLength) code.push(elemRefs[tabIndex].current.value);
		}

		if (elem) {
			elem.current.focus();
			if (code.length < maxLength) elem.current.value = '';
		}
	};

	const Input = props => {
		const ref = React.createRef();

		elemRefs.push(ref);

		return (
			<input
				className = 'block'
				index = { props.index }
				ref = { ref }
				maxLength = { 1 }
				onKeyUp = { autoTab }
			/>
		);
	};

	return (
		<Table>
			<tr>
				{ [...Array(numInputs).keys()].map(index => {
					return (
						<td>
							<Input className = { style } key = { index } index = { index } />
						</td>
					);
				}) }
			</tr>
		</Table>
	);
};