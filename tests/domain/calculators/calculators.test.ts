import { decrease, increase } from "@/src/domain/calculators/calculators";

describe("increase and decrease distribution calculators", () => {
  describe("increase", () => {
    it("should calculate the exact distribution when original/changes is even", () => {
      expect(increase(40, 10)).toEqual("k2, (M1, k4) 9 times, M1, k2");
    });

    it("should calculate the distribution with remainder when original/changes is not even", () => {
      expect(increase(45, 18)).toEqual("k1, (M1, k3) 4 times, (M1, k2) 8 times, (M1, k3) 5 times, M1, k1");
    });

    it("should throw error when original stitch count is zero", () => {
      expect(() => 
        increase(0, 10)
      ).toThrow("Original stitch count must be greater than zero")
    });

    it("should throw error when original stitch count is negative", () => {
      expect(() => 
        increase(-10, 10)
      ).toThrow("Original stitch count must be greater than zero")
    });

    it("should throw error when changes is zero", () => {
      expect(() => 
        increase(50, 0)
      ).toThrow("The number of increases must be greater than zero");
    });

    it("should throw error when changes is negative", () => {
      expect(() => 
        increase(50, -10)
      ).toThrow("The number of increases must be greater than zero");
    });

    it("should throw error when increases is equal original stitch count", () => {
      expect(() =>
        increase(50, 50)
      ).toThrow("Increase stitches must be less than the current stitch count");
    });

    it("should throw error when increases is greater than originalStitches", () => {
      expect(() => 
        increase(50, 52)
      ).toThrow("Increase stitches must be less than the current stitch count");
    });
  });
  describe("decrease", () => {
    it("should calculate the exact distribution when original/changes is even", () => {
      expect(decrease(20, 5)).toEqual("K1, (k2tog, k2) 4 times, k2tog, k1");
    });

    it("should calculate the distribution with remainder when original/changes is not even", () => {
      expect(decrease(63, 8)).toEqual("K3, (k2tog, k6) 3 times, (k2tog, k6) 4 times, k2tog, k2");
    });

    it("should throw error when original stitch count is zero", () => {
      expect(() =>
        decrease(0, 5)
      ).toThrow("Original stitch count must be greater than zero");
    });

    it("should throw error when original stitch count is negative", () => {
      expect(() => 
        decrease(-5, 10)
      ).toThrow("Original stitch count must be greater than zero");
    })

    it("should throw error when change is zero", () => {
      expect(() =>
        decrease(50, 0)
      ).toThrow("The number of decreases must be greater than zero");
    });

    it("should throw error when changes is negative", () => {
      expect(() =>
        decrease(50, -5)
      ).toThrow("The number of decreases must be greater than zero");
    });

    it("should calculate the distribution when decreases is the exact half as the stitch count", () => {
      expect(decrease(50, 25)).toEqual("K0, (k2tog, k0) 24 times, k2tog, k0");
    });

    it("should throw error when number of decreases is more than half the stitch count", () => {
      expect(() =>
        decrease(50, 30)
      ).toThrow("Decrease stitches cannot be more than half the current stitch count");
    });
  });
});