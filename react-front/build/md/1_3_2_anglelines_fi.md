# Suorien välinen kulma

Tällä sivulla lasketaan suorien välinen kulma. Sivulla on
kiinteästi paikallaan oleva suora. Toinen suora piirretään
annettujen parametrien perusteella.

Suorien välinen kulma on aina suurempi kuin nolla astetta ja
pienempi kuin 90 astetta.

$0^\circ < \angle (l_1, l_2) < 90^\circ$

Suorien välinen kulma lasketaan joko suuntakulmien tai seuraavan
kaavan avulla:

$tan \alpha = |\frac{k_1 - k_2}{1 + k_1 k_2}|$

Jos nimittäjä on nolla, kaavaa ei voida käyttää. Tällöin kulma
on 90 astetta.

Lisäksi jos ainakin toinen suorista on pystysuora, kaavaa ei
voida käyttää.

<hr />

Kulman laskentakoodi löytyy tällä hetkellä vain `SlopeInterceptEquation`-luokasta:

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

Suoran yhtälön ratkaistun muodon parametrit voi syöttää alla
olevalla lomakkeella:

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

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_3_2_anglelines.ts)
