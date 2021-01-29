import { Transform } from 'ogl';
import { GLText } from './gl/GLText';

// Create and arrange 3D text 
export function create3DText(ctx) {
  // Create class instance
  const text1 = new GLText(ctx, { text: 'THE' });
  const text2 = new GLText(ctx, { text: 'F' });
  const text3 = new GLText(ctx, { text: 'GUYS' });

  // Load and create text geometry
  text1.loadText();
  text2.loadText();
  text3.loadText();

  // Position words
  text1.position.set(-2, 0, 0);
  text2.position.set(0.05, 0, 0);
  text3.position.set(-2, -0.75, 0);

  // Group texts in a container
  const group = new Transform();
  group.addChild(text1);
  group.addChild(text2);
  group.addChild(text3);

  console.log(group);

  return group;
}