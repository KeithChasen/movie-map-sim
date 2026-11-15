export default function Controls({
	onScan,
	onRoute,
	onReset,
	scanning,
	routeVisible,
}) {
	return (
		<div className='controls'>
			<button
				className={scanning ? 'active' : ''}
				onClick={onScan}
				disabled={scanning}
			>
				{scanning ? 'SCANNING...' : '◉ SCAN'}
			</button>

			<button className={routeVisible ? 'active' : ''} onClick={onRoute}>
				⌁ ROUTE
			</button>

			<button onClick={onReset}>↺ RESET</button>
		</div>
	);
}
