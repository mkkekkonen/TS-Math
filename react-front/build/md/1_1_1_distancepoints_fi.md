# Kahden pisteen välinen etäisyys

**Tällä sivulla janan alku- ja loppupisteen voi asettaa
klikkaamalla näkymää, johon jana piirretään.** Janan pituus
tulostetaan sivulle.

`Vector3`-luokan metodi, joka laskee pisteiden välisen etäisyyden,
on seuraavanlainen:

```typescript
distanceFrom = (vector: Vector3) => Math.sqrt(
  ((vector.x - this.x) ** 2) + ((vector.y - this.y) ** 2)
);
```

Ts. se on käytännössä Pythagoraan lause:

$$\sqrt{(x_{2} - x_{1})^2 + (y_{2} - y_{1})^2}$$

jossa $x_1$ ja $x_2$ muodostavat alkupisteen ja $x_2$ ja $y_2$
loppupisteen.

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_1_1_distancepoints.ts)
