# Kitka - vaakasuora pinta ja vino ulkoinen voima

Kuten edelliselläkin sivulla, liikekitka lasketaan seuraavasti:

$F_μ = μN$

Tässä $μ$ on kitkakerroin ja $N$ on vaakasuoraa pintaa vastaan
kohtisuorasti oleva voima.

Kun ulkoinen voima on *vino*, pintaa vastaan *kohtisuora* voima on:

$N = mg - F sin \alpha$

jossa $m$ on kappaleen massa, $g$ on putoamiskiihtyvyys, $F$ on ulkoinen eli
vetävä voima, ja $\alpha$ on vinon voiman kulma $x$-akseliin nähden.

Tällöin ulkoisen voiman $y$-komponentti vähentää pintaa vastaan kohtisuoraan
olevaa voimaa (eli painovoimaa). Ulkoisen voiman $x$-komponentti puolestaan
liikuttaa kappaletta vaakasuunnassa, jos sen suuruus on suurempi kuin
kitkavoiman.

(Tällä sivulla ei ole käytetty trigonometriaa, koska ulkoisen voiman
$y$-komponentti voidaan lukea suoraan ulkoista voimaa edustavasta
vektorista.)

Voit syöttää kappaleen massan ja kitkakertoimen alla. Sitten voit vetää
kappaletta raahaamalla hiirellä näkymässä. Klikkaa "Aloita" aloittaksesi
simulaation.

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
