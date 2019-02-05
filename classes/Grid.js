import { lerp } from 'canvas-sketch-util/math';

class Grid {
	constructor(xCount, yCount, margin, width, height) {
		this.xCount = xCount || 6;
		this.yCount = yCount || 6;
		this.margin = margin;
		this.width = width;
		this.height = height;
		this.points = [];

		for (let x = 0; x < this.xCount; x++) {
			for (let y = 0; y < this.yCount; y++) {
				const u = x / (this.xCount - 1);
				const v = y / (this.yCount - 1);
				const px = lerp(this.margin, this.width - this.margin, u);
				const py = lerp(this.margin, this.height - this.margin, v);
				this.points.push([px, py]);
			}
		}
	}
}

export default Grid;
