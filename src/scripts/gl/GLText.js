import { Geometry, Texture, Program, Mesh, Text, Transform } from 'ogl';
import { Gl } from './index';

import vertex100 from './shaders/msdf/vertex100.glsl';
import fragment100 from './shaders/msdf/fragment100.glsl';
import vertex300 from './shaders/msdf/vertex300.glsl';
import fragment300 from './shaders/msdf/fragment300.glsl';

import fontFile from '../../assets/Plaid.json';
import fontAtlas from '../../assets/Plaid.png';

export class GLText extends Transform {
  constructor(context, args = {}) {
    super();

    this.gl = context;

    this.string = args.text;

    this.texture = null;
    this.program = null;
    this.text = null;
    this.mesh = null;
    
    this.loadTexture();
    this.createProgram();            
  }

  loadTexture() {
    this.texture = new Texture(this.gl, { generateMipmaps: false });
    const img = new Image();

    img.onload = () => {
      this.texture.image = img;
    };

    img.src = fontAtlas;
  }

  createProgram() {
    this.program = new Program(this.gl, {
      vertex: this.gl.renderer.isWebgl2 ? vertex300 : vertex100,
      fragment: this.gl.renderer.isWebgl2 ? fragment300 : fragment100,
      uniforms: {
        tMap: { value: this.texture },
        uTime: { value: 0 },
      },
      transparent: true,
      cullFace: null,
      // depthWrite: false,
    });
  }

  async loadText() {
    this.text = new Text({
      font: fontFile,
      text: this.string,
      // width: 4,
      // align: 'left',
      letterSpacing: 0.03,
      size: 0.65,
      lineHeight: 1.1,
      color: '#ff0000'
    });

    // Pass the generated buffers into a geometry
    const geometry = new Geometry(this.gl, {
      position: { size: 3, data: this.text.buffers.position },
      uv: { size: 2, data: this.text.buffers.uv },
      id: { size: 1, data: this.text.buffers.id },
      index: { data: this.text.buffers.index },
    });

    this.mesh = new Mesh(this.gl, {
      geometry,
      program: this.program,
    });

    // Use the height value to position text vertically. Here it is centered.
    this.mesh.position.y = this.text.height * 0.5;
    this.addChild(this.mesh);
  }

  updateTime(t) {
    this.program.uniforms.uTime.value = t;
  }
}
