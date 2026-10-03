import { Counter } from "../domain/counter/Counter";
import { ICounterRepository } from "../domain/counter/ICounterRepository";
import { PatternCounter } from "../domain/counter/PatternCounter";
import { AnyCounter, CounterId, ProjectId } from "../domain/shared/types";
import { createCounterId } from "../domain/shared/utils";

export async function getCounter(repository: ICounterRepository, id: CounterId): Promise<AnyCounter> {
  const counter = await repository.findById(id);

  if (!counter) {
    throw new Error("Counter not found");
  }

  return counter;
}

export async function getCountersByProject(repository: ICounterRepository, projectId: ProjectId): Promise<AnyCounter[]> {
  return await repository.findByProjectId(projectId);
}

export async function createCounter(repository: ICounterRepository, projectId: ProjectId, name: string): Promise<Counter> {
  const id = createCounterId();
  const counter = Counter.create(id, projectId, name);

  await repository.save(counter);
  return counter;
}

export async function createPatternCounter(repository: ICounterRepository, projectId: ProjectId, name: string, length: number): Promise<PatternCounter> {
  const id = createCounterId();
  const counter = PatternCounter.create(id, projectId, name, length);

  await repository.save(counter);
  return counter;
}

export async function renameCounter(repository: ICounterRepository, id: CounterId, newName: string): Promise<AnyCounter> {
  const counter = await getCounter(repository, id);
  counter.rename(newName);
  await repository.save(counter);
  return counter;
}

export async function advanceCounter(repository: ICounterRepository, id: CounterId): Promise<AnyCounter> {
  const counter = await getCounter(repository, id);
  counter.advance();
  await repository.save(counter);
  return counter;
}

export async function decrementCounter(repository: ICounterRepository, id: CounterId): Promise<AnyCounter> {
  const counter = await getCounter(repository, id);
  counter.decrement();
  await repository.save(counter);
  return counter;
}

export async function resetCounter(repository: ICounterRepository, id: CounterId): Promise<AnyCounter> {
  const counter = await getCounter(repository, id);
  counter.reset();
  await repository.save(counter);
  return counter;
}

export async function deleteCounter(repository: ICounterRepository, id: CounterId): Promise<void> {
  await repository.delete(id);
}