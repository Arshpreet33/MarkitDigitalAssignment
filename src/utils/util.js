/**
 * Currency round up
 * To convert large currency to smaller number by appending appropriate letter at the end.
 * K - thousand, M - Million, B - Billion
 */
const currencySystemRoundup = (input) => {
	const validInput = parseFloat(input);
	return Math.abs(Number(validInput)) >= 1.0e9
		? (Math.abs(Number(validInput)) / 1.0e9).toFixed(1) + 'B'
		: Math.abs(Number(validInput)) >= 1.0e6
		? (Math.abs(Number(validInput)) / 1.0e6).toFixed(1) + 'M'
		: Math.abs(Number(validInput)) >= 1.0e3
		? (Math.abs(Number(validInput)) / 1.0e3).toFixed(1) + 'K'
		: Math.abs(Number(validInput));
};

/**
 * International Currency System utility function
 * To convert decimal value to currency using commas according to international standard.
 * To round off decimal value upto 2 decimal places.
 */
const intlCurrencySystem = (input) => {
	return parseFloat(parseFloat(input).toFixed(2)).toLocaleString();
};

/**
 * Quote data validator
 * To check for null/undefined values in the data and only parse data accordingly.
 */
export const validateQuoteData = (response) => {
	if (!response) return;
	if (response.Status === 'SUCCESS') {
		const quoteData = response.data;
		if (!quoteData) return;
		if (!quoteData.Symbol) return;

		// Using changeSign to determine if + sign needs to be rendered in front of the value.
		let changeSign = '';
		if (quoteData.Change) {
			if (parseFloat(quoteData.Change) > 0) changeSign = '+';
		}
		const newQuoteData = {
			Name: quoteData.Name ? quoteData.Name.toString().toUpperCase() : '',
			Symbol: quoteData.Symbol,
			LastPrice: quoteData.LastPrice ? intlCurrencySystem(quoteData.LastPrice) : '-',
			Change: quoteData.Change ? `${changeSign}${intlCurrencySystem(quoteData.Change)}` : '',
			ChangePercent: quoteData.ChangePercent
				? `${changeSign}${intlCurrencySystem(quoteData.ChangePercent)}%`
				: '',
			Timestamp: quoteData.Timestamp
				? `As of ${quoteData.Timestamp.toLocaleTimeString('en-US', {
						timeZoneName: 'shortGeneric',
				  })}`
				: '-',
			Low: quoteData.Low ? intlCurrencySystem(quoteData.Low) : '_',
			High: quoteData.High ? intlCurrencySystem(quoteData.High) : '_',
			Open: quoteData.Open ? intlCurrencySystem(quoteData.Open) : '-',
			Volume: quoteData.Volume ? currencySystemRoundup(quoteData.Volume) : '-',
			MarketCap: quoteData.MarketCap ? currencySystemRoundup(quoteData.MarketCap) : '-',
		};
		return newQuoteData;
	} else {
		// log response.Message.
	}
};
