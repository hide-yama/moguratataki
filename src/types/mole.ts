export type MoleType = 'normal' | 'golden' | 'bomb';

export interface MoleState {
  type: MoleType;
  index: number;
  cooldownUntil?: number;
}
