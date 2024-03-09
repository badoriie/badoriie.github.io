<template>
  <div ref="p5container"></div>
</template>

<script lang="ts">
import { defineComponent } from 'vue';
import p5 from 'p5';

export default defineComponent({
  name: 'BadoriieLogo',
  mounted() {
    this.createCanvas();
  },
  methods: {
    createCanvas() {
      new p5(this.sketch, this.$refs.p5container as HTMLElement);
    },
    sketch(p: p5) {
      p.setup = function() {
        p.createCanvas(200, 200, p.WEBGL);
      };

      p.draw = function() {
        p.background(250);

        p.normalMaterial();

        p.push();
        p.translate(0, 0, 0);
        p.rotateZ(p.frameCount * 0.01);
        p.rotateX(p.frameCount * 0.01);
        p.rotateY(p.frameCount * 0.01);
        p.box(100, 100, 100);
        p.pop();
      };
    }
  }
});
</script>
