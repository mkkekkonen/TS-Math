# Liike tasossa

**Tällä sivulla "avaruusalusta" voi liikuttaa nuolinäppäimillä.**

<hr />

Nopeus tasossa tarkoittaa kappaleen liikettä kaksiulotteisella
tasolla. Tähän asiaan liittyy useita kaavoja.

## Paikkavektori

Kappaleen paikkavektori kaksiulotteisessa tasossa on seuraava:

$$\bar r = x \bar i + y \bar j$$

$\bar i$- ja $\bar j$-vektorit ovat $x$- ja $y$-akselien suuntaan
osoittavia yksikkövektoreita. $x$- ja $y$-arvot ovat skalaareja
(eli lukuarvoja), jotka kuvaavat kappaleen etäisyyttä origosta.

## Keskinopeus

Keskinopeus lasketaan seuraavalla kaavalla:

$$\bar v_k = \frac{\Delta \bar r}{\Delta t}$$

$\Delta t$ on aikavälin suuruus, jonka aikana nopeus mitataan.

## Vauhti

Vauhti on skalaarisuure, eli sillä ei ole suuntaa. Se on
nopeusvektorin itseisarvo eli "pituus".

Vauhti voidaan laskea seuraavalla kaavalla:

$$|\bar v| = \sqrt{v_x^2 + v_y^2}$$

## Keskikiihtyvyys

Keskikiihtyvyys tietyllä aikavälillä lasketaan jakamalla
nopeusvektori ajan muutoksella. Kaava on seuraavanlainen:

$$\bar a_k = \frac{\Delta \bar v}{\Delta t}$$

## Hetkellinen nopeus ja kiihtyvyys

Nopeus ja kiihtyvyys tietyllä hetkellä voidaan laskea edellä
esitetyillä kaavoilla, jos $\Delta t$ eli ajan muutos on pieni.

<hr />

Avaruusaluksen keskeisin hallintakoodi sijaitsee
`ObjectKinematics2D`-luokassa:

```typescript
 update = (time: number, { yAxis, turnLeft, turnRight }: IUpdateOptions) => {
  const direction = Vector3.fromPolarCoordinates(this.direction);

  if (yAxis !== undefined) {
    this.accelerationScalar = yAxis;
  }

  const velocityDelta = direction.multiplyScalar(this.accelerationScalar * time);
  this.velocity = this.velocity.add(velocityDelta);

  const positionDelta = this.velocity.multiplyScalar(time);
  this.position = this.position.add(positionDelta);

  if (turnLeft) {
    this.turnLeft(time);
  } else if (turnRight) {
    this.turnRight(time);
  }
}
```

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/2_1_1_planarvelocity.ts)
