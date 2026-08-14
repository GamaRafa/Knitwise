import { ProjectId } from "../shared/types";
import { validateName } from "../shared/validators";

export class Project {
  private constructor(
    readonly id: ProjectId,
    private _name: string,
    readonly createdAt: Date,
    private _updatedAt: Date
  ) {}

  static create(id: ProjectId, name: string): Project {
    const validatedName = validateName(name, "Project");
    const now = new Date();
    return new Project(id, validatedName, now, now);
  }

  static restore(
    id: ProjectId, 
    name: string, 
    createdAt: Date, 
    updatedAt: Date
  ): Project {
    return new Project(id, name, createdAt, updatedAt);
  }
  
  createCounter(){}

  createPatternCounter(){}

  rename(name: string): void {
    this._name = validateName(name, "Project");
    this._updatedAt = new Date();
  }

  get name(): string {
    return this._name;
  }

  get updatedAt(): Date {
    return this._updatedAt
  }
}