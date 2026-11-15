import { useState } from 'react';
import { initialMap } from './data/mapData';
import Map from './components/Map';
import StatusPanel from './components/StatusPanel';
import Controls from './components/Controls';
import './App.css';

export default function App() {
	const [map, setMap] = useState(initialMap);
	const [revealed, setRevealed] = useState([]);
	const [selectedCreature, setSelectedCreature] = useState(null);
	const [scanning, setScanning] = useState(false);
	const [scanActive, setScanActive] = useState(false);
	const [routeVisible, setRouteVisible] = useState(true);
	const [signal, setSignal] = useState(87);

	function scan() {
		if (scanning) return;

		setScanning(true);
		setScanActive(true);
		setSelectedCreature(null);

		setTimeout(() => {
			setRevealed(map.creatures.map(c => c.id));
			setSignal(74);
			setScanning(false);

			setTimeout(() => setScanActive(false), 1000);
		}, 1800);
	}

	function toggleDoor(id) {
		setMap(current => ({
			...current,
			doors: current.doors.map(door =>
				door.id === id
					? {
							...door,
							state: door.state === 'locked' ? 'closed' : 'locked',
					  }
					: door
			),
		}));
	}

	function movePlayer(position) {
		setMap(current => ({
			...current,
			player: position,
		}));
	}

	function reset() {
		setMap(initialMap);
		setRevealed([]);
		setSelectedCreature(null);
		setScanning(false);
		setScanActive(false);
		setRouteVisible(true);
		setSignal(87);
	}

	return (
		<main className='device'>
			<header className='topbar'>
				<div className='brand'>
					<div className='brand-icon'>N</div>
					<div>
						<h1>NEXUS</h1>
						<span>PORTABLE NAVIGATION SYSTEM</span>
					</div>
				</div>

				<div className='top-status'>
					<span className='connection'>● CONNECTED</span>
					<span>UNIT 07</span>
				</div>
			</header>

			<section className='device-content'>
				<div className='map-section'>
					<div className='section-heading'>
						<span>FACILITY MAP</span>
						<span>LEVEL 01 / UNKNOWN LOCATION</span>
					</div>

					<Map
						map={map}
						revealed={revealed}
						scanActive={scanActive}
						routeVisible={routeVisible}
						onDoorClick={toggleDoor}
						onCreatureClick={setSelectedCreature}
						onMove={movePlayer}
					/>

					<div className='map-legend'>
						<span>
							<i className='legend-player' /> YOU
						</span>
						<span>
							<i className='legend-route' /> ROUTE
						</span>
						<span>
							<i className='legend-door' /> DOOR
						</span>
						<span>
							<i className='legend-danger' /> THREAT
						</span>
					</div>
				</div>

				<aside className='sidebar'>
					<StatusPanel
						revealed={revealed}
						selectedCreature={selectedCreature}
						map={map}
						signal={signal}
					/>

					<Controls
						onScan={scan}
						onRoute={() => setRouteVisible(v => !v)}
						onReset={reset}
						scanning={scanning}
						routeVisible={routeVisible}
					/>

					<div className='warning-panel'>
						<div className='warning-title'>⚠ SECURITY ADVISORY</div>
						<p>
							{revealed.length
								? 'UNKNOWN BIOLOGICAL SIGNATURES DETECTED. MAINTAIN SAFE DISTANCE.'
								: 'NO ACTIVE THREATS CONFIRMED. SCAN THE ENVIRONMENT.'}
						</p>
					</div>
				</aside>
			</section>

			<footer className='bottom-bar'>
				<span>NEXUS CORPORATION © 2089</span>
				<span>ALL SYSTEMS OPERATIONAL</span>
				<span>PROTOTYPE v0.1.0</span>
			</footer>
		</main>
	);
}
