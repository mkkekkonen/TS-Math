# Constant Acceleration and Location

Constant acceleration and the location relative to it is
demonstrated on this page.

Acceleration is constant when it does not change over time.
The velocity changes, however.

The formulas for calculating velocity over time are presented
below. We use the $x$ and $y$ components of the initial velocity and
the acceleration in calculating the velocity.

$$v_x = v_{0 x} + a_x t$$

$$v_y = v_{0 y} + a_y t$$

The locations are calculated in a similar manner.

$x = v_{0 x} t + \frac{1}{2} a_x t^2$

$y = v_{0 y} t + \frac{1}{2} a_y t^2$

<hr />

The logic that updates the location of the dot can be found in
the `TimeKinematics2D` class.

```typescript
update = (time: number) => {
  this.totalTime += time;

  const sx = (this.initialVelocity.x * this.totalTime)
    + (0.5 * this.acceleration.x * (this.totalTime ** 2));
  const sy = (this.initialVelocity.y * this.totalTime)
    + (0.5 * this.acceleration.y * (this.totalTime ** 2));
  this.position = new Vector3(sx, sy);

  const vx = this.initialVelocity.x
    + (this.acceleration.x * this.totalTime);
  const vy = this.initialVelocity.y
    + (this.acceleration.y * this.totalTime);
  this.velocity = new Vector3(vx, vy);
}
```

<hr />

Here you can input the data and start the simulation:

<div class="form-group">
  <label for="v0x">Initial velocity x</label>
  <input type="number" step="0.1" id="v0x" class="form-control" />
</div>

<div class="form-group">
  <label for="v0y">Initial velocity y</label>
  <input type="number" step="0.1" id="v0y" class="form-control" />
</div>

<div class="form-group">
  <label for="ax">Acceleration x</label>
  <input type="number" step="0.1" id="ax" class="form-control" />
</div>

<div class="form-group">
  <label for="ax">Acceleration y</label>
  <input type="number" step="0.1" id="ay" class="form-control" />
</div>

<div>
  <button id="startButton" type="button" class="btn btn-dark">Start</button>
  <button id="resetButton" type="button" class="btn btn-dark">Reset</button>
</div>
