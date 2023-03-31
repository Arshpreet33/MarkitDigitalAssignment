// This is the list of given Symbols that the user is restricted to.
// In future this list can be extracted from a file or from an endpoint.
export const Symbols = [
	'MSFT',
	'AAPL',
	'INFO',
	'BRKA',
	'F',
	'PLT',
	'BIG',
	'TWX',
	'AME',
	'JWN',
	'CVS',
	'MS',
	'MET',
];

// Constants below are used in the Input Form.
export const FieldLabel = {
	symbol: 'Symbol Lookup',
};

export const FieldName = {
	symbol: 'symbol',
};

// Error messages can be customized here.
export const FieldErrorMessages = {
	symbol_required: 'Symbol Name is required!',
	symbol_not_found: 'Symbol not found. Please enter a valid Symbol Name like "MSFT", "AAPL", etc.',
};
