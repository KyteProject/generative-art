import canvasSketch from 'canvas-sketch';
import random from 'canvas-sketch-util/random';
import palettes from 'nice-color-palettes/1000.json';
import Grid from './classes/Grid';

const settings = {
	dimensions: [2048, 2048],
};

const sketch = ({ width, height }) => {
	const bgColors = ['black', 'white'];
	const colorCount = random.rangeFloor(2, 5);
	const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);
	const background = random.pick(palette);
	const margin = 200;
	const count = random.rangeFloor(4, 8);

	let shapes = [];

	let grid = new Grid(count, count, margin, width, height);

	while (grid.points.length > 2) {
		const pointsToUse = random.shuffle(grid.points).slice(0, 2);

		if (pointsToUse.length < 2) break;

		const color = random.pick(palette);

		grid.points = grid.points.filter(p => !pointsToUse.includes(p));

		const [a, b] = pointsToUse;

		shapes.push({
			color,
			path: [[a[0], height - margin], a, b, [b[0], height - margin]],
			y: (a[1] + b[1]) / 2,
		});
	}

	shapes.sort((a, b) => a.y - b.y);

	return ({ context, width, height }) => {
		context.globalAlpha = 1;
		context.fillStyle = background;
		context.fillRect(0, 0, width, height);

		shapes.forEach(({ lineWidth, path, color }) => {
			context.beginPath();
			path.forEach(([x, y]) => {
				context.lineTo(x, y);
			});
			context.closePath();

			// Draw the trapezoid with a specific colour
			context.lineWidth = 20;
			context.globalAlpha = 0.85;
			context.fillStyle = color;
			context.fill();

			// Outline at full opacity
			context.lineJoin = context.lineCap = 'round';
			context.strokeStyle = background;
			context.globalAlpha = 1;
			context.stroke();
		});
	};
};

canvasSketch(sketch, settings);
