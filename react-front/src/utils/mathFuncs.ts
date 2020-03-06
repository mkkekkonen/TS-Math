import * as tsMath from 'ts-math';

export const mathFuncs: Record<string, Function> = {
  distancepoints: tsMath.distancepoints,
  segmentmidpoint: tsMath.segmentmidpoint,
  mirroraxes: tsMath.mirroraxes,
  slope: tsMath.slope,
  angleslope: tsMath.angleslope,
  pointslope: tsMath.pointslope,
  generalequation: tsMath.generalequation,
  slopeintercept: tsMath.slopeintercept,
  lineintersection: tsMath.lineintersection,
  anglelines: tsMath.anglelines,
  pointlinedist: tsMath.pointlinedist,
  planarvelocity: tsMath.planarvelocity,
  constaccel: tsMath.constaccel,
  projectilemotion: tsMath.projectilemotion,
  newton2: tsMath.newton2,
};
