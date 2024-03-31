import p5 from "p5";

export class BadorrieLogo {
  constructor(node: HTMLElement) {
    new p5(this.sketch, node);
  }

  private sketch = (p: p5) => {
    p.setup = () => {
      p.createCanvas(400, 400, p.WEBGL);
    };

    p.draw = () => {
      p.background(26,29,34);
      p.normalMaterial();
      p.push();
      p.rotateZ(p.frameCount * 0.01);
      p.rotateX(p.frameCount * 0.01);
      p.rotateY(p.frameCount * 0.01);
      p.box(150, 150, 150);
      p.pop();

    };
  };
}
