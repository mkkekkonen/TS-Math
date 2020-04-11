# Angle Between Lines

You can calculate the angle between two lines on this page.
One of the lines is fixed, the other is plotted according to
the parameters inputted.

The angle between lines is always greater than zero degrees and
smaller than 90 degrees.

$0^\circ < \angle (l_1, l_2) < 90^\circ$

The angle between lines is calculated either with the directional
angles or with the following formula:

$tan \alpha = |\frac{k_1 - k_2}{1 + k_1 k_2}|$

If the denominator is zero, the formula cannot be used. In that
case, the angle is 90 degrees.

Also, if at least one of the lines is vertical, the formula cannot be
used either.

<hr />

The calculation code is currently found only in the `SlopeInterceptEquation`
class:

```typescript
angleBetween = (otherLine: LineEquation) => {
  if (!(otherLine instanceof SlopeInterceptEquation)) {
    return 0;
  }

  const otherSlopeIntercept = otherLine as SlopeInterceptEquation;

  const tangent = Math.abs(
    (this.slope - otherSlopeIntercept.slope)
      / (1 - (this.slope * otherSlopeIntercept.slope)),
  );

  return Math.atan(tangent);
}
```

<hr />

The parameters of the slope-intercept line can be inputted below:

<div class="form-group">
  <label for="k">Slope</label>
  <input type="number" step="0.1" id="k" class="form-control" />
</div>

<div class="form-group">
  <label for="b">Y intercept</label>
  <input type="number" step="0.1" id="b" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Draw line</button>
</div>

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_3_2_anglelines.ts)
