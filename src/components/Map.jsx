import React from 'react';

export default function Map({
	map,
	revealed,
	scanActive,
	routeVisible,
	onDoorClick,
	onCreatureClick,
	onMove,
}) {
	const handleMapClick = event => {
		const rect = event.currentTarget.getBoundingClientRect();
		const x = ((event.clientX - rect.left) / rect.width) * 900;
		const y = ((event.clientY - rect.top) / rect.height) * 520;
		onMove({ x, y });
	};

	return (
		<div className='map-container'>
			<svg viewBox='0 0 900 920' className='map-svg' onClick={handleMapClick}>
				<defs>
					<pattern
						id='grid'
						width='25'
						height='25'
						patternUnits='userSpaceOnUse'
					>
						<path
							d='M 25 0 L 0 0 0 25'
							fill='none'
							stroke='#123d35'
							strokeWidth='0.7'
						/>
					</pattern>

					<filter id='glow'>
						<feGaussianBlur stdDeviation='4' result='blur' />
						<feMerge>
							<feMergeNode in='blur' />
							<feMergeNode in='SourceGraphic' />
						</feMerge>
					</filter>
				</defs>

				<rect width='900' height='920' fill='#050b0b' />
				<rect width='900' height='720' fill='url(#grid)' />

				{/* Corridors */}
				{map.corridors.map((corridor, index) => (
					<line
						key={index}
						x1={corridor.x1}
						y1={corridor.y1}
						x2={corridor.x2}
						y2={corridor.y2}
						stroke='#286d59'
						strokeWidth='42'
						opacity='0.3'
					/>
				))}

				{/* Rooms */}
				{map.rooms.map(room => (
					<g key={room.id}>
						<rect
							x={room.x}
							y={room.y}
							width={room.w}
							height={room.h}
							fill='#091a17'
							stroke='#36d6a0'
							strokeWidth='2'
						/>

						<rect
							x={room.x + 5}
							y={room.y + 5}
							width={room.w - 10}
							height={room.h - 10}
							fill='none'
							stroke='#174d40'
							strokeWidth='1'
						/>

						<text
							x={room.x + 12}
							y={room.y + 24}
							fill='#60e9ba'
							fontSize='11'
							letterSpacing='2'
							fontFamily='monospace'
						>
							{room.name}
						</text>

						<text
							x={room.x + room.w - 12}
							y={room.y + room.h - 12}
							fill='#286d59'
							fontSize='10'
							textAnchor='end'
							fontFamily='monospace'
						>
							{room.id}
						</text>
					</g>
				))}

				{/* Route */}
				{routeVisible && (
					<g filter='url(#glow)'>
						<path
							d={`M ${map.player.x} ${map.player.y}
                  L 140 250
                  L 140 375
                  L 435 375
                  L 580 375
                  L 725 375
                  L 725 240`}
							fill='none'
							stroke='#e7ff35'
							strokeWidth='3'
							strokeDasharray='9 7'
							className='route-line'
						/>
					</g>
				)}

				{/* Doors */}
				{map.doors.map(door => (
					<g
						key={door.id}
						className='map-clickable'
						onClick={event => {
							event.stopPropagation();
							onDoorClick(door.id);
						}}
					>
						<circle
							cx={door.x}
							cy={door.y}
							r='15'
							fill='#07110e'
							stroke={door.state === 'locked' ? '#ffb52e' : '#36d6a0'}
							strokeWidth='2'
						/>

						<text
							x={door.x}
							y={door.y + 4}
							textAnchor='middle'
							fill={door.state === 'locked' ? '#ffb52e' : '#36d6a0'}
							fontSize='11'
							fontFamily='monospace'
						>
							{door.state === 'locked' ? 'L' : 'D'}
						</text>

						<title>
							{door.id}: {door.state}
						</title>
					</g>
				))}

				{/* Creatures */}
				{map.creatures.map(creature => {
					const visible = !creature.hidden || revealed.includes(creature.id);

					if (!visible) return null;

					return (
						<g
							key={creature.id}
							className='map-clickable creature-marker'
							onClick={event => {
								event.stopPropagation();
								onCreatureClick(creature);
							}}
							filter='url(#glow)'
						>
							<circle
								cx={creature.x}
								cy={creature.y}
								r='17'
								fill='#ff1744'
								opacity='0.18'
								stroke='#ff1744'
								strokeWidth='2'
								className='creature-pulse'
							/>

							<path
								d={`M ${creature.x} ${creature.y - 9}
                    L ${creature.x + 9} ${creature.y + 8}
                    L ${creature.x - 9} ${creature.y + 8} Z`}
								fill='#ff1744'
							/>

							<text
								x={creature.x}
								y={creature.y + 30}
								fill='#ff536e'
								textAnchor='middle'
								fontSize='10'
								fontFamily='monospace'
							>
								{creature.id}
							</text>
						</g>
					);
				})}

				{/* Player */}
				<g
					transform={`translate(${map.player.x} ${map.player.y})`}
					filter='url(#glow)'
					className='player-marker'
				>
					<circle r='20' fill='#00ffe0' opacity='0.12' />
					<circle r='9' fill='#00ffe0' />
					<path d='M 0 -20 L -7 -7 L 7 -7 Z' fill='#ffffff' />
				</g>

				{/* Scan effect */}
				{scanActive && (
					<circle
						cx={map.player.x}
						cy={map.player.y}
						r='100'
						className='scan-wave'
					/>
				)}

				{/* Coordinates */}
				<text x='20' y='500' fill='#286d59' fontSize='10'>
					GRID: 09-04 / SECTOR: UNKNOWN
				</text>
			</svg>
		</div>
	);
}
