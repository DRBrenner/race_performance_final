var granimInstance = new Granim({
    element: '#canvas-image-blending',
    direction: 'top-bottom',
    isPausedWhenNotInView: true,
    image: {
      source: '../static/images/bg-forest.jpg',
      blendingMode: 'soft-light'
    },
    states: {
      "default-state": {
        gradients: [
          ['#29323c', '#485563'],
          ['#FF6B6B', '#556270'],
          ['#80d3fe', '#7ea0c4']
        ],
        transitionSpeed: 4000
      }
    }
  });
  