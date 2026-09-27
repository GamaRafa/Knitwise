import { Group, IKnittingStrategy, KnittingResult } from "./types";

export class UniformDistributor {
  static distribute(originalStitches: number, changes: number): number[] {
    if (changes <= 0) return [];
    if (changes > originalStitches) return new Array(changes).fill(1);  // not sure

    const intervals: number[] = [];
    const baseInterval = Math.floor(originalStitches / changes);
    const remainder = originalStitches % changes;
    let error = changes / 2;

    for (let i = 0; i < changes; i++) {
      error -= remainder;
      if (error < 0) {
        intervals.push(baseInterval + 1);
        error += changes;
      } else {
        intervals.push(baseInterval);
      }
    }

    return intervals;
  }

  static groupIntervals(intervals: number[]): Group[] {
    const groups: Group[] = [];
    for (const interval of intervals) {
      const lastGroup = groups[groups.length - 1];
      if (lastGroup && lastGroup.stitchCount === interval) {
        lastGroup.repeat++;
      } else {
        groups.push({ stitchCount: interval, repeat: 1} );
      }
    }

    return groups;
  }
}

export class DecreaseStrategy implements IKnittingStrategy {
  readonly operation = "decrease" as const;

  validate(originalStitches: number, changes: number): void {
    if (changes < 0) {
      throw new Error("Decrease count cannot be negative");
    }

    const maxAllowed = Math.floor(originalStitches / 2);
    if (changes > maxAllowed) {
      throw new Error("Decrease cannot be more than half the current stitch count");
    }
  }

  calculateTargetStitches(originalStitches: number, effectiveChanges: number): number {
    return originalStitches - effectiveChanges;
  }
}

export class IncreaseStrategy implements IKnittingStrategy {
  readonly operation = "increase" as const;

  validate(originalStitches: number, changes: number): void {
    if (changes < 0) {
    throw new Error("Increase count cannot be negative");
    }  
  }

  calculateTargetStitches(originalStitches: number, effectiveChanges: number): number {
    return originalStitches + effectiveChanges;
  }
}

export class KnittingCalculator {
  static calculate(
    originalStitches: number, 
    changes: number, 
    strategy: IKnittingStrategy
  ): KnittingResult {
    strategy.validate(originalStitches, changes);

    const targetStitches = strategy.calculateTargetStitches(originalStitches, changes);
    const intervals = UniformDistributor.distribute(originalStitches, changes);
    const groups = UniformDistributor.groupIntervals(intervals);

    return {
      originalStitches,
      changes,
      targetStitches,
      operation: strategy.operation,
      intervals,
      groups
    };
  }
}

/**
 * // Calculando diminuições (limitadas a no máximo metade dos pontos)
try {
  KnittingCalculator.calculate(30, 20, new DecreaseStrategy());
} catch (error) {
  console.log(error.message); 
  // Exibe exatamente: "Decrease cannot be more than half the Current Stitch Count"
}

// Calculando aumentos
const resultIncrease = KnittingCalculator.calculate(
  30, 
  5, 
  new IncreaseStrategy()
);
// Output: effectiveChanges = 5, targetStitches = 35
 */