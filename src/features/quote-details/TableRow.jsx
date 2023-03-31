import './TableRow.styles.scss';

/**
 * Table Row component
 * This component is created to achieve code-reusability.
 */
const TableRow = ({ label, value }) => {
	return (
		<tr className='quote-table'>
			<td className='table-label head'>{label}</td>
			<td className='table-value'>
				<span className='content'>{value}</span>
			</td>
		</tr>
	);
};

export default TableRow;
