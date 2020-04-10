# Directional Angle and Slope

**You can set the start and end points of a line segment by
clicking on the canvas.** The directional angle, among other data,
is outputted.

*The directional angle $\alpha$ is the angle of a line relative to the
positive $x$ axis.*

<hr />

The directional angle depends on the slope in the following ways:

If the slope is positive $\rightarrow 0^{\circ} < \alpha < 90^{\circ}$

If the slope is negative $\rightarrow -90^{\circ} < \alpha < 0^{\circ}$

If the line is horizontal $\rightarrow \alpha = 0^{\circ}$

If the line is vertical $\rightarrow \alpha = 90^{\circ}$

<hr />

The relationship between the slope and the directional angle can be
expressed with the following formulas:

$$k = tan(\alpha), \alpha \neq 90^{\circ}$$

$$\alpha = arctan(k)$$

<hr />

The directional angle is calculated in the `LineSegment2D` class as
follows:

```typescript
get directionalAngle() {
  if (Number.isNaN(this.slope)) {
    return 90;
  }

  const angleInRadians = Math.atan(this.slope);
  return util.radiansToDegrees(angleInRadians);
}
```

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_2_angleslope.ts)
