# The Midpoint of a Line Segment

**Click on the canvas to set line segment start and end points.**
The midpoint of the line segment is calculated, outputted and
rendered.

The formula for calculating the midpoint is the following:

$$(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2})$$

$x_1$ and $y_1$ form the start point and $x_2$ and $y_2$ form
the end point of the line segment.

The code of the `LineSegment2D` class that calculates the midpoint
is as follows:

```typescript
get midpoint() {
  if (this.startPoint && this.endPoint) {
    const x = (this.startPoint.x + this.endPoint.x) / 2;
    const y = (this.startPoint.y + this.endPoint.y) / 2;
    return new Vector3(x, y, 0);
  }
  return new Vector3();
}
```

The `this.startPoint` and `this.endPoint` variables are of type `Vector3`,
here representing points.

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_1_2_segmentmidpoint.ts)
