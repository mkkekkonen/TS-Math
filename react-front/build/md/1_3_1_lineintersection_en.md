# Line Intersection

Line intersection is tested on this page. There's a fixed line,
and you can input the parameters of the other line manually.

The intersection point is calculated by solving a system of
equations containing the equations of each line. The result
is the $x$ and $y$ coordinates of the intersection point.

Lines can have

- one point in common, if they intersect

- no common points, if they are parallel

- and an infinite number of common points, if they are equal.

<hr />

The code that calculates the intersection is currently found only
in the `SlopeInterceptEquation` class.

```typescript
lineIntersects = (otherLine: LineEquation) => {
  if (!(otherLine instanceof SlopeInterceptEquation)) {
    return false;
  }

  const otherSlopeIntercept = otherLine as SlopeInterceptEquation;

  if (this.slope === otherSlopeIntercept.slope
      && this.yIntercept === otherSlopeIntercept.yIntercept) {
    return true;
  }

  if (this.slope === otherSlopeIntercept.slope
      && this.yIntercept !== otherSlopeIntercept.yIntercept) {
    return false;
  }

  const xFactor = this.slope - otherSlopeIntercept.slope;
  const constant = otherSlopeIntercept.yIntercept - this.yIntercept;

  const x = constant / xFactor;
  const y = (this.slope * x) + this.yIntercept;

  return new Vector3(x, y);
}
```

<hr />

You can input the slope and the y-intercept below.

<div class="form-group">
  <label for="k">Slope (m)</label>
  <input type="number" step="0.1" id="k" class="form-control" />
</div>

<div class="form-group">
  <label for="b">Y intercept (b)</label>
  <input type="number" step="0.1" id="b" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Draw line</button>
</div>

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_3_1_lineintersection.ts)
