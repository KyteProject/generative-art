const canvasSketch = require('canvas-sketch');
import { lerp } from 'canvas-sketch-util/math';
const random = require('canvas-sketch-util/random');
const palettes = require('nice-color-palettes');

const settings = {
	dimensions: [2048, 2048],
};

const sketch = () => {
	const colorCount = random.rangeFloor(2, 5);
	const palette = random.shuffle(random.pick(palettes)).slice(0, colorCount);

	const createGrid = () => {
		const points = [];
		const count = random.rangeFloor(10, 75);

		for (let x = 0; x < count; x++) {
			for (let y = 0; y < count; y++) {
				const u = count <= 1 ? 0.5 : x / (count - 1);
				const v = count <= 1 ? 0.5 : y / (count - 1);
				const radius = Math.abs(random.noise2D(u, v)) * 0.05;

				points.push({
					position: [u, v],
					color: random.pick(palette),
					radius,
					rotation: random.noise2D(u, v),
				});
			}
		}
		return points;
	};

	const points = createGrid().filter(() => random.value() > 0.5);
	const margin = 200;

	return ({ context, width, height }) => {
		context.fillStyle = 'white';
		context.fillRect(0, 0, width, height);

		points.forEach(data => {
			const { position, color, radius, rotation } = data;
			const [u, v] = position;
			const x = lerp(margin, width - margin, u);
			const y = lerp(margin, width - margin, v);

			// context.beginPath();
			// context.arc(x, y, radius * width, 0, Math.PI * 2, false);
			// context.fillStyle = color;
			// context.fill();

			context.save();
			context.fillStyle = color;
			context.font = `${radius * width}px "Helvetica"`;
			context.translate(x, y);
			context.rotate(rotation);
			context.fillText('CUNT', 0, 0);

			context.restore();
		});
	};
};

canvasSketch(sketch, settings);
