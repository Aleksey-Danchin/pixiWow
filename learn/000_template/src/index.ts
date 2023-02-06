import { Application } from "pixi.js";

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
