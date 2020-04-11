# Kulmakerroin ja suuntakulma

** Voit asettaa janan alku- ja loppupisteen klikkaamalla näkymää.**
Mm. janan suuntakulma tulostetaan näytölle.

*Suoran suuntakulma on sen ja positiivisen $x$-akselin välinen kulma.**

<hr />

Suuntakulma riippuu kulmakertoimesta seuraavilla tavoilla:

Jos kulmakerroin on positiivinen, $\rightarrow 0^{\circ} < \alpha < 90^{\circ}$

Jos kulmakerroin on negatiivinen, $\rightarrow -90^{\circ} < \alpha < 0^{\circ}$

Jos suora on vaakasuora, $\rightarrow \alpha = 0^{\circ}$

Jos suora on pystysuora, $\rightarrow \alpha = 90^{\circ}$

<hr />

Kulmakertoimen ja suuntakulman suhde voidaan ilmaista seuraavilla
kaavoilla:

$$k = tan(\alpha), \alpha \neq 90^{\circ}$$

$$\alpha = arctan(k)$$

<hr />

Suuntakulma lasketaan `LineSegment2D`-luokassa seuraavasti:

```typescript
get directionalAngle() {
  if (Number.isNaN(this.slope)) {
    return 90;
  }

  const angleInRadians = Math.atan(this.slope);
  return util.radiansToDegrees(angleInRadians);
}
```

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_2_2_angleslope.ts)
