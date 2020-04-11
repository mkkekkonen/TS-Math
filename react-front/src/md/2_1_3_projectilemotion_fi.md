# Vino heittoliike

Tällä sivulla havainnollistetaan vinoa heittoliikettä. **Voit
"heittää pallon" klikkaamalla näkymää.** Alkunopeusvektori
visualisoidaan janan avulla.

Alkunopeuden $x$- ja $y$-komponentit lasketaan seuraavasti:

$$v_{0x} = v_0 cos \alpha_0$$

$$v_{0y} = v_0 sin \alpha_0$$

Kaavat heitetyn kappaleen nopeuden laskemiseen tietyllä ajan
hetkellä ovat seuraavat:

$$v_x = v_{0x}$$

$$v_y = v_{0y} - gt$$

Heitetyn kappaleen sijainnin koordinaatit tietyllä ajan
hetkellä voidaan laskea alla olevilla kaavoilla:

$$x = v_{0x} t$$

$$y = v_{0y} t - \frac{1}{2} g t^2$$

<hr />

Koodi, jolla lasketaan heitetyn kappaleen sijainti, löytyy
`ProjectileKinematics2D`-luokasta:

```typescript
update = (time: number) => {
  this.totalTime += time;

  const x = this.initialPosition.x + (this.initialVelocity.x * this.totalTime);

  const y = this.initialPosition.y
    + (this.initialVelocity.y * this.totalTime)
    + (0.5 * accelerationGravity.y
      * (this.totalTime ** 2));

  this.position = new Vector3(x, y);
}
```

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/2_1_3_projectilemotion.ts)
