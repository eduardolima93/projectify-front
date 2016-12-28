import { User } from '../user';

export enum ProjectStatusType {
  planning,
  inProgress,
  complete,
}

export interface Address {
  latitude?: number;
  longitude?: number;
  formattedAddress?: string;
  placeId?: string;
}

export interface Project {
  readonly _id?: string;
  name?: string;
  objective?: string;
  description?: string;
  activity?: string;
  needing?: string;
  contactEmail?: string;
  contactNumber1?: string;
  contactNumber2?: string;
  website?: string;
  facebookPage?: string;
  adminIds?: Array<string>;
  memberIds?: Array<string>;
  participantIds?: Array<string>;
  address?: Address;
  status?: ProjectStatusType;
}

export function getNewProject(): Project {
  return {
    name: '',
    objective: '',
    description: '',
    activity: '',
    needing: '',
    contactEmail: '',
    website: '',
    participantIds: [],
    address: {},
    status: ProjectStatusType.planning,
  };
}
