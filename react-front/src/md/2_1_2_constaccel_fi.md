# Tasaisesti kiihtyvä liike

Tällä sivulla käsitellään tasaisesti kiihtyvää liikettä ja
sen suhdetta sijaintiin.

Kiihtyvyys on tasaista, kun se ei muutu ajan kuluessa. Nopeus
kuitenkin muuttuu tällöin.

Kaavat, joissa nopeus lasketaan ajan kuluessa, esitetään alla.
Kaavoissa käytetään kiihtyvyyttä ja alkunopeuden $x$- ja
$y$-komponentteja nopeuden laskemiseen.

$$v_x = v_{0 x} + a_x t$$

$$v_y = v_{0 y} + a_y t$$

Sijainnit lasketaan samalla tavalla.

$x = v_{0 x} t + \frac{1}{2} a_x t^2$

$y = v_{0 y} t + \frac{1}{2} a_y t^2$

<hr />

Koodi, joka päivittää pisteen sijainnin, löytyy
`TimeKinematics2D`-luokasta.

The logic that updates the location of the dot can be found in
the `TimeKinematics2D` class.

```typescript
update = (time: number) => {
  this.totalTime += time;

  const sx = (this.initialVelocity.x * this.totalTime)
    + (0.5 * this.acceleration.x * (this.totalTime ** 2));
  const sy = (this.initialVelocity.y * this.totalTime)
    + (0.5 * this.acceleration.y * (this.totalTime ** 2));
  this.position = new Vector3(sx, sy);

  const vx = this.initialVelocity.x
    + (this.acceleration.x * this.totalTime);
  const vy = this.initialVelocity.y
    + (this.acceleration.y * this.totalTime);
  this.velocity = new Vector3(vx, vy);
}
```

<hr />

Voit syöttää datan alla olevalla lomakkeella ja aloittaa simulaation:

<div class="form-group">
  <label for="v0x">Alkunopeus x</label>
  <input type="number" step="0.1" id="v0x" class="form-control" />
</div>

<div class="form-group">
  <label for="v0y">Alkunopeus y</label>
  <input type="number" step="0.1" id="v0y" class="form-control" />
</div>

<div class="form-group">
  <label for="ax">Kiihtyvyys x</label>
  <input type="number" step="0.1" id="ax" class="form-control" />
</div>

<div class="form-group">
  <label for="ax">Kiihtyvyys y</label>
  <input type="number" step="0.1" id="ay" class="form-control" />
</div>

<div>
  <button id="startButton" type="button" class="btn btn-dark">Aloita</button>
  <button id="resetButton" type="button" class="btn btn-dark">Palauta</button>
</div>

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/2_1_2_constaccel.ts)
