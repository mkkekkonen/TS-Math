# Raja-arvon laskusäännöt

Funktion raja-arvo voidaan laskea käyttämällä raja-arvojen
laskusääntöjä.

#### Raja-arvon laskusäännöt

Tässä esitetään joitain yleisiä, tällä sivulla käytettyjä
laskusääntöjä.

Vakion raja-arvo:

$\lim\limits_{x \to x_0} c = c$

Identtisen funktion raja-arvo:

$\lim\limits_{x \to x_0} x = x_0$

Vakion siirto:

$\lim\limits_{x \to x_0} cf(x) = c \lim\limits_{x \to x_0} f(x)$

#### Piirtäminen

Tällä sivulla käytetty polynomifunktio on seuraavanlainen:

$y = ax^3 + bx^2 + cx + y$

Tavallisen polynomifunktion tapauksessa raja-arvot ovat yleensä
samoja kuin funktion arvot.

Voit antaa polynomifunktion vakioiden arvot alla olevalla lomakkeella.
Sivulle piirretään funktio raja-arvoineen.

<div class="form-group">
  <label for="a">a</sub></label>
  <input type="number" step="0.1" id="a" class="form-control">
</div>

<div class="form-group">
  <label for="b">b</label>
  <input type="number" step="0.1" id="b" class="form-control">
</div>

<div class="form-group">
  <label for="c">c</label>
  <input type="number" step="0.1" id="c" class="form-control">
</div>

<div class="form-group">
  <label for="d">d</label>
  <input type="number" step="0.1" id="d" class="form-control">
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Draw</button>
</div>
