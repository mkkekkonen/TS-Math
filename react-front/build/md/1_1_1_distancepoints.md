# Distance Between two Points

**Here you can set the start and end points of a line segment by
clicking on the canvas**. The length of the line segment is
outputted to the page.

The method of the `Vector3` class that calculates the distance
between the two points is as follows:

```typescript
distanceFrom = (vector: Vector3) => Math.sqrt(((vector.x - this.x) ** 2)
  + ((vector.y - this.y) ** 2));
```

I.e. it's a simple Pythagorean theorem:

$$\sqrt{(x_{2} - x_{1})^2 + (y_{2} - y_{1})^2}$$

where $x_1$ and $y_1$ form the start point and $x_2$ and $y_2$ the end point.

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_1_1_distancepoints.ts)
