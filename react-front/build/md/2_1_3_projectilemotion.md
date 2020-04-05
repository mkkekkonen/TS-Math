# Projectile Motion

Projectile motion is demonstrated on this page. **You can "throw
a ball" by clicking on the canvas.** The initial velocity vector
is drawn as a line segment.

The initial $x$ and $y$ components of the velocity are calculated
as follows:

$$v_{0x} = v_0 cos \alpha_0$$

$$v_{0y} = v_0 sin \alpha_0$$

The formulas for calculating the velocity of the thrown
object at a given time are the following:

$$v_x = v_{0x}$$

$$v_y = v_{0y} - gt$$

The location coordinates of the thrown object at a given time
can be calculated with the formulas below:

$$x = v_{0x} t$$

$$y = v_{0y} t - \frac{1}{2} g t^2$$

<hr />

The logic that calculates the location of the projectile can be
found in the `ProjectileKinematics2D` class:

```typescript
update = (time: number) => {
  this.totalTime += time;

  const x = this.initialPosition.x + (this.initialVelocity.x * this.totalTime);

  const y = this.initialPosition.y
    + (this.initialVelocity.y * this.totalTime)
    + (0.5 * accelerationGravity.y
      * (this.totalTime ** 2));

  this.position = new Vector3(x, y);
}
```
