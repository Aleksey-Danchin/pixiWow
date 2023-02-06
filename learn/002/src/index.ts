import { Application, Assets } from "pixi.js";
import { Bunny } from "./Bunny";
import { Wave } from "./Wave";

(async () => {
	const canvas = document.querySelector("canvas");

	if (!canvas) {
		throw Error("Canvas not found.");
	}

	const app = new Application({
		width: 500,
		height: 500,
		view: canvas,
		backgroundColor: 0xd6f5d7,
	});

	Assets.add("bunny", "/sets/bunny.png");
	await Assets.load(["bunny"]);

	const wave = new Wave();
	app.stage.addChild(wave.container);
	app.ticker.add(wave.tick);
	wave.start(app.screen.width, app.screen.height);

	for (let i = 0; i < 9; i++) {
		const bunny = new Bunny();
		bunny.sprite.position.set(app.screen.width / 2, app.screen.height / 2);
		app.stage.addChild(bunny.sprite);
		app.ticker.add(bunny.tick);

		bunny.sprite.x = 100 + (i % 3) * 150;
		bunny.sprite.y = 100 + Math.floor(i / 3) * 150;
	}
})();
