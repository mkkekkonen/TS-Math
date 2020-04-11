# Suorien leikkauspiste

Tällä sivulla lasketaan kahden suoran välinen leikkauspiste. 
Sivulla on kiinteästi paikallaan oleva suora. Toisen suoran
parametrit voi syöttää lomakkeella.

Leikkauspiste lasketaan ratkaisemalla yhtälöpari, joka sisältää
kummankin suoran yhtälöt. Tuloksena on leikkauspisteen $x$- ja
$y$-koordinaatit.

Suorilla voi olla

- yksi yhteinen piste, jos ne leikkaavat,

- ei yhtään yhteistä pistettä, jos ne ovat yhdensuuntaiset mutta
eivät yhdy, ja

- ääretön määrä yhteisiä pisteitä, jos ne yhtyvät (eli ovat täsmälleen
samat).

<hr />

Koodi, joka laskee leikkauspisteen, löytyy tällä hetkellä vain
`SlopeInterceptEquation`-luokasta.

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

Voit syöttää kulmakertoimen ja y-akselin leikkauspisteen y-koordinaatin
alla olevalla lomakkeella.

<div class="form-group">
  <label for="k">Kulmakerroin (k)</label>
  <input type="number" step="0.1" id="k" class="form-control" />
</div>

<div class="form-group">
  <label for="b">Y-akselin leikkauspisteen y-koordinaatti (b)</label>
  <input type="number" step="0.1" id="b" class="form-control" />
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Piirrä suora</button>
</div>

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_3_1_lineintersection.ts)
