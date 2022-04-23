# Kitka - Vaakasuora pinta ja vaakasuora ulkoinen voima

Kappaleeseen kohdistuva liikekitka lasketaan kaavalla

$F_μ = μN$

jossa $μ$ on kitkakerroin ja $N$ on pintaa vastaan kohtisuora voima.

Vaakasuoran ulkoisen voiman tapauksessa tämä voima on

$N = mg$

jossa $m$ on liikkuvan kappaleen massa ja $g$ on putoamiskiihtyvyys
($9.81 \frac{m}{s^2}$).

Voit antaa kappaleen massan ja kitkakertoimen alla olevalla lomakkeella.
Sitten voit vetää kappaletta klikkaamalla näkymää. Paina Aloita-nappia
aloittaaksesi simulaation:

<div class="form-group">
  <label for="mu">Kitkakerroin</label>
  <input type="number" step="0.1" id="mu" class="form-control" />
</div>

<div class="form-group">
  <label for="m">Massa kg</label>
  <input type="number" step="0.1" id="m" class="form-control" />
</div>

<div>
  <button id="startButton" type="button" class="btn btn-dark">Aloita</button>
</div>
