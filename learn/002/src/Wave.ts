import { Container, FederatedPointerEvent, Graphics, Rectangle } from "pixi.js";

const getRandomColor = () => {
	const colors = [
		0x000000, 0xff0000, 0x00ff00, 0x0000ff, 0xffff00, 0xff00ff, 0x00ff00,
		0x00ffff, 0xffffff,
	];
	const index = Math.floor(Math.random() * colors.length);
	return colors[index];
};

export class Wave {
	container = new Container();
	graphic = new Graphics();
	collection: Array<{ x: number; y: number; r: number; color: number }> = [];
	speed = 1;
	maxRadius = 500;

	constructor() {
		const { container, graphic } = this;

		container.addChild(graphic);

		container.interactive = true;
		container.interactiveChildren = false;
		container.cursor = "pointer";
		container.addEventListener("pointerdown", this.handler);
	}

	start(width: number, height: number) {
		const { container } = this;
		container.hitArea = new Rectangle(0, 0, width, height);
	}

	handler = (e: FederatedPointerEvent) => {
		this.collection.push({
			x: e.globalX,
			y: e.globalY,
			r: 0,
			color: getRandomColor(),
		});
	};

	tick = (delta: number) => {
		const { graphic, collection, speed, maxRadius } = this;

		if (!collection.length) {
			return;
		}

		for (const item of collection) {
			item.r += speed * delta;
		}

		graphic.clear();
		for (const item of collection) {
			if (item.r >= maxRadius) {
				continue;
			}

			graphic.beginFill(0x000, 0);
			graphic.lineStyle(1, item.color);
			graphic.drawCircle(item.x, item.y, item.r);
			graphic.endFill();
		}

		this.collection = collection.filter(({ r }) => r < maxRadius);
	};
}
