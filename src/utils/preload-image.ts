const decodedImages = new Map<string, Promise<void>>();

export function preloadImage(src: string) {
  let pending = decodedImages.get(src);
  if (!pending) {
    const image = new Image();
    image.src = src;
    pending = image.decode().catch((error) => {
      decodedImages.delete(src);
      throw error;
    });
    decodedImages.set(src, pending);
  }
  return pending;
}
