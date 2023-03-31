import { Formik } from 'formik';
import { FieldLabel, FieldName, FieldErrorMessages, Symbols } from '../../utils/constants';
import { Typeahead } from 'react-bootstrap-typeahead';

/**
 * Search component
 * This component has 1 textbox inside a form.
 * Used Formik library to handle form data, submit & validation errors.
 * Used Bootstrap's Typeahead library to provide autocomplete functionality to the user.
 */
const Search = ({ handleFormSubmit }) => {
	return (
		<Formik
			initialValues={{ symbol: '' }}
			validate={(values) => {
				const errors = {};
				if (!values.symbol) {
					// Error Message - Symbol is required.
					errors.symbol = FieldErrorMessages.symbol_required;
				} else if (!Symbols.includes(values.symbol.toUpperCase())) {
					// Error Message - Symbol is not among the given list of valid Symbols.
					errors.symbol = FieldErrorMessages.symbol_not_found;
				}
				return errors;
			}}
			onSubmit={(values, { setSubmitting }) => {
				handleFormSubmit(values.symbol);
				setSubmitting(false);
			}}
		>
			{({ errors, touched, handleSubmit, setFieldValue, setFieldTouched }) => (
				<form onSubmit={handleSubmit}>
					<div className='input-group input-group-lg has-validation'>
						<Typeahead
							id={FieldName.symbol}
							className={errors.symbol && touched.symbol ? 'is-invalid' : ''}
							placeholder={FieldLabel.symbol}
							name={FieldName.symbol}
							options={Symbols}
							multiple={false}
							labelKey={FieldName.symbol}
							onChange={(selected) => {
								const value = selected.length > 0 ? selected[0] : '';
								setFieldValue('symbol', value);
							}}
							onInputChange={(text, event) => setFieldValue('symbol', text)}
							onBlur={(e) => setFieldTouched('symbol', true)}
						/>
						<button className='input-group-text' type='submit'>
							<i className='bi bi-search' />
						</button>
					</div>

					<span className='invalid-feedback' style={{ display: 'block' }}>
						{errors.symbol && touched.symbol && errors.symbol}
					</span>
				</form>
			)}
		</Formik>
	);
};

export default Search;
