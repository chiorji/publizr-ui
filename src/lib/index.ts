const imageRepository = ['/field.jpg', '/laptop.jpg', '/lion.jpg', '/planet-neptune.jpg', '/workout.jpg'];

export const getRandomImagePlaceholder = () => {
  return imageRepository[Math.floor(Math.random() * imageRepository.length)];
}