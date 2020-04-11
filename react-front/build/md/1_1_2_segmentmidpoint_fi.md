# Janan keskipiste

**Klikkaa näkymää asettaaksesi janan alku- ja loppupisteen.**
Tällä sivulla lasketaan, tulostetaan ja piirretään janan
keskipiste.

Kaava janan keskipisteen laskemiseen on seuraava:

$$(\frac{x_1 + x_2}{2}, \frac{y_1 + y_2}{2})$$

$x_1$ ja $y_1$ muodostavat janan alkupisteen ja $x_2$ ja $y_2$
loppupisteen.

`LineSegment2D`-luokan metodi, joka laskee keskipisteen, on
seuraava:

```typescript
get midpoint() {
  if (this.startPoint && this.endPoint) {
    const x = (this.startPoint.x + this.endPoint.x) / 2;
    const y = (this.startPoint.y + this.endPoint.y) / 2;
    return new Vector3(x, y, 0);
  }
  return new Vector3();
}
```

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_1_2_segmentmidpoint.ts)
