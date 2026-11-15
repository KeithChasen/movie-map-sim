export default function StatusPanel({
	revealed,
	selectedCreature,
	map,
	signal,
}) {
	const activeThreats = revealed.length;

	return (
		<div className='status-panel'>
			<div className='panel-heading'>
				<span>ENVIRONMENTAL SCAN</span>
				<span className='live-indicator'>● LIVE</span>
			</div>

			{selectedCreature ? (
				<div className='entity-details'>
					<div className='entity-title'>ENTITY IDENTIFIED</div>
					<h3>{selectedCreature.name}</h3>
					<div>ID: {selectedCreature.id}</div>
					<div className='danger-text'>
						THREAT LEVEL: {selectedCreature.danger}
					</div>
					<div>LOCATION: {selectedCreature.doorId}</div>
				</div>
			) : (
				<div className='status-grid'>
					<div>
						<span>POSITION</span>
						<strong>
							{Math.round(map.player.x)} / {Math.round(map.player.y)}
						</strong>
					</div>

					<div>
						<span>DETECTED ENTITIES</span>
						<strong className={activeThreats ? 'danger-text' : ''}>
							{activeThreats.toString().padStart(2, '0')}
						</strong>
					</div>

					<div>
						<span>SIGNAL</span>
						<strong>{signal}%</strong>
					</div>

					<div>
						<span>ENVIRONMENT</span>
						<strong>UNKNOWN</strong>
					</div>
				</div>
			)}

			<div className='signal-bar'>
				<div style={{ width: `${signal}%` }} />
			</div>

			<div className='panel-footer'>
				NEXUS OS // BUILD 0.1.0 // EXPERIMENTAL
			</div>
		</div>
	);
}
