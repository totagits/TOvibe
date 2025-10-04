import { Button } from "@/components/ui/button";
import { PlusCircle } from "lucide-react";
import { ProjectBoard } from "@/components/projects/ProjectBoard";
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from "@/components/ui/select";
import { useProjectsStore } from "@/hooks/use-projects-data";
import { useShallow } from "zustand/react/shallow";
export function ProjectsPage() {
  const { projects, selectedProjectId, setSelectedProjectId } = useProjectsStore(
    useShallow((state) => ({
      projects: state.projects,
      selectedProjectId: state.selectedProjectId,
      setSelectedProjectId: state.setSelectedProjectId,
    }))
  );
  const selectedProject = projects.find(p => p.id === selectedProjectId);
  return (
    <div className="flex flex-col h-full">
      <div className="flex items-center justify-between pb-4">
        <div className="flex items-center gap-4">
          <div>
            <h1 className="text-3xl font-bold tracking-tight">Projects</h1>
            <p className="text-muted-foreground">Manage your team's tasks and projects.</p>
          </div>
          <Select value={selectedProjectId || ''} onValueChange={setSelectedProjectId}>
            <SelectTrigger className="w-[220px]">
              <SelectValue placeholder="Select a project">
                {selectedProject?.name || 'Select a project'}
              </SelectValue>
            </SelectTrigger>
            <SelectContent>
              {projects.map(project => (
                <SelectItem key={project.id} value={project.id}>
                  {project.name}
                </SelectItem>
              ))}
            </SelectContent>
          </Select>
        </div>
        <Button>
          <PlusCircle className="mr-2 h-4 w-4" />
          New Task
        </Button>
      </div>
      <ProjectBoard />
    </div>
  );
}