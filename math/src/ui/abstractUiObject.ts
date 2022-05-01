import Konva from 'konva';

export abstract class AbstractUiObject {
  abstract draw: (layer: Konva.Layer) => void;
}
