import { IProjectRepository } from "../domain/project/IProjectRepository";
import { Project } from "../domain/project/Project";
import { ProjectId } from "../domain/shared/types";
import { createProjectId } from "../domain/shared/utils";

export async function getProject(repository: IProjectRepository, id: ProjectId): Promise<Project> {
  const project = await repository.findById(id);

  if (!project) {
    throw new Error("Project not found");
  }

  return project;
}

export async function createProject(repository: IProjectRepository, name: string): Promise<Project> {
  const id = createProjectId();
  const project = Project.create(id, name);
  await repository.save(project);
  return project;
}

export async function renameProject(repository: IProjectRepository, id: ProjectId, newName: string): Promise<Project> {
  const project = await getProject(repository, id);
  project.rename(newName);
  await repository.save(project);
  return project;
}

export async function listProjects(repository: IProjectRepository): Promise<Project[]> {
  return await repository.findAll();
}

export async function deleteProject(repository: IProjectRepository, id: ProjectId): Promise<void> {
  await repository.delete(id);
  // delete and forget
}