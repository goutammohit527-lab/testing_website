// ===== Moving Car Animation =====
(function () {
  const car3d = document.getElementById('car3d');
  const road = document.getElementById('road');
  const wheelFront = document.querySelector('.car-wheel-wheel-front');
  const wheelBack = document.querySelector('.car-wheel-wheel-back');
  const bgLayer = document.getElementById('bgLayer');

  let carPosition = 0;
  const roadWidth = road.offsetWidth;

  // Drive loop
  function drive() {
    // Move car forward and wrap around the road
    carPosition += 0.4;
    if (carPosition > 100) {
      carPosition = 0;
    }

    // Position the car along the road
    const leftPercent = carPosition;
    car3d.style.left = leftPercent + '%';

    // Rotate wheels for motion effect
    const wheelRotation = carPosition * 360;
    wheelFront.style.transform = `rotateX(-30deg) translateZ(25px) rotate(${wheelRotation}deg)`;
    wheelBack.style.transform = `rotateX(-30deg) translateZ(-25px) rotate(${wheelRotation}deg)`;

    // Subtle car tilt and bobbing for dynamic feel
    const tilt = Math.sin(carPosition * Math.PI / 20) * 2;
    car3d.style.transform = `translateY(-50%) translateZ(120px) rotateY(-5deg) rotateX(${3 + tilt}deg)`;

    const bob = Math.sin(carPosition * 2) * 2;
    car3d.style.marginTop = (-50 + bob + 'px');

    // Subtle background movement
    if (bgLayer) {
      const shift = Math.sin(carPosition * 0.5) * 15;
      bgLayer.style.transform = `translate(${shift}px, ${shift * 0.7}px) scale(${1 + Math.sin(carPosition * 0.3) * 0.01})`;
    }

    requestAnimationFrame(drive);
  }

  // Start the animation
  requestAnimationFrame(drive);

  // ===== Keyboard control: Space = pause/resume =====
  let isPaused = false;
  document.addEventListener('keydown', (e) => {
    if (e.code === 'Space') {
      isPaused = !isPaused;
      if (!isPaused) {
        requestAnimationFrame(drive);
      }
    }
  });

  // ===== Window resize handling =====
  window.addEventListener('resize', () => {
    car3d.style.left = carPosition + '%';
  });
})();
