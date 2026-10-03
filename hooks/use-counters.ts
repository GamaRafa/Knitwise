import { AnyCounter, CounterId, ProjectId } from "@/src/domain/shared/types";
import { counterRepository } from "@/src/infrastructure/repositories";
import { advanceCounter, createCounter, createPatternCounter, decrementCounter, deleteCounter, getCounter, getCountersByProject, renameCounter, resetCounter } from "@/src/use-cases/counter";
import { useCallback, useEffect, useState } from "react";

export function useCounters(projectId: ProjectId) {
  const [counters, setCounters] = useState<AnyCounter[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchCounters = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await getCountersByProject(counterRepository, projectId);
      setCounters(data);
    } finally {
      setIsLoading(false);
    }
  }, [projectId]);

  const handleCreateCounter = async (name: string) => {
    const newCounter = await createCounter(counterRepository, projectId, name);
    setCounters((prev) => [newCounter, ...prev]);
    return newCounter;
  }

  const handleCreatePatternCounter = async (name: string, length: number) => {
    const newCounter = await createPatternCounter(counterRepository, projectId, name, length);
    setCounters((prev) => [newCounter, ...prev]);
    return newCounter;
  }

  const handleDelete = async (id: CounterId) => {
    await deleteCounter(counterRepository, id);
    setCounters((prev) => prev.filter((p) => p.id !== id));
  }

  const handleGetById = async (id: CounterId) => {
    return await getCounter(counterRepository, id);
  }

  const handleRename = async (id: CounterId, newName: string) => {
    const updatedCounter = await renameCounter(counterRepository, id, newName);
    setCounters(
      prev => prev.map((p) => p.id === id ? updatedCounter : p)
    );
    return updatedCounter;
  }

  const handleAdvance = async (id: CounterId) => {
    const updatedCounter = await advanceCounter(counterRepository, id);
    setCounters(
      prev => prev.map((p) => p.id === id ? updatedCounter : p)
    );
    return updatedCounter;
  }

  const handleDecrement = async (id: CounterId) => {
    const updatedCounter = await decrementCounter(counterRepository, id);
    setCounters(
      prev => prev.map((p) => p.id === id ? updatedCounter : p)
    );
    return updatedCounter;
  }

  const handleReset = async (id: CounterId) => {
    const updatedCounter = await resetCounter(counterRepository, id);
    setCounters(
      prev => prev.map((p) => p.id === id ? updatedCounter : p)
    );
    return updatedCounter;
  }

  useEffect(() => {
    fetchCounters();
  }, [fetchCounters]);

  return {
    counters,
    isLoading,
    refreshCounters: fetchCounters,
    createCounter: handleCreateCounter,
    createPatternCounter: handleCreatePatternCounter,
    deleteCounter: handleDelete,
    getCounter: handleGetById,
    renameCounter: handleRename,
    advanceCounter: handleAdvance,
    decrementCounter: handleDecrement,
    resetCounter: handleReset
  }
}