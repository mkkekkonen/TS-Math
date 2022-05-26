# Friction - Inclined Plane

On this page, friction on an inclined plane is simulated.

Once again, kinetic friction is:

$F_μ = μN$

The force *perpendicular to the inclined plane* is calculated
with the following equation:

$N = mg cos \alpha$

where $mg$ is the force of gravity (pointing downwards) and $\alpha$
is the angle of the plane relative to the $x$ axis.

The force along the inclined plane is:

$G_x = mg sin \alpha$

You can input the angle of the inclined plane (between 1° and 45°),
the friction coefficient and the mass of the object below. Click
"Start" to start the simulation.

<div class="form-group">
  <label for="alpha">Angle of the Plane °</label>
  <input type="number" min="1" max="45" step="0.1" id="alpha" class="form-control" />
</div>

<div class="form-group">
  <label for="mu">Friction coefficient</label>
  <input type="number" step="0.1" id="mu" class="form-control" />
</div>

<div class="form-group">
  <label for="m">Mass kg</label>
  <input type="number" step="0.1" id="m" class="form-control" />
</div>

<div>
  <button id="startButton" type="button" class="btn btn-dark">Start</button>
</div>
