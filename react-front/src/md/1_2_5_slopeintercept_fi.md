# Suoran yhtälön ratkaistu muoto

Tällä sivulla piirretään suora suoran yhtälön ratkaistun
muodon avulla.

Kaava on seuraavanlainen:

$y = kx + b$

$k$ on kulmakerroin, ja $b$ on se $y$-koordinaatti, jossa suora
leikkaa $y$-akselin.

<hr />

Piirron aloittaa metodi, joka sijaitsee `SlopeInterceptEquation`-luokassa.

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

`plotLine`-metodi sijaitsee `LineEquation`-kantaluokassa:

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

Voit syöttää vakiot alla olevalla lomakkeella:

<hr />

<div class="form-group">
  <label for="k">Kulmakerroin</label>
  <input type="number" step="0.1" id="k" class="form-control" />
</div>

<div class="form-group">
  <label for="b">Y-akselin leikkauspisteen y-koordinaatti</label>
  <input type="number" step="0.1" id="b" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Piirrä suora</button>
</div>

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_5_slopeintercept.ts)
