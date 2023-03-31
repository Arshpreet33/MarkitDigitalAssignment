import { useCallback, useEffect, useState } from 'react';
import Search from '../features/input-form/Search.component';
import QuoteDetails from '../features/quote-details/QuoteDetails.component';
import { Symbols } from '../utils/constants';
import getQuote from '../utils/quote';
import Spinner from '../utils/spinner/Spinner.component';
import { validateQuoteData } from '../utils/util';

/**
 * Home component
 * This is where the magic happens.
 * Getting API Data and displaying in child component.
 */
const Home = () => {
	const [symbol, setSymbol] = useState('');
	const [quote, setQuote] = useState('');
	const [isLoading, setIsLoading] = useState(false);

	// Used useCallback hook to memoize this callback function until Symbol is modified.
	const getQuoteData = useCallback(
		async (symbol) => {
			setIsLoading(true);

			try {
				const response = await getQuote(symbol);

				// Validate the data retreived from API and format it.
				const quoteData = validateQuoteData(response);
				setQuote(quoteData);
			} catch (error) {
				// log the error.
			} finally {
				setIsLoading(false);
			}
		},
		[symbol]
	);

	useEffect(() => {
		// To check if at the start of application, there is a list of given valid symbols
		// If yes, then get Quotes based on the first symbol in the list.
		if (Symbols.length > 0) {
			if (Symbols[0]) {
				getQuoteData(symbol ? symbol : Symbols[0]);
			}
		}

		return () => {};
	}, [getQuoteData]);

	// Setting state value received from child component.
	const handleSymbolSubmit = (currentSymbol) => setSymbol(currentSymbol);

	return (
		<div className='container' style={{ maxWidth: '540px' }}>
			<h1 className='py-4'>Welcome to Markit Digital</h1>
			<div className='row py-1'>
				<div className='col-sm-7 col-xs-12'>
					<Search handleFormSubmit={handleSymbolSubmit} />
				</div>
			</div>
			<hr />
			<div className='row py-1'>{isLoading ? <Spinner /> : <QuoteDetails quote={quote} />}</div>
		</div>
	);
};

export default Home;
