import { Renderer, Camera, Transform, Orbit, Post, Vec2 } from 'ogl';

import { Events } from '../events';
import store from '../store';

import { GLText } from './GLText';

import { create3DText } from '../util';

import fragment from './shaders/fx/fragment.glsl';

export class Gl {
  constructor() {
    this.renderer = new Renderer({
      dpr: Math.min(window.devicePixelRatio, 2),
      alpha: true,
    });

    this.gl = this.renderer.gl;
    this.gl.clearColor(0, 0, 0, 0);
    document.body.appendChild(this.gl.canvas);

    this.camera = new Camera(this.gl, { fov: 35 });
    this.camera.position.set(0, 0, 5);
    this.camera.lookAt([0, 0, 0]);

    this.controls = new Orbit(this.camera);

    this.scene = new Transform();

    // Post copies the current renderer values (width, height, dpr) if none are passed in
    this.post = new Post(this.gl);
    this.pass = null;

    this.time = 0;
    this.text = null;
    this.textsGroup = null;

    this.resize = this.resize.bind(this);
    this.render = this.render.bind(this);

    this.init();
  }

  init() {
    this.resize();
    this.createPass();
    this.addElements();
    this.addEvents();
  }

  resize() {
    this.renderer.setSize(store.bounds.ww, store.bounds.wh);
    this.camera.perspective({
      aspect: this.gl.canvas.width / this.gl.canvas.height,
    });
    
    // Need to resize post as render targets need to be re-created
    this.post.resize();    
  }

  createPass() {
    // Add pass like you're creating a Program. Then use the 'enabled'
    // property to toggle the pass.
    this.pass = this.post.addPass({
      // If not passed in, pass will use the default vertex/fragment
      // shaders found within the class.
      fragment,
      uniforms: {
        uTime: { value: 0 },
      },
    });    
  }

  addElements() {
    const texts = create3DText(this.gl);
    this.scene.addChild(texts);
    this.textsGroup = this.scene.children[0].children;
  }

  addEvents() {
    Events.on('resize', this.resize);
    Events.on('tick', this.render);
  }

  render() {
    this.controls.update();

    this.update();
    
    // Replace Renderer.render with post.render, using the same args
    this.post.render({
      scene: this.scene,
      camera: this.camera      
    });    
  }

  update() {
    this.time += 1 / 60;

    // Update time inside text shaders
    this.textsGroup.forEach(mesh => mesh.updateTime(this.time));

    // Update time inside post fx shader
    this.pass.program.uniforms.uTime.value = this.time;
  }
}