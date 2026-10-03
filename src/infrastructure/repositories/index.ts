import db from "../db/client";
import { DrizzleCounterRepository } from "./DrizzleCounterRepository";
import { DrizzleProjectRepository } from "./DrizzleProjectRepository";

// singleton db instances passed to the custom hooks
export const projectRepository = new DrizzleProjectRepository(db);
export const counterRepository = new DrizzleCounterRepository(db);