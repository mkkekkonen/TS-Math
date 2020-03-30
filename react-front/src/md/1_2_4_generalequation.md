# General-Form Equation

Here you can plot a line based on the general-form equation.

The formula is:

$ax + by + c = 0$

$a$, $b$ and $c$ are constants.

Note that either $a$, $b$ or both have to be non-zero.

<hr />

The method responsible for initiating the draw is found in the
class `GeneralFormEquation`:

```typescript
renderLine = (
  layer: Konva.Layer,
  worldWidth = constants.worldWidth,
  worldHeight = constants.worldHeight,
  viewportMatrix = util.defaultViewportMatrix,
) => {
  if (!this.a && !this.b) {
    // do nothing
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

<hr />

You can input the constants below.

<div class="form-group">
  <label for="a">a</label>
  <input type="number" step="0.1" id="a" class="form-control" />
</div>

<div class="form-group">
  <label for="b">b</label>
  <input type="number" step="0.1" id="b" class="form-control" />
</div>

<div class="form-group">
  <label for="c">c</label>
  <input type="number" step="0.1" id="c" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Draw line</button>
</div>
