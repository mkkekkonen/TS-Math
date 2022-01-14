import { run as distancepoints } from './entryPoints/1_1_1_distancepoints';
import { run as segmentmidpoint } from './entryPoints/1_1_2_segmentmidpoint';
import { run as mirroraxes } from './entryPoints/1_1_3_mirroraxes';
import { run as slope } from './entryPoints/1_2_1_slope';
import { run as angleslope } from './entryPoints/1_2_2_angleslope';
import { run as pointslope } from './entryPoints/1_2_3_pointslope';
import { run as generalequation } from './entryPoints/1_2_4_generalequation';
import { run as slopeintercept } from './entryPoints/1_2_5_slopeintercept';
import { run as lineintersection } from './entryPoints/1_3_1_lineintersection';
import { run as anglelines } from './entryPoints/1_3_2_anglelines';
import { run as pointlinedist } from './entryPoints/1_3_3_pointlinedist';
import { run as planarvelocity } from './entryPoints/2_1_1_planarvelocity';
import { run as constaccel } from './entryPoints/2_1_2_constaccel';
import { run as projectilemotion } from './entryPoints/2_1_3_projectilemotion';
import { run as newton2 } from './entryPoints/2_2_1_newton2';
import { run as frictionhorizontal } from './entryPoints/2_2_2_frictionhorizontal';

export const entryPoints: Record<string, Function> = {
  distancepoints,
  segmentmidpoint,
  mirroraxes,
  slope,
  angleslope,
  pointslope,
  generalequation,
  slopeintercept,
  lineintersection,
  anglelines,
  pointlinedist,
  planarvelocity,
  constaccel,
  projectilemotion,
  newton2,
  frictionhorizontal,
};
