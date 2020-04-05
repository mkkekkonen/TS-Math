# Distance Between a Point and a Line

The distance between a point and a line is calculated here.
**You can set the location of the point by clicking on the canvas.**
The distance will always be the shortest one, and a line
drawn in that direction will be perpendicular to the original
line.

The formula for calculating the distance is presented below:

$$d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$$

The linear equation is of the form $ax + by + c = 0$. The point
is $(x_0, y_0)$, and $d$ is the distance.

There's a fixed line on the stage, to which the distance is
calculated.

In code the distance is calculated as follows in the `GeneralFormEquation`
class:

```typescript
distanceTo = (v: Vector3) => Math.abs(((this.a * v.x) + (this.b * v.y) + this.c))
  / Math.sqrt((this.a * this.a) + (this.b * this.b));
```

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_3_3_pointlinedist.ts)
