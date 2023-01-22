import { Button, mouse, Point, straightTo } from "@nut-tree/nut-js";

export default async function drawCircle(radius: number) {
  const degreesInCircle = 360;
  const degree = Math.PI / 180;

  await mouse.pressButton(Button.LEFT);
  const { x, y } = await mouse.getPosition();

  for (let i = 0; i <= degreesInCircle; i++) {
    const rad = i * degree;
    const currentX = x + radius - Math.cos(rad) * radius;
    const currentY = y - radius * Math.sin(rad);
    await mouse.move(straightTo(new Point(currentX, currentY)));
  }

  await mouse.releaseButton(Button.LEFT);
}
