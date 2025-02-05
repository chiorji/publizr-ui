const imageRepository = ['/field.jpg', '/laptop.jpg', '/lion.jpg', '/planet-neptune.jpg', '/workout.jpg'];

export const useRandomImage = () => {
  return imageRepository[Math.floor(Math.random() * imageRepository.length)];
}