export const getImagePlaceholder = (width: number, height: number) => {
  const svg = `<svg xmlns="http://www.w3.org/2000/svg" width="${width}" height="${height}" viewBox="0 0 ${width} ${height}"><rect width="100%" height="100%" fill="#d3d3d3"/><text x="50%" y="50%" dominant-baseline="middle" text-anchor="middle" font-family="Arial,sans-serif" font-size="${Math.min(width, height) * 0.06}" fill="#555">Placeholder</text></svg>`;

  return `data:image/svg+xml;base64,${btoa(svg)}`;
};
