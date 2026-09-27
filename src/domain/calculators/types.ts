export interface Group {
  stitchCount: number;
  repeat: number;
}

export interface KnittingResult {
  originalStitches: number;
  changes: number;
  targetStitches: number;
  operation: "increase" | "decrease";
  intervals: number[];
  groups: Group[];
}

export interface IKnittingStrategy {
  readonly operation: "increase" | "decrease";
  validate(originalStitches: number, changes: number): void;
  calculateTargetStitches(originalStitches: number, changes: number): number;
}