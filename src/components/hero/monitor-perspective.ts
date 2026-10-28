export const MONITOR_CORNERS = [
  { x: 1018, y: 444 },
  { x: 1245, y: 483 },
  { x: 1241, y: 635 },
  { x: 1015, y: 570 },
] as const;

export const MONITOR_SIZE = { width: 224, height: 160 };
export const MONITOR_PATH = `${MONITOR_CORNERS.map(({ x, y }, index) => `${index === 0 ? "M" : "L"}${x} ${y}`).join("")}Z`;

function monitorProjection() {
  const [topLeft, topRight, bottomRight, bottomLeft] = MONITOR_CORNERS;
  const { width, height } = MONITOR_SIZE;
  const dx1 = topRight.x - bottomRight.x;
  const dx2 = bottomLeft.x - bottomRight.x;
  const dx3 = topLeft.x - topRight.x + bottomRight.x - bottomLeft.x;
  const dy1 = topRight.y - bottomRight.y;
  const dy2 = bottomLeft.y - bottomRight.y;
  const dy3 = topLeft.y - topRight.y + bottomRight.y - bottomLeft.y;
  const determinant = dx1 * dy2 - dx2 * dy1;
  const perspectiveX = (dx3 * dy2 - dx2 * dy3) / determinant;
  const perspectiveY = (dx1 * dy3 - dx3 * dy1) / determinant;
  return [
    (topRight.x - topLeft.x + perspectiveX * topRight.x) / width,
    (topRight.y - topLeft.y + perspectiveX * topRight.y) / width,
    0,
    perspectiveX / width,
    (bottomLeft.x - topLeft.x + perspectiveY * bottomLeft.x) / height,
    (bottomLeft.y - topLeft.y + perspectiveY * bottomLeft.y) / height,
    0,
    perspectiveY / height,
    0,
    0,
    1,
    0,
    topLeft.x,
    topLeft.y,
    0,
    1,
  ];
}

export const MONITOR_TRANSFORM = `matrix3d(${monitorProjection().join(",")})`;
