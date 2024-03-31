import p5 from "p5";

interface BackgroundColor {
  r: number;
  g: number;
  b: number;
}

export class BadorrieLogo {
  private backgroundColor: BackgroundColor;
  private scale: number;

  constructor(
    scale: number,
    backgroundColor: BackgroundColor,
    node: HTMLElement,
  ) {
    new p5(this.sketch, node);
    this.backgroundColor = backgroundColor;
    this.scale = scale;
  }

  private sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(
        p.windowWidth * this.scale,
        p.windowWidth * this.scale,
        p.WEBGL,
      );
    };

    p.draw = () => {
      p.background(
        this.backgroundColor.r,
        this.backgroundColor.g,
        this.backgroundColor.b,
      );
      p.normalMaterial();
      p.push();

      p.rotateZ(p.PI / 4 + scrollY * 0.001);
      p.rotateX(p.PI / 4 + scrollY * 0.001);
      p.rotateY(p.PI / 4 + scrollY * 0.001);
      p.box(
        p.windowWidth * this.scale * 0.5,
        p.windowWidth * this.scale * 0.5,
        p.windowWidth * this.scale * 0.5,
      );
      p.pop();
    };

    p.windowResized = () => {
      p.resizeCanvas(p.windowWidth * this.scale, p.windowWidth * this.scale);
    };
  };
}
