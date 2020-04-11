# Kulmakerroin

**Klikkaa näkymää asettaaksesi janan alku- ja loppupisteen.** Janan
kulmakerroin tulostetaan sivulle.

Janan (tai suoran) kulmakerroin lasketaan seuraavalla kaavalla:

$$k = \frac{y_2 - y_1}{x_2 - x_1}$$

Se vastaa tätä kaavaa:

$$k = \frac{\Delta y}{\Delta x}$$

Jos $\Delta x$ on 0, jana (tai suora) on pystysuora, eikä sillä
ole kulmakerrointa, koska laskutoimituksessa yritettäisiin jakaa
nollalla.

Koodissa kulmakerroin lasketaan `LineSegment2D`-luokan seuraavalla
metodilla:

```typescript
get slope() {
  if (this.startPoint && this.endPoint) {
    const deltaY = this.endPoint.y - this.startPoint.y;
    const deltaX = this.endPoint.x - this.startPoint.x;

    // Vertical line
    if (deltaX === 0) {
      return NaN;
    }

    return deltaY / deltaX;
  }

  return 0;
}
```

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_1_slope.ts)
