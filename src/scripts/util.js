import { Transform } from 'ogl';
import { GLText } from './gl/GLText';

// Create and arrange 3D text 
export function create3DText(ctx) {
  // Create class instance
  const text1 = new GLText(ctx, { text: 'THE', color: [1.0, 1.0, 1.0] });
  const text2 = new GLText(ctx, { text: 'F', color: [0.0, 1.0, 0.4588]});
  const text3 = new GLText(ctx, { text: 'GUYS', color: [1.0, 1.0, 1.0] });

  // Load and create text geometry
  text1.loadText();
  text2.loadText();
  text3.loadText();

  // Calculate bounding box to arrange text
  text1.mesh.geometry.computeBoundingBox();
  text2.mesh.geometry.computeBoundingBox();
  text3.mesh.geometry.computeBoundingBox();

  const text1width = text1.mesh.geometry.bounds.max.x - text1.mesh.geometry.bounds.min.x;
  const text1height = text1.mesh.geometry.bounds.max.y - text1.mesh.geometry.bounds.min.y;
  const text3width = text3.mesh.geometry.bounds.max.x - text3.mesh.geometry.bounds.min.x;    
  const text3height = text3.mesh.geometry.bounds.max.y - text3.mesh.geometry.bounds.min.y;    

  // Position words
  text2.position.set(text1width + 0.2, 0.0, 0.0);
  text3.position.set(0.0, -text1height * 1.1, 0.0);    

  // Group texts in a container
  const group = new Transform();
  group.addChild(text1);
  group.addChild(text2);
  group.addChild(text3);

  group.position.set(-text3width / 2, (text3height / 2) * 1.1, 0);

  return group;
}