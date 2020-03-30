# Slope-Intercept Equation

Here you can plot a line based on the slope-intercept equation.

The formula:

$y = mx + b$

$m$ is the slope, and $b$ is the $y$ coordinate where the line crosses
the $y$ axis.

<hr />

The method responsible for initiating the draw is found in the class
`SlopeInterceptEquation`:

```typescript
renderLine = (
  layer: Konva.Layer,
  worldWidth = constants.worldWidth,
  worldHeight = constants.worldHeight,
  viewportMatrix = util.defaultViewportMatrix,
) => {
  if (this.slope === 0) {
    this.plotVerticalLine(layer, worldHeight, viewportMatrix);
  } else {
    this.plotLine(layer, worldWidth, viewportMatrix);
  }
}
```

The `plotLine` method is found in the `LineEquation` base class:

```typescript
plotLine = (
  layer: Konva.Layer,
  worldWidth = constants.worldWidth,
  viewportMatrix = util.defaultViewportMatrix,
) => {
  const startXCoordinate = -(worldWidth / 2);
  const endXCoordinate = worldWidth / 2;

  const startYCoordinate = this.calculateY(startXCoordinate);
  const segmentStartPoint = viewportMatrix.multiplyVector(
    new Vector3(startXCoordinate, startYCoordinate),
  );

  const endYCoordinate = this.calculateY(endXCoordinate);
  const segmentEndPoint = viewportMatrix.multiplyVector(
    new Vector3(endXCoordinate, endYCoordinate),
  );

  this.konvaLine = util.plotKonvaLineSegment(
    layer, segmentStartPoint, segmentEndPoint, this.strokeColor, this.strokeWidth,
  );
}
```

You can input the constants below:

<hr />

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
