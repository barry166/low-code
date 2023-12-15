import { CollisionDetection } from "@dnd-kit/core";

const mousePositionCollisionDetection: CollisionDetection = (args) => {
  const { droppableRects, pointerCoordinates } = args;

  if (!pointerCoordinates) {
    return [];
  }

  const { x, y } = pointerCoordinates;
  const collisions = [];

  for (const [id, rect] of Object.entries(droppableRects)) {
    if (
      x >= rect.left &&
      x <= rect.right &&
      y >= rect.top &&
      y <= rect.bottom
    ) {
      collisions.push({ id });
    }
  }

  return collisions;
};

export default mousePositionCollisionDetection;
