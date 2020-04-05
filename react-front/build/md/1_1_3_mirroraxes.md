# Mirroring a Line Across X and Y Axes and the Origin

**Click on the canvas to set line start and end points. Depending
on selection, the line is mirrored across either the $x$ or $y$ axis or
the origin.**

<div>
  <div class="custom-control custom-radio">
    <input type="radio" id="x" name="mirroracross" class="custom-control-input" />
    <label class="custom-control-label" for="x">X axis</label>
  </div>
</div>

<div>
  <div class="custom-control custom-radio">
    <input type="radio" id="y" name="mirroracross" class="custom-control-input" />
    <label class="custom-control-label" for="y">Y axis</label>
  </div>
</div>

<div>
  <div class="custom-control custom-radio">
    <input type="radio" id="o" name="mirroracross" class="custom-control-input" />
    <label class="custom-control-label" for="o">Origin</label>
  </div>
</div>

<hr />

The point $(x, y)$ becomes...

- $(x, -y)$ when mirrored across the $x$ axis

- $(-x, y)$ when mirrored across the $y$ axis, and

- $(-x, -y)$ when mirrored across the origin.

<hr />

The code that creates the mirrored line is located in the entry point file:

```typescript
const drawMirroredLine = (
  layer: Konva.Layer,
  mirroredLine: LineSegment2D,
  startPoint?: Vector3,
  endPoint?: Vector3,
) => {
  // a helper for handling form inputs
  const checkedInputId = getCheckedInputId();

  if (!startPoint || !endPoint) {
    return;
  }

  let mirroredStartPoint: Vector3 | undefined;
  let mirroredEndPoint: Vector3 | undefined;

  if (checkedInputId === 'x') {
    const multiplyWith = new Vector3(1, -1);
    mirroredStartPoint = startPoint.multiply(multiplyWith);
    mirroredEndPoint = endPoint.multiply(multiplyWith);
  } else if (checkedInputId === 'y') {
    const multiplyWith = new Vector3(-1, 1);
    mirroredStartPoint = startPoint.multiply(multiplyWith);
    mirroredEndPoint = endPoint.multiply(multiplyWith);
  } else if (checkedInputId === 'o') {
    const multiplyWith = new Vector3(-1, -1);
    mirroredStartPoint = startPoint.multiply(multiplyWith);
    mirroredEndPoint = endPoint.multiply(multiplyWith);
  }

  if (mirroredStartPoint && mirroredEndPoint) {
    // a method for updating a LineSegment2D
    mirroredLine.update(
      mirroredStartPoint,
      mirroredEndPoint
    );
    // a method for rendering
    // a LineSegment2D onto the canvas
    mirroredLine.konvaRender(layer);
  }
};
```

[View entry point source in GitHub](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_1_3_mirroraxes.ts)
