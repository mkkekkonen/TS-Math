# Slope

**Click on the canvas to set line segment start and end points.** The slope
of the line segment is outputted.

The slope of a line can be calculated with the following formula:

$$slope = \frac{y_2 - y_1}{x_2 - x_1}$$

It is equivalent to the following:

$$slope = \frac{\Delta y}{\Delta x}$$

If $\Delta x$ is zero, the line is vertical and has no slope, as
the calculation would result in division by zero.

In the code, slope is calculated with the following method of the `LineSegment2D`
class:

```typescript
get slope() {
  if (this.startPoint && this.endPoint) {
    const deltaY = this.endPoint.y - this.startPoint.y;
    const deltaX = this.endPoint.x - this.startPoint.x;

    // Vertical line
    if (deltaX === 0) {
      return NaN;
    }

    return deltaY / deltaX;
  }

  return 0;
}
```

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_1_slope.ts)
