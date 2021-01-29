import Gl from './gl';
import gsap from 'gsap';

class App {
  constructor() {
    this.tl = gsap.timeline({
      paused: true,
      delay: 2,
    });
    this.tl
      .add(this.animateGl())
      .add(this.animateMarquee(), '-=2.2')
    ;

    this.init();
  }

  animateMarquee() {
    const marquee = document.querySelector('.marquee');
    const tl = gsap.timeline();

    tl
      .to(marquee, {
        duration: 1,
        y: '0%',
        ease: 'power3',
      });

    return tl;
  }

  animateGl() {
    const tl = gsap.timeline();
    const uniforms = Gl.pass.program.uniforms;

    tl
      .to(uniforms.uMask, {
        value: 1,
        duration: 2,
        ease: 'power3.inOut',
      })
      .to(uniforms.uSplit, {
        value: 1,
        duration: 2,
        ease: 'power3.inOut',
      }, '-=1');

    return tl;
  }

  init() {
    this.tl.play();
  }
}

new App();