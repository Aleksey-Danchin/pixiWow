import { Application, Graphics } from "pixi.js";

const canvas = document.querySelector("canvas");
if (!canvas) {
	throw Error("canvas not found");
}

const app = new Application({
	width: 300,
	height: 300,
	backgroundColor: 0xc0c0c0,
	view: canvas,
});

const react = new Graphics();
react.beginFill();
react.drawRect(0, 0, app.screen.width, app.screen.height);
react.alpha = 0;
react.endFill();
react.cursor = "none";

app.stage.addChild(react);
react.interactive = true;
react.interactiveChildren = false;

const point = new Graphics();
app.stage.addChild(point);

let fromPoint: null | [number, number] = null;

react.addEventListener("pointerdown", (e) => {
	point.beginFill(0xff0000);
	point.drawCircle(e.globalX, e.globalY, 5);
	point.endFill();

	fromPoint = [e.globalX, e.globalY];
});

const line = new Graphics();
const mouse = new Graphics();
mouse.beginFill(0x00ff00);
mouse.drawCircle(0, 0, 5);
mouse.endFill();

app.stage.addChild(line, mouse);
react.addEventListener("pointermove", (e) => {
	mouse.x = e.globalX;
	mouse.y = e.globalY;

	if (fromPoint) {
		line.clear();
		line.beginFill(0xff0000);
		line.lineStyle(2, 0xff0000, 0.8);
		line.moveTo(...fromPoint);
		line.lineTo(mouse.x, mouse.y);
		line.endFill();
	}
});

console.log(point);
