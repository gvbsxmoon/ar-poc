'use client';

import { useState } from 'react';
import QRCode from 'react-qr-code';

function Info() {
	const [message, setMessage] = useState('');

	const openAR = async () => {
		const res = await fetch(`${window.location.href}api`);
		const { message, isMobile } = await res.json();

		if (!isMobile) {
			setMessage(message);
		}
	};
	return (
		<div className='info-container'>
			<h2>Nike AIR</h2>
			<span>#running</span>
			<p>$ 220</p>
			<button onClick={openAR}>Apri AR</button>

			{message && (
				<div className='desktop-ar-container'>
					<QRCode value={`${window.location.href}api`} size={60}/>
					<span>{message}</span>
				</div>
			)}
		</div>
	);
}

export default Info;
