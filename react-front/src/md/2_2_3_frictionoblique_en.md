# Friction - Oblique Force on a Horizontal Surface

As on the previous page, kinetic friction is calculated with the following
equation:

$F_μ = μN$

where $μ$ is the friction coefficient and $N$ is the force perpendicular to
the surface.

When the outside i.e. pulling force is *oblique*, the *perpendicular force* is:

$N = mg - F sin \alpha$

where $m$ is the mass of the object, $g$ is the acceleration of gravity, $F$ is
the outside i.e. pulling force, and $\alpha$ is the angle of the oblique force
relative to the $x$ axis.

In this case, the $y$ component of the outside force decreases the perpendicular
force. The $x$ component of the outside force, on the other hand, moves the
object horizontally (if its magnitude is greater than the kinetic friction).

You can input the mass of the object and the friction coefficient below.
Then you can pull the object by clicking on the canvas. Click "Start" to
start the simulation.

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
