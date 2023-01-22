import { mouse, Region, screen } from "@nut-tree/nut-js";
import Jimp from "jimp";

export default async function prntScreen() {
  try {
    const { x, y } = await mouse.getPosition();
    const screenSize = 200;
    const screenRegion = new Region(x - 100, y - 100, screenSize, screenSize);
    await screen.highlight(screenRegion);
    const imgScreen = await screen.grabRegion(screenRegion);
    const imgBuffer = (await imgScreen.toRGB()).data; // from RGB to get coloured data
    const imgJimp = new Jimp({
      data: imgBuffer,
      width: imgScreen.width,
      height: imgScreen.height,
    });
    const imgToBase64 = (await imgJimp.getBufferAsync(Jimp.MIME_PNG)).toString(
      "base64"
    );
    return imgToBase64;
  } catch (error) {
    if (error instanceof Error) {
      console.error(error);
      throw new Error(error.message);
    }
  }
}
