const canvasSketch = require("canvas-sketch");
const { lerp } = require("canvas-sketch-util/math");

const settings = {
  //should be usual settings for all 2d sketches I generate
  dimensions: [2048, 2048],
  pixlesPerInch: 320,
  scaleToView: true,
  scaleContext: true,
  resizeCanvas: true,
  styleCanvas: true,
  encodingQuality: 100,
  pixelated: false,
  id: "mySketch",
};

const sketch = () => {
  const createGrid = () => {
    const points = []; //local scoped points
    const count = 10;
    for (let x = 0; x < count; x++) {
      for (let y = 0; y < count; y++) {
        const u = count <= 1 ? 0.5 : x / (count - 1); // -iterates a math range of 0.{count} x
        const v = count <= 1 ? 0.5 : y / (count - 1); // -iterates a math range of 0.{count} y
        points.push([u, v]);
      }
    }
    return points;
  };
  const points = createGrid(); // global scope - different points constant

  return ({ context, width, height, margin }) => {
    margin = Math.floor(Math.random() * 75 + 1); // set margin = 50 to remove the exponential randomness to plotting and keep the slow linear opacity fade
    function generateRandomColor() {
      const hue = lerp(1, 180, 0.8);
      const sat = 100 + "%";
      const lgt = 75 + "%";
      const a = lerp(0, 1, 0.8);
      return "hsl(" + hue + "deg, " + sat + ", " + lgt + "," + a + ")";
    }
    //generate a random int based margin for the linear entrapolation to work work off
    context.fillStyle = "#fff";
    context.fillRect(0, 0, width, height);
    points.forEach(([u, v]) => {
      const x = lerp(margin, (width += margin / 10), u); //visualise random exponential linear entrapolation
      const y = lerp(margin, (width += margin / 10), v);
      context.beginPath();
      context.arc(x, y, 5, 0, Math.PI * 2, false);
      context.strokeStyle = generateRandomColor();
      context.lineWidth = 5;
      context.stroke();
    });
  };
};

canvasSketch(sketch, settings);
