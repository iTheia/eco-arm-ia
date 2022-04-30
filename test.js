function convertCordsToCm(cords) {
    const pixelX = 1400;
    const cmX = 15;
    const pixelY = 1400;
    const cmY = 15;
    return {
      x: (cords.x - pixelX / 2) / (pixelX / cmX / 2),
      y: cords.y / (pixelY / cmY),
    };
  }

  console.log(convertCordsToCm({

  }))