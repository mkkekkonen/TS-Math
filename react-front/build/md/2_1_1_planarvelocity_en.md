# Planar Velocity

**Here you can move the "ship" with arrow keys.**

<hr />

Planar velocity means velocity of an object on a two-dimensional
plane. There are multiple formulas related to this topic.

## The Position Vector

The position vector of an object on a 2D plane is of the following
form:

$$\bar r = x \bar i + y \bar j$$

The $\bar i$ and $\bar j$ vectors are unit vectors pointing to the
directions of the $x$ and $y$ axes, respectively. The $x$ and $y$
values are scalars representing the objects's distance from the
origin.

## Average Velocity

Average velocity is calculated with the following formula:

$$\bar v_k = \frac{\Delta \bar r}{\Delta t}$$

$\Delta t$ is the time during which the velocity is measured.

## Speed

Speed is a scalar quantity, i.e. it does not have a direction.
It is the absolute value or "length" of the velocity vector.

The formula for calculating speed is the following:

$$|\bar v| = \sqrt{v_x^2 + v_y^2}$$

## Average Acceleration

Average acceleration during a time interval is calculated by
dividing the velocity vector with the time delta. The formula
is as follows:

$$\bar a_k = \frac{\Delta \bar v}{\Delta t}$$

## Velocity and Acceleration at a Given Moment

Velocity and acceleration at a given moment can be
calculated with the preceding formulas, given
$\Delta t$ is small.

<hr />

The "beef" of the ship handling code can be found in the
`ObjectKinematics2D` class:

```typescript
 update = (time: number, { yAxis, turnLeft, turnRight }: IUpdateOptions) => {
  const direction = Vector3.fromPolarCoordinates(this.direction);

  if (yAxis !== undefined) {
    this.accelerationScalar = yAxis;
  }

  const velocityDelta = direction.multiplyScalar(this.accelerationScalar * time);
  this.velocity = this.velocity.add(velocityDelta);

  const positionDelta = this.velocity.multiplyScalar(time);
  this.position = this.position.add(positionDelta);

  if (turnLeft) {
    this.turnLeft(time);
  } else if (turnRight) {
    this.turnRight(time);
  }
}
```

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/2_1_1_planarvelocity.ts)
