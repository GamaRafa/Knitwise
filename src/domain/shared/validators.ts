import { PatternCounter } from "../counter/PatternCounter";
import { AnyCounter } from "./types";

export function validateName(name: string | null | undefined, entityName: string): string {
  if (!name || name.trim().length === 0) {
    throw new Error(`${entityName} name cannot be empty`);
  }
  return name.trim();
}

export function isPatternCounter(counter: AnyCounter): counter is PatternCounter {
  return counter instanceof PatternCounter || "patternLength" in counter;
}