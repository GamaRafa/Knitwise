import { Counter } from "@/src/domain/counter/Counter";
import { PatternCounter } from "@/src/domain/counter/PatternCounter";
import { createCounterId, createProjectId } from "@/src/domain/shared/utils";
import { advanceCounter, createCounter, createPatternCounter, decrementCounter, deleteCounter, getCounter, getCountersByProject, resetCounter } from "@/src/use-cases/counter";
import { FakeCounterRepository } from "../infrastructure/repositories/FakeCounterRepository";

const COUNTER_ID = createCounterId();
const PROJECT_ID = createProjectId();

describe("Counter use cases", () => {
  let fakeRepository: FakeCounterRepository;

  beforeEach(() => {
    fakeRepository = new FakeCounterRepository();
  });

  describe("getCounter", () => {
    it("should return a Counter", async () => {
      const counter = Counter.create(COUNTER_ID, PROJECT_ID, "Row counter");

      fakeRepository.items.push(counter);

      const retrievedCounter = await getCounter(fakeRepository, counter.id);

      expect(retrievedCounter).not.toBeNull();
      expect(retrievedCounter.name).toBe("Row counter");
      expect(retrievedCounter.createdAt).toBeInstanceOf(Date);
    });

    it("should throw error when not found", async () => {
      await expect(
        getCounter(fakeRepository, COUNTER_ID)
      ).rejects.toThrow("Counter not found")
    });
  });

  describe("getCounterByProject", () => {
    it("should return a project's counters", async () => {
      const counter1 = Counter.create(createCounterId(), PROJECT_ID, "Row counter 1");
      const counter2 = Counter.create(createCounterId(), PROJECT_ID, "Row Counter 2");
      const anotherProjectCounter = Counter.create(createCounterId(), createProjectId(), "I'm from another project");

      fakeRepository.items.push(counter1, counter2, anotherProjectCounter);

      const retrievedCounters = await getCountersByProject(fakeRepository, PROJECT_ID);

      expect(retrievedCounters).not.toBeNull();
      expect(retrievedCounters.length).toBe(2);
      expect(retrievedCounters).toEqual(expect.arrayContaining([counter1, counter2]));
    });

    it("should return an empty array when project has no counters", async () => {
      const retrievedCounters = await getCountersByProject(fakeRepository, PROJECT_ID);

      expect(retrievedCounters).toEqual([]);
    });

    describe("createCounter", () => {
      it("should create a simple counter with an initial value of 1", async () => {
        const counter = await createCounter(fakeRepository, PROJECT_ID, "New counter");

        const savedCounter = await fakeRepository.findById(counter.id);

        expect(savedCounter).not.toBeNull();
        expect(savedCounter!.name).toBe("New counter");
        expect(savedCounter!.value).toBe(1);
      });

      it("should throw when creating a counter with invalid name", async () => {
        await expect(
          createCounter(fakeRepository, PROJECT_ID, "")
        ).rejects.toThrow("Counter name cannot be empty");
      });
    });

    describe("createPatternCounter", () => {
      it("should create a pattern counter with an initial value of 1 and length of 10", async () => {
        const counter = await createPatternCounter(fakeRepository, PROJECT_ID, "Pattern counter", 10);

        const savedCounter = await fakeRepository.findById(counter.id) as PatternCounter;

        expect(savedCounter).not.toBeNull();
        expect(savedCounter!.name).toBe("Pattern counter");
        expect(savedCounter!.value).toBe(1);
        expect(savedCounter!.patternLength).toBe(10);
      });

      it("should throw when creating a pattern with pattern length < 1", async () => {
        await expect(
          createPatternCounter(fakeRepository, PROJECT_ID, "Pattern counter", -1)
        ).rejects.toThrow("Pattern length must be greater than 0");        
      });
    });

    describe("advanceCounter", () => {
      it("should increment the counter's value and return the updated entity", async () => {
        const counter = Counter.create(COUNTER_ID, PROJECT_ID, "Advance me");

        fakeRepository.items.push(counter);
        
        expect(counter.value).toBe(1);

        const updatedCounter = await advanceCounter(fakeRepository, counter.id);

        expect(updatedCounter.value).toBe(2);

        const savedCounter = await fakeRepository.findById(counter.id);

        expect(savedCounter!.value).toBe(2);
      });

      it("should throw an error when advancing a counter that doesn't exist", async () => {
        await expect(
          advanceCounter(fakeRepository, COUNTER_ID)
        ).rejects.toThrow("Counter not found");
      });
    });

    describe("decrementCounter", () => {
      it("should decrement the counter's value and return the updated entity", async () => {
        const counter = Counter.restore(COUNTER_ID, PROJECT_ID, "simple", "Decrement me", 5, new Date());

        fakeRepository.items.push(counter);

        expect(counter.value).toBe(5);

        const updatedCounter = await decrementCounter(fakeRepository, counter.id);

        expect(updatedCounter.value).toBe(4);

        const savedCounter = await fakeRepository.findById(counter.id);

        expect(savedCounter!.value).toBe(4);
      });

      it("should not decrement below 1", async () => {
        const counter = Counter.create(COUNTER_ID, PROJECT_ID, "Decrement me");

        fakeRepository.items.push(counter);

        expect(counter.value).toBe(1);

        const updatedCounter = await decrementCounter(fakeRepository, counter.id);

        expect(updatedCounter.value).toBe(1);

        const savedCounter = await fakeRepository.findById(counter.id);

        expect(savedCounter!.value).toBe(1);
      });
    });

    describe("resetCounter", () => {
      it("should reset the counter's value to 1 and return the updated entity", async () => {
        const counter = Counter.restore(COUNTER_ID, PROJECT_ID, "simple", "Reset me", 5, new Date());

        fakeRepository.items.push(counter);

        expect(counter.value).toBe(5);

        const updatedCounter = await resetCounter(fakeRepository, counter.id);

        expect(updatedCounter.value).toBe(1);

        const savedCounter = await fakeRepository.findById(counter.id);

        expect(savedCounter!.value).toBe(1);
      });

      it("should not reset below 1", async () => {
        const counter = Counter.create(COUNTER_ID, PROJECT_ID, "Reset me");

        fakeRepository.items.push(counter);

        expect(counter.value).toBe(1);

        const updatedCounter = await resetCounter(fakeRepository, counter.id);

        expect(updatedCounter.value).toBe(1);

        const savedCounter = await fakeRepository.findById(counter.id);

        expect(savedCounter!.value).toBe(1);
      });
    });

    describe("deleteCounter", () => {
      it("should delete a counter", async () => {
        const counter = Counter.create(COUNTER_ID, PROJECT_ID, "Delete me");

        fakeRepository.items.push(counter);

        await deleteCounter(fakeRepository, counter.id);

        const deletedCounter = await fakeRepository.findById(counter.id);

        expect(deletedCounter).toBeNull();
      });

      it("delete and forget", async () => {
        await expect(
          deleteCounter(fakeRepository, COUNTER_ID)
        ).resolves.not.toThrow();
      });
    });
  });
});
