class Predator {
  constructor() {
    this.position = createVector(random(width), random(height));
    this.velocity = p5.Vector.random2D();
    this.velocity.setMag(random(2, 4))
    this.acceleration = createVector();
    this.MF = 0.2;
    this.MS = 4;
  }

  edges() {
    if (this.position.x > width) {
      this.position.x = 0;
    } else if (this.position.x < 0) {
      this.position.x = width;
    }
    if (this.position.y > height) {
      this.position.y = 0;
    } else if (this.position.y < 0) {
      this.position.y = height;
    }
  }

  align(boids) {
    let perceptionR = 70;
    let total = 0;
    let average = createVector();
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
      if ( other != this && d < perceptionR) {
        average.add(other.velocity);
        total++;
      }
    }
    if (total > 0) {
      average.div(total);
      average.setMag(this.MS);
      average.sub(this.velocity);
      average.limit(this.MF)
    }
    return average;
  }

  cohesion(boids) {
    let perceptionR = 70;
    let total = 0;
    let average = createVector();
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y)
      if ( other != this && d < perceptionR) {
        average.add(other.position);
        total++;
      }
    }
    if (total > 0) {
      average.div(total);
      average.sub(this.position);
      average.setMag(this.MS);
      average.sub(this.velocity);
      average.limit(this.MF)
    }
    return average;
  }

  seperation(boids) {
    let perceptionR = 30;
    let total = 0;
    let average = createVector();
    for (let other of boids) {
      let d = dist(this.position.x, this.position.y, other.position.x, other.position.y);
      if ( other != this && d < perceptionR) {
        let dif = p5.Vector.sub(this.position, other.position);
        dif.div(d);
        average.add(dif);
        total++;
      }
    }
    if (total > 0) {
      average.div(total);
      average.setMag(this.MS);
      average.sub(this.velocity);
      average.limit(this.MF)
    }
    return average;
  }

  flock(flock, predators) {
    this.acceleration.set(0,0);
    let alignment = this.align(flock);
    let cohesion = this.cohesion(flock);
    let seperation = this.seperation(predators);
    this.acceleration.add(alignment);
    this.acceleration.add(cohesion);
    this.acceleration.add(seperation);
  }

  update() {
    this.position.add(this.velocity);
    this.velocity.add(this.acceleration)
    this.velocity.limit(this.MS)
  }

  show() {
    strokeWeight(8);
    stroke(100);
    point(this.position.x, this.position.y);
  }
}
