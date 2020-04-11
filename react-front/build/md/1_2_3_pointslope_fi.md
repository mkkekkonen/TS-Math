# Pisteen kautta kulkevan suoran yhtälö

Tällä sivulla piirretään suora, joka kulkee tietyn pisteen
kautta.

Suoran yhtälö tässä muodossa on

$$y - y_0 = k(x - x_0)$$

missä $(x_0, y_0)$ on piste ja $k$ on kulmakerroin.

<hr />

Koodi, jolla suora piirretään, sisältyy useaan eri luokkaan. Kaikkein
tärkein piirtometodi sijaitsee `PointSlopeEquation`-luokassa:

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

Voit syöttää kulmakertoimen ja pisteen koordinaatit alla
olevalla lomakkeella.

<div>
  <div class="custom-control custom-checkbox">
    <input type="checkbox" class="custom-control-input" id="vertical" />
    <label class="custom-control-label" for="vertical">Ei kulmakerrointa (pystysuora)</label>
  </div>
</div>

<div class="form-group">
  <label for="slope">Kulmakerroin</label>
  <input type="number" step="0.1" id="slope" class="form-control" />
</div>

<div class="form-group">
  <label for="x">Pisteen x-koordinaatti</label>
  <input type="number" step="0.1" id="x" class="form-control" />
</div>

<div class="form-group">
  <label for="y">Pisteen y-koordinaatti</label>
  <input type="number" step="0.1" id="y" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Piirrä suora</button>
</div>

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_3_pointslope.ts)
