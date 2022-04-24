# Rationaalifunktio

Rationaalifunktio on muotoa

$y = \frac{P(x)}{Q(x)}$

Jossa $P(x)$ ja $Q(x)$ ovat polynomifunktioita.

Tässä tapauksessa lopullinen funktio tulee olemaan
seuraavanlainen:

$y = \frac{a_{P}x^2 + b_{P}x + c_{P}}{a_{Q}x^2 + b_{Q}x + c_{Q}}$

Voit syöttää vakiot alla olevalla lomakkeella:

<hr />

<div class="form-group">
  <label for="a_P">a<sub>P</sub></label>
  <input type="number" step="0.1" id="a_P" class="form-control">
</div>

<div class="form-group">
  <label for="b_P">b<sub>P</sub></label>
  <input type="number" step="0.1" id="b_P" class="form-control">
</div>

<div class="form-group">
  <label for="c_P">c<sub>P</sub></label>
  <input type="number" step="0.1" id="c_P" class="form-control">
</div>

<div class="form-group">
  <label for="a_Q">a<sub>Q</sub></label>
  <input type="number" step="0.1" id="a_Q" class="form-control">
</div>

<div class="form-group">
  <label for="b_Q">b<sub>Q</sub></label>
  <input type="number" step="0.1" id="b_Q" class="form-control">
</div>

<div class="form-group">
  <label for="c_Q">c<sub>Q</sub></label>
  <input type="number" step="0.1" id="c_Q" class="form-control">
</div>

<div>
  <button id="drawButton" type="button" class="btn btn-dark">Piirrä funktio</button>
</div>
