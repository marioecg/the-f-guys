#version 300 es
precision highp float;
precision highp int;

uniform sampler2D tMap;
uniform float uTime;

in vec2 vUv;
out vec4 color;

void main() {
  vec3 tex = texture(tMap, vUv).rgb;
  float signedDist = max(min(tex.r, tex.g), min(max(tex.r, tex.g), tex.b)) - 0.5;
  float d = fwidth(signedDist);
  float alpha = smoothstep(-d, d, signedDist);

  if (alpha < 0.01) discard;

  
  color.rgb = vec3(0.0);
  color.a = alpha;
}