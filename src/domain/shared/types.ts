import { Counter } from "../counter/Counter";
import { PatternCounter } from "../counter/PatternCounter";

export type CounterType = "simple" | "pattern";

declare const projectIdBrand: unique symbol;
declare const counterIdBrand: unique symbol;

export type ProjectId = string & {
  readonly [projectIdBrand]: true;
}

export type CounterId = string & {
  readonly [counterIdBrand]: true;
}

export type AnyCounter = Counter | PatternCounter;