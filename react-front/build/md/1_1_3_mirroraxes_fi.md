# Janan peilaus X- tai Y-akselin tai origon yli

**Klikkaa näkymää asettaaksesi janan alku- ja loppupisteet.** Jana
peilataan joko $x$- tai $y$-akselin tai origon yli valinnasta
riippuen.

<div>
  <div class="custom-control custom-radio">
    <input type="radio" id="x" name="mirroracross" class="custom-control-input" />
    <label class="custom-control-label" for="x">X-akseli</label>
  </div>
</div>

<div>
  <div class="custom-control custom-radio">
    <input type="radio" id="y" name="mirroracross" class="custom-control-input" />
    <label class="custom-control-label" for="y">Y-akseli</label>
  </div>
</div>

<div>
  <div class="custom-control custom-radio">
    <input type="radio" id="o" name="mirroracross" class="custom-control-input" />
    <label class="custom-control-label" for="o">Origo</label>
  </div>
</div>

<hr />

Pisteestä $(x, y)$ tulee...

- $(x, -y)$, kun se peilataan $x$-akselin yli,

- $(-x, y)$, kun se peilataan $y$-akselin yli, ja

- $(-x, -y)$, kun se peilataan origon yli.

<hr />

Koodi, joka luo peilatun janan, sijaitsee entry point -tiedostossa:

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

[Entry pointin lähdekoodi GitHubissa](https://github.com/mkkekkonen/TS-Math/blob/master/math/src/entryPoints/1_1_3_mirroraxes.ts)
