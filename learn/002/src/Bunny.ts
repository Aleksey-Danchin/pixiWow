import { Sprite } from "pixi.js";

export class Bunny {
	sprite = Sprite.from("bunny");
	rotateDirection = 1;

	constructor() {
		const { sprite } = this;

		sprite.anchor.set(0.5);
		sprite.interactive = true;
		sprite.interactiveChildren = false;
		sprite.cursor = "pointer";
		sprite.scale.set(2, 2);

		sprite.addEventListener("pointerdown", this.toggleRotateDirection);
	}

	tick = (delta: number) => {
		const { sprite, rotateDirection } = this;
		sprite.rotation += (rotateDirection * delta) / 20;
	};

	toggleRotateDirection = () => {
		this.rotateDirection *= -1;
	};
}
