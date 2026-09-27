import { DecreaseStrategy, IncreaseStrategy, KnittingCalculator } from "@/src/domain/calculators/calculators";

describe("increase and decrease distribution calculators", () => {
  describe("decreases", () => {
    it("should calculate the exact distribution when original/changes is even", () => {
      const result = KnittingCalculator.calculate(40, 10, new DecreaseStrategy());
      expect(result).toEqual({
        originalStitches: 40,
        changes: 10,
        targetStitches: 30,
        operation: "decrease",
        intervals: [4, 4, 4, 4, 4, 4, 4, 4, 4, 4],
        groups: [{ stitchCount: 4, repeat: 10 }]
      })
    });

    it("should calculate the distribution with remainder when original/changes is not even", () => {
      const result = KnittingCalculator.calculate(45, 18, new DecreaseStrategy());
      expect(result).toMatchObject({
        operation: "decrease",
        originalStitches: 45,
        changes: 18,
        targetStitches: 27
      });
      expect(result.intervals).toEqual([2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3, 2, 3]);
      expect(result.groups).toEqual(
        Array.from({ length: 18 }, (_, index) => ({
          stitchCount: index % 2 === 0 ? 2 : 3,
          repeat: 1
        }))
      );
    });

    it("should handle the case when change is zero", () => {
      const result = KnittingCalculator.calculate(50, 0, new DecreaseStrategy());
      expect(result).toEqual({
        originalStitches: 50,
        changes: 0,
        targetStitches: 50,
        operation: "decrease",
        intervals: [],
        groups: []
      });
    });

    it("should handle throw error when changes is negative", () => {
      expect(() => {
        KnittingCalculator.calculate(50, -5, new DecreaseStrategy());
      }).toThrow("Decrease count cannot be negative");
    });

    it("should throw error when number of decreases is more than half the stitch count", () => {
      expect(() => {
        KnittingCalculator.calculate(30, 20, new DecreaseStrategy());
      }).toThrow("Decrease cannot be more than half the current stitch count");
    });
  });

  describe("increases", () => {
    it("should calculate the exact distribution when original/changes is even", () => {
      const result = KnittingCalculator.calculate(20, 5, new IncreaseStrategy());
      expect(result).toEqual({
        originalStitches: 20,
        changes: 5,
        targetStitches: 25,
        operation: "increase",
        intervals: [4, 4, 4, 4, 4],
        groups: [{ stitchCount: 4, repeat: 5 }]
      });
    });

    it("should calculate the distribution with remainder when original/changes is odd", () => {
      const result = KnittingCalculator.calculate(63, 8, new IncreaseStrategy());
      expect(result).toMatchObject({
        originalStitches: 63,
        changes: 8,
        targetStitches: 71,
        operation: "increase"
      });
      expect(result.intervals).toEqual([8, 8, 8, 7, 8, 8, 8, 8]);
      expect(result.groups).toEqual([
        { stitchCount: 8, repeat: 3},
        { stitchCount: 7, repeat: 1},
        { stitchCount: 8, repeat: 4}
      ]);
    });

    it("should handle the case when change is zero", () => {
      const result = KnittingCalculator.calculate(50, 0, new IncreaseStrategy());
      expect(result).toEqual({
        originalStitches: 50,
        changes: 0,
        targetStitches: 50,
        operation: "increase",
        intervals: [],
        groups: []
      });
    });

    it("should throw error when changes is negative", () => {
      expect(() => {
        KnittingCalculator.calculate(50, -5, new IncreaseStrategy());
      }).toThrow("Increase count cannot be negative");
    });

    it("should calculate the distribution when changes = originalStitches", () => {
      const result = KnittingCalculator.calculate(30, 30, new IncreaseStrategy());
      expect(result).toEqual({
        originalStitches: 30,
        changes: 30,
        targetStitches: 60,
        operation: "increase",
        intervals: new Array(30).fill(1),
        groups: [{ stitchCount: 1, repeat: 30 }]
      });
    });
  });
});