# Suoran ja pisteen välinen etäisyys

Tällä sivulla lasketaan pisteen ja suoran välinen etäisyys.
**Voit asettaa pisteen klikkamalla näkymää.** Etäisyys on
aina lyhin mahdollinen, ja etäisyyttä kuvaava suora on aina
kohtisuorassa toista suoraa vastaan.

Alapuolella on kaava, jolla etäisyys lasketaan:

$$d = \frac{|ax_0 + by_0 + c|}{\sqrt{a^2 + b^2}}$$

Suoran yhtälö on muotoa $ax + by + c = 0$. Piste on $(x_0, y_0)$,
ja $d$ on etäisyys.

Näkymässä on kiinteästi paikallaan oleva suora. Laskettu etäisyys
on pisteen etäisyys tähän suoraan.

Koodissa etäisyys lasketaan seuraavasti `GeneralFormEquation`-luokassa:

```typescript
distanceTo = (v: Vector3) => Math.abs(((this.a * v.x) + (this.b * v.y) + this.c))
  / Math.sqrt((this.a * this.a) + (this.b * this.b));
```

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_3_3_pointlinedist.ts)
