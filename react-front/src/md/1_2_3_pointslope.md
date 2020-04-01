# Point-Slope Equation

Here you can plot a line that goes through a specific point.

The linear equation in point-slope form is

$$y - y_0 = m(x - x_0)$$

where $(x_0, y_0)$ forms the point and $m$ is the slope.

<hr />

The code for drawing the line is distributed among several classes.
The most important drawing method can be found in the `PointSlopeEquation`
class:

```typescript
renderLine = (
  layer: Konva.Layer,
  worldWidth = constants.worldWidth,
  worldHeight = constants.worldHeight,
  viewportMatrix = util.defaultViewportMatrix,
) => {
  if ((this.slope
      || this.slope === 0
      || (this.slope !== undefined && Number.isNaN(this.slope))) && this.point) {
    if (Number.isNaN(this.slope)) {
      this.plotVerticalLine(layer, worldHeight, viewportMatrix);
    } else {
      this.plotLine(layer, worldWidth, viewportMatrix);
    }
  }
}
```

<hr />

You can input the slope and the coordinates below.

<div>
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="vertical" />
    <label class="custom-control-label" for="vertical">No slope (vertical line)</label>
  </div>
</div>

<div class="form-group">
  <label for="slope">Slope</label>
  <input type="number" step="0.1" id="slope" class="form-control" />
</div>

<div class="form-group">
  <label for="x">Point X coordinate</label>
  <input type="number" step="0.1" id="x" class="form-control" />
</div>

<div class="form-group">
  <label for="y">Point Y coordinate</label>
  <input type="number" step="0.1" id="y" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Draw line</button>
</div>

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_3_pointslope.ts)
