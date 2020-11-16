const flock = [];
const predators = [];

function setup() {
  createCanvas(1200, 1000);
  for (let i = 0; i < 100; i++) {
    flock.push(new Boid());
  }
  for (let i = 0; i < 5; i++) {
    predators.push(new Predator());
  }
}

function updateFlock() {
  flock.push(new Boid());
}

function draw() {
  background(51);

  for (let boid of flock) {
    boid.edges();
    boid.flock(flock, predators);
    boid.update();
    boid.show();
  }
  for (let predator of predators) {
    predator.edges();
    predator.flock(flock, predators);
    predator.update();
    predator.show();
  }
}
