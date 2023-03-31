import { useState } from 'react';
import Home from './pages/Home';
// import './App.css';

function App() {
	const [count, setCount] = useState(0);

	return (
		<div className='container' style={{ maxWidth: '540px' }}>
			<h1>Welcome to Markit Digital</h1>
			<Home />
		</div>
	);
}

export default App;
