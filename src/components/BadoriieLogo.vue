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
        p.background('#181818');
    
        p.rotateZ( (p.mouseX + p.mouseY) * 0.001);
        p.rotateX( p.frameCount * 0.01);
        p.rotateY( p.frameCount * 0.01);

        if (p.touches.length) {
          p.rotateX( p.frameCount * 0.06);
          p.rotateY( p.frameCount * 0.03);
        } 

        p.noFill();
        p.stroke('#5b49b8');
        p.strokeWeight(6);
        p.box(100);
   
      };
    }
  }
});
</script>
