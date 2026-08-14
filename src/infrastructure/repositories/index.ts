import db from "../db/client";
import { DrizzleCounterRepository } from "./DrizzleCounterRepository";
import { DrizzleProjectRepository } from "./DrizzleProjectRepository";

export const projectRepository = new DrizzleProjectRepository(db);
export const counterRepository = new DrizzleCounterRepository(db);