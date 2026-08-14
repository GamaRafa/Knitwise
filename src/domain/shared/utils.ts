import { CounterId, ProjectId } from "./types";

export function createProjectId(): ProjectId {
  return crypto.randomUUID() as ProjectId;
}

export function createCounterId(): CounterId {
  return crypto.randomUUID() as CounterId;
}