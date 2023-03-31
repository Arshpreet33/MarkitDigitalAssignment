import TableRow from './TableRow';
import './QuoteDetails.styles.scss';
import { useEffect, useState } from 'react';

/**
 * Quote Details component
 * This component displays the updated data to the user.
 * Used Bootstrap classes to add responsiveness.
 * Used Bootstrap's Typeahead library to provide autocomplete functionality to the user.
 */
const QuoteDetails = ({ quote }) => {
	const [changeColor, setChangeColor] = useState('');

	useEffect(() => {
		if (quote) {
			if (quote.Change) {
				if (quote.Change.toString().substring(0, 1) === '+') setChangeColor('green');
				else if (quote.Change.toString().substring(0, 1) === '-') setChangeColor('red');
			}
		}
	}, [quote]);

	// Placeholder text - Won't be necessary but just for a precaution.
	if (!quote) return <h1>No data to show.</h1>;

	return (
		<div className='col-12'>
			<div className='row'>
				<div className='col-12 quote-name'>
					{quote.Name} ({quote.Symbol})
				</div>
			</div>
			<div className='row'>
				<div className='col-12 quote-price'>
					{quote.LastPrice}
					{'  '}
					<div className={`quote-change ${changeColor}`}>
						{quote.Change} ({quote.ChangePercent})
					</div>
				</div>
			</div>
			<div className='row'>
				<div className='col-12 quote-date'>{quote.Timestamp}</div>
			</div>
			<div className='row py-3'>
				<div className='col-12'>
					<table className='table'>
						<thead>
							<tr>
								<td></td>
								<td></td>
							</tr>
						</thead>
						<tbody>
							<TableRow label='Range' value={`${quote.Low} - ${quote.High}`} />
							<TableRow label='Open' value={quote.Open} />
							<TableRow label='Volume' value={quote.Volume} />
							<TableRow label='Market Cap' value={quote.MarketCap} />
						</tbody>
					</table>
				</div>
			</div>
		</div>
	);
};

export default QuoteDetails;
