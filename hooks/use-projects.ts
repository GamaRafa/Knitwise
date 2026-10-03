import { Project } from "@/src/domain/project/Project";
import { ProjectId } from "@/src/domain/shared/types";
import { projectRepository } from "@/src/infrastructure/repositories";
import { createProject, deleteProject, getProject, listProjects, renameProject } from "@/src/use-cases/project";
import { useCallback, useEffect, useState } from "react";

export function useProjects() {
  const [projects, setProjects] = useState<Project[]>([]);
  const [isLoading, setIsLoading] = useState(true);

  const fetchProjects = useCallback(async () => {
    setIsLoading(true);
    try {
      const data = await listProjects(projectRepository);
      setProjects(data);
    } finally {
      setIsLoading(false);
    }
  }, []);

  const handleCreate = async (name: string) => {
    const newProject = await createProject(projectRepository, name);
    setProjects((prev) => [newProject, ...prev]);
    return newProject;
  }

  const handleDelete = async (id: ProjectId) => {
    await deleteProject(projectRepository, id);
    setProjects((prev) => prev.filter((p) => p.id !== id));
  }

  const handleGetById = async (id: ProjectId) => {
    return await getProject(projectRepository, id);
  }

  const handleRename = async (id: ProjectId, newName: string) => {
    const updatedProject = await renameProject(projectRepository, id, newName);
    setProjects((prev) =>
      prev.map((p) => p.id === id ? updatedProject : p)
    );
    return updatedProject;
  }

  useEffect(() => {
    fetchProjects();
  }, [fetchProjects]);

  return {
    projects,
    isLoading,
    refreshProjects: fetchProjects,
    createProject: handleCreate,
    deleteProject: handleDelete,
    getProject: handleGetById,
    renameProject: handleRename
  }
}

/**
 * Custom hook for managing project state and operations based on use-cases.
 * It uses `useEffect` to trigger `fetchProjects` on mount, populating the local `projects` array and handling loading state.
 * To avoid extra GET requests, mutation methods update the local state while calling their respective use-cases:
 * `handleCreate` and `handleRename` execute the use-case, update the state (via addition or mapping over `id`), and return the mutated entity so the UI can perform immediate follow-up actions;
 * `handleDelete` removes the project from state via filtering; and `handleGetById` bypasses local state to directly fetch a specific project.
 */