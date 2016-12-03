export enum ProjectStatusType {
  planning,
  inProgress,
  complete,
}

export interface Project {
  readonly _id?: string;
  name?: string;
  idea?: string;
  motivation?: string;
  description?: string;
  participantIds?: Array<string>;
  status?: ProjectStatusType;
  neededSkills?: string;
}

export function getNewProject(): Project {
  return {
    name: '',
    idea: '',
    motivation: '',
    description: '',
    participantIds: [],
    status: ProjectStatusType.planning,
    neededSkills: '',
  };
}
