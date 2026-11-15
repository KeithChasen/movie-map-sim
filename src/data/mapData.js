export const initialMap = {
	rooms: [
		{ id: 'A', name: 'CONTROL', x: 50, y: 60, w: 180, h: 130 },
		{ id: 'B', name: 'LAB 01', x: 340, y: 60, w: 190, h: 130 },
		{ id: 'C', name: 'STORAGE', x: 50, y: 310, w: 180, h: 130 },
		{ id: 'D', name: 'SECTOR 04', x: 340, y: 310, w: 190, h: 130 },
		{ id: 'E', name: 'EXIT', x: 650, y: 185, w: 150, h: 110 },

		{ id: 'X', name: '!!!xx', x: 280, y: 550, w: 150, h: 110 },
	],

	corridors: [
		{ x1: 230, y1: 125, x2: 340, y2: 125 },
		{ x1: 140, y1: 190, x2: 140, y2: 310 },
		{ x1: 435, y1: 190, x2: 435, y2: 310 },
		{ x1: 230, y1: 375, x2: 340, y2: 375 },
		{ x1: 435, y1: 375, x2: 725, y2: 375 },
		{ x1: 725, y1: 295, x2: 725, y2: 375 },
		{ x1: 530, y1: 125, x2: 725, y2: 125 },
		{ x1: 725, y1: 125, x2: 725, y2: 185 },

		{ x1: 135, y1: 425, x2: 135, y2: 625 },
		{ x1: 125, y1: 625, x2: 925, y2: 625 },
		{ x1: 725, y1: 625, x2: 725, y2: 350 },
	],

	doors: [
		{ id: 'D-01', x: 285, y: 125, state: 'locked' },
		{ id: 'D-02', x: 435, y: 250, state: 'closed' },
		{ id: 'D-03', x: 285, y: 375, state: 'closed' },
		{ id: 'D-04', x: 625, y: 375, state: 'locked' },

		{ id: 'D-05', x: 225, y: 625, state: 'locked' },
	],

	creatures: [
		{
			id: 'ENT-001',
			x: 435,
			y: 115,
			name: 'UNKNOWN ORGANISM',
			danger: 'HIGH',
			hidden: true,
			doorId: 'D-01',
		},
		{
			id: 'ENT-002',
			x: 435,
			y: 375,
			name: 'BIOLOGICAL SIGNAL',
			danger: 'CRITICAL',
			hidden: true,
			doorId: 'D-04',
		},
	],

	player: { x: 140, y: 125 },
};
