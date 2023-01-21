import { Button, down, left, mouse, right, up } from "@nut-tree/nut-js";

export default async function drawRectangle(width: number, length: number) {
  mouse.config.mouseSpeed = 200;
  await mouse.pressButton(Button.LEFT);
  await mouse.move(right(width));
  await mouse.move(down(length));
  await mouse.move(left(width));
  await mouse.move(up(length));
  await mouse.releaseButton(Button.LEFT);
}
