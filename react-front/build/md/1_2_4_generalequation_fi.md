# Suoran yhtälön yleinen muoto

Tällä sivulla piirretään suora suoran yhtälön yleisen muodon
avulla.

Kaava on seuraava:

$ax + by + c = 0$

$a$, $b$ ja $c$ ovat vakioita (eli numeroarvoja).

Huomaa, ettö joko $a$:n, $b$:n tai molempien tulee olla eri
suuria kuin nolla.

<hr />

Metodi, jolla piirto aloitetaan, sijaitsee `GeneralFormEquation`
-luokassa:

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

<hr />

Voit syöttää vakiot alla olevalla lomakkeella.

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
  <button id="drawButton" type="button" class="btn btn-dark">Piirrä suora</button>
</div>

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_4_generalequation.ts)
