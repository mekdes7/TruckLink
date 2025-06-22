
export const PLACEHOLDER_IMAGES = [
  "/TruckLink_Logo.jpeg",
  "/TruckLink_Logo.jpeg",
  "/TruckLink_Logo.jpeg",
  "/TruckLink_Logo.jpeg"
];

// Helper to pick an image for a job or driver (using id to vary)
export function getImg(idx: string | number, section = "job") {
  return PLACEHOLDER_IMAGES[(typeof idx === "string" ? parseInt(idx, 10) : idx) % PLACEHOLDER_IMAGES.length];
}
