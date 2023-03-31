import { FieldLabel, FieldName, FieldErrorMessages, Symbols } from '../../utils/constants';
import { Typeahead } from 'react-bootstrap-typeahead';
import { useState } from 'react';

/**
 * Search component
 * This component has 1 textbox inside a form.
 * Used Formik library to handle form data, submit & validation errors.
 * Used Bootstrap's Typeahead library to provide autocomplete functionality to the user.
 */
const Search = ({ handleFormSubmit }) => {
	const [errorMessage, setErrorMessage] = useState('');
	const [symbol, setSymbol] = useState('');

	const validateinput = () => {
		if (!symbol) {
			// Error Message - Symbol is required.
			setErrorMessage(FieldErrorMessages.symbol_required);
			return false;
		} else if (!Symbols.includes(symbol.toUpperCase())) {
			// Error Message - Symbol is not among the given list of valid Symbols.
			setErrorMessage(FieldErrorMessages.symbol_not_found);
			return false;
		}
		setErrorMessage('');
		return true;
	};

	const handleSubmit = (event) => {
		event.preventDefault();
		if (!validateinput()) return;
		handleFormSubmit(symbol);
	};

	const handleBlur = () => {
		validateinput();
	};

	const handleChange = (value) => {
		setSymbol(value);
	};

	return (
		<form onSubmit={handleSubmit}>
			<div className='input-group input-group-lg has-validation'>
				<Typeahead
					id={FieldName.symbol}
					className={errorMessage ? 'is-invalid' : ''}
					placeholder={FieldLabel.symbol}
					options={Symbols}
					multiple={false}
					labelKey={FieldName.symbol}
					onChange={(selected) => {
						const value = selected.length > 0 ? selected[0] : '';
						handleChange(value);
					}}
					onInputChange={(text, event) => handleChange(text)}
					onBlur={handleBlur}
				/>
				<button className='input-group-text' type='submit'>
					<i className='bi bi-search' />
				</button>
			</div>
			{errorMessage && (
				<span className='invalid-feedback' style={{ display: 'block' }}>
					{errorMessage}
				</span>
			)}
		</form>
	);
};

export default Search;
