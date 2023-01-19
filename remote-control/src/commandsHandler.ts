import { mouse, up, left, right, down } from "@nut-tree/nut-js";
import { Commands } from "./constants.js";
export default async function commandsHandler(data: string) {
  if (data) {
    const [command, width, length] = data.split(" ");
    console.log("COMMAND", command);
    switch (command) {
      case Commands.MOUSE_UP:
        await mouse.move(up(Number(width)));
        break;
      case Commands.MOUSE_LEFT:
        await mouse.move(left(Number(width)));
        break;
      case Commands.MOUSE_RIGHT:
        await mouse.move(right(Number(width)));
        break;
      case Commands.MOUSE_DOWN:
        await mouse.move(down(Number(width)));
        break;
      case Commands.MOUSE_POSITION:
        const mousePosition = await mouse.getPosition();
        return `${data} ${mousePosition.x},${mousePosition.y}`;
      default:
        return data;
    }
    return data;
  } else {
    console.error("There is no data");
  }
}
