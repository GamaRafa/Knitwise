export function increase(originalStitchCount: number, stitchChange: number): string {
  if (originalStitchCount <= 0) {
    throw new Error("Original stitch count must be greater than zero")
  }
  
  if (stitchChange <= 0) {
    throw new Error("The number of increases must be greater than zero");
  }

  if (originalStitchCount <= stitchChange) {
    throw new Error("Increase stitches must be less than the current stitch count");
  }

  const ratio = originalStitchCount / stitchChange;
  const baseInterval = Math.floor(ratio);
  const extendedInterval= baseInterval + 1;

  let accumulatedSum = ratio;
  let totalItemsInCycle = 1;

  while (Math.abs(Math.floor(accumulatedSum + 1 / 100000) - accumulatedSum) > 1 / 100000) {
    accumulatedSum += ratio;
    totalItemsInCycle++;
  }
  accumulatedSum = Math.floor(accumulatedSum + 1 / 100000);

  const cycleMultiplier = originalStitchCount / accumulatedSum;

  let baseIntervalCount = -1;
  let extendedIntervalCount = -1;

  for (let index = 0; index <= totalItemsInCycle; index++) {
    if (index * baseInterval + (totalItemsInCycle - index) * extendedInterval === accumulatedSum) {
      baseIntervalCount = index;
      extendedIntervalCount = totalItemsInCycle - index;
    }
  }

  baseIntervalCount *= cycleMultiplier;
  extendedIntervalCount *= cycleMultiplier;

  let instructionOutput = "";

  if (extendedIntervalCount === 0) {
    const initialKnitStitches = Math.floor(baseInterval / 2);
    const finalKnitStitches = baseInterval - initialKnitStitches;
    baseIntervalCount -= 1;

    instructionOutput += "k" + initialKnitStitches;

    if (baseIntervalCount > 0) {
      let repeatedPattern = "M1, k" + baseInterval;
      if (baseIntervalCount > 1) {
        repeatedPattern = "(" + repeatedPattern + ") " + baseIntervalCount + " times";
      }
      instructionOutput += ", " + repeatedPattern;
    }

    instructionOutput += ", M1, k" + finalKnitStitches;
    return instructionOutput;
  }

  let evenIntervalLength = 0;
  let oddIntervalLength = 0;
  let evenIntervalCount = 0;
  let oddIntervalCount = 0;

  if (baseInterval % 2 === 0) {
    evenIntervalLength = baseInterval;
    oddIntervalLength = extendedInterval;
    evenIntervalCount = baseIntervalCount;
    oddIntervalCount = extendedIntervalCount;
  } else {
    evenIntervalLength = extendedInterval;
    oddIntervalLength = baseInterval;
    evenIntervalCount = extendedIntervalCount;
    oddIntervalCount = baseIntervalCount;
  }

  let startEdgeStitches = 0;
  let groupOneLength = 0;
  let groupOneCount = 0;
  let middleGroupLength = 0;
  let middleGroupCount = 0;
  let groupTwoCount = 0;
  let endEdgeStitches = 0;

  if (oddIntervalCount % 2 === 0) {
    startEdgeStitches = evenIntervalLength / 2;
    groupOneLength = oddIntervalLength;
    groupOneCount = oddIntervalCount / 2;
    middleGroupLength = evenIntervalLength;
    middleGroupCount = evenIntervalCount - 1;
    groupTwoCount = oddIntervalCount / 2;
    endEdgeStitches = evenIntervalLength / 2;
  } else if (evenIntervalCount % 2 === 0) {
    startEdgeStitches = Math.floor(oddIntervalLength / 2);
    groupOneLength = evenIntervalLength;
    groupOneCount = evenIntervalCount / 2;
    middleGroupLength = oddIntervalLength;
    middleGroupCount = oddIntervalCount - 1;
    groupTwoCount = evenIntervalCount / 2;
    endEdgeStitches = oddIntervalLength - startEdgeStitches;
  } else {
    startEdgeStitches = evenIntervalLength / 2;
    groupOneLength = oddIntervalLength;
    groupOneCount = Math.floor(oddIntervalCount / 2);
    middleGroupLength = evenIntervalLength;
    middleGroupCount = evenIntervalCount - 1;
    groupTwoCount = groupOneCount + 1;
    endEdgeStitches = evenIntervalLength / 2;
  }

  instructionOutput += "k" + startEdgeStitches;

  if (groupOneCount > 0) {
    let pattern = "M1, k" + groupOneLength;
    if (groupOneCount > 1) {
      pattern = "(" + pattern + ") " + groupOneCount + " times";
    }
    instructionOutput += ", " + pattern;
  }

  if (middleGroupCount > 0) {
    let pattern = "M1, k" + middleGroupLength;
    if (middleGroupCount > 1) {
      pattern = "(" + pattern + ") " + middleGroupCount + " times";
    }
    instructionOutput += ", " + pattern;
  }

  if (groupTwoCount > 0) {
    let pattern = "M1, k" + groupOneLength;
    if (groupTwoCount > 1) {
      pattern = "(" + pattern + ") " + groupTwoCount + " times";
    }
    instructionOutput += ", " + pattern;
  }

  instructionOutput += ", M1, k" + endEdgeStitches;

  const calculatedStichTotal = 
    startEdgeStitches +
    (1 + groupOneLength) * groupOneCount +
    (1 + middleGroupLength) * middleGroupCount +
    (1 + groupOneLength) * groupTwoCount +
    (1 + endEdgeStitches);

  if (calculatedStichTotal !== originalStitchCount + stitchChange) {
    throw new Error("The math ain't mathing! Try again with different numbers");
  }

  return instructionOutput;
}

export function decrease(originalStitchCount: number, stitchChange: number): string {
  if (originalStitchCount <= 0) {
    throw new Error("Original stitch count must be greater than zero");
  }

  if (stitchChange <= 0) {
    throw new Error("The number of decreases must be greater than zero");
  }

  if (stitchChange > originalStitchCount / 2) {
    throw new Error("Decrease stitches cannot be more than half the current stitch count");
  }

  const remainingStitchesTarget = originalStitchCount - stitchChange;
  const ratio = remainingStitchesTarget / stitchChange;
  const baseInterval = Math.floor(ratio);
  const extendedInterval = baseInterval + 1;

  let accumulatedSum = ratio;
  let totalItemsInCycle = 1;

  while (Math.abs(Math.floor(accumulatedSum + 1 / 100000) - accumulatedSum) > 1 / 10000) {
    accumulatedSum += ratio;
    totalItemsInCycle++;
  }
  accumulatedSum = Math.floor(accumulatedSum + 1 / 100000);

  const cycleMultiplier = remainingStitchesTarget / accumulatedSum;

  let baseIntervalCount = -1;
  let extendedIntervalCount = -1;

  for (let index = 0; index <= totalItemsInCycle; index++) {
    if (index * baseInterval + (totalItemsInCycle - index) * extendedInterval === accumulatedSum) {
      baseIntervalCount = index;
      extendedIntervalCount = totalItemsInCycle - index;
    }
  }

  baseIntervalCount *= cycleMultiplier;
  extendedIntervalCount *= cycleMultiplier;

  let instructionOutput = "";

  if (extendedIntervalCount === 0) {
    const initialKnitStitches = Math.floor(baseInterval / 2);
    const finalKnitStitches = baseInterval - initialKnitStitches;
    baseIntervalCount -= 1;

    instructionOutput += "K" + initialKnitStitches;

    if (baseIntervalCount > 0) {
      const patternKnitStitches = baseInterval - 1;
      let repeatedPattern = "k2tog, k" + patternKnitStitches;

      if (baseIntervalCount > 1) {
        repeatedPattern = "(" + repeatedPattern + ") " + baseIntervalCount + " times";
      }
      instructionOutput += ", " + repeatedPattern;
    }

    const remainingEndStitches = finalKnitStitches - 1;
    instructionOutput += ", k2tog, k" + remainingEndStitches;
    return instructionOutput;
  }

  let evenIntervalLength = 0;
  let oddIntervalLength = 0;
  let evenIntervalCount = 0;
  let oddIntervalCount = 0;

  if (baseInterval % 2 === 0) {
    evenIntervalLength = baseInterval;
    oddIntervalLength = extendedInterval;
    evenIntervalCount = baseIntervalCount;
    oddIntervalCount = extendedIntervalCount;
  } else {
    evenIntervalLength = extendedInterval;
    oddIntervalLength = baseInterval;
    evenIntervalCount = extendedIntervalCount;
    oddIntervalCount = baseIntervalCount;
  }

  let startEdgeStitches = 0;
  let groupOneRemainingKnit = 0;
  let groupOneCount = 0;
  let middleGroupRemainingKnit = 0;
  let middleGroupCount = 0;
  let groupTwoCount = 0;
  let endEdgeStitches = 0;

  if (oddIntervalCount % 2 === 0) {
    startEdgeStitches = evenIntervalLength / 2;
    groupOneRemainingKnit = oddIntervalLength - 1;
    groupOneCount = oddIntervalCount / 2;
    middleGroupRemainingKnit = evenIntervalLength - 1;
    middleGroupCount = evenIntervalCount - 1;
    groupTwoCount = oddIntervalCount / 2;
    endEdgeStitches = evenIntervalLength / 2 - 1;
  } else if (evenIntervalCount % 2 === 0) {
    startEdgeStitches = Math.floor(oddIntervalLength / 2);
    groupOneRemainingKnit = evenIntervalLength - 1;
    groupOneCount = evenIntervalCount / 2;
    middleGroupRemainingKnit = oddIntervalLength - 1;
    middleGroupCount = oddIntervalCount - 1;
    groupTwoCount = evenIntervalCount / 2;
    endEdgeStitches = oddIntervalLength - startEdgeStitches - 1;
  } else {
    startEdgeStitches = evenIntervalLength / 2;
    groupOneRemainingKnit = oddIntervalLength - 1;
    groupOneCount = Math.floor(oddIntervalCount / 2);
    middleGroupRemainingKnit = evenIntervalLength - 1;
    middleGroupCount = evenIntervalCount - 1;
    groupTwoCount = groupOneCount + 1;
    endEdgeStitches = evenIntervalLength / 2 - 1;
  }

  instructionOutput += "K" + startEdgeStitches;

  if (groupOneCount > 0) {
    let pattern = "k2tog";
    if (groupOneRemainingKnit > 0) {
      pattern += ", k" + groupOneRemainingKnit;
    }
    if (groupOneCount > 1) {
      if (groupOneRemainingKnit > 0) {
        pattern = "(" + pattern + ")";
      }
      pattern += " " + groupOneCount + " times";
    }
    instructionOutput += ", " + pattern;
  }

  if (middleGroupCount > 0) {
    let pattern = "k2tog";
    if (middleGroupRemainingKnit > 0) {
      pattern += ", k" + middleGroupRemainingKnit;
    }
    if (middleGroupCount > 1) {
      if (middleGroupRemainingKnit > 0) {
        pattern = "(" + pattern + ")";
      }
      pattern += " " + middleGroupCount + " times";
    }
    instructionOutput += ", " + pattern;
  }

  if (groupTwoCount > 0) {
    let pattern = "k2tog";
    if (groupOneRemainingKnit > 0) {
      pattern += ", k" + groupOneRemainingKnit;
    }
    if (groupTwoCount > 1) {
      if (groupOneRemainingKnit > 0) {
        pattern = "(" + pattern + ")";
      }
      pattern += " " + groupTwoCount + " times";
    }
    instructionOutput += ", " + pattern;
  }

  instructionOutput += ", k2tog";

  if (endEdgeStitches > 0) {
    instructionOutput += ", k" + endEdgeStitches;
  }

  const calculatedStitchTotal =
    startEdgeStitches +
    (2 + groupOneRemainingKnit) * groupOneCount +
    (2 + middleGroupRemainingKnit) * middleGroupCount +
    (2 + groupOneRemainingKnit) * groupTwoCount +
    (2 + endEdgeStitches);

  if (calculatedStitchTotal !== originalStitchCount) {
    throw new Error("The math ain't mathing! Try again with different numbers");
  }

  return instructionOutput;
}

// DEBUG
console.log(increase(40, 10))