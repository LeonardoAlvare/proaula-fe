export type ProposalState = {
  proposals: Proposal[];
  loading: boolean;
};

export type ProposalAction = {
  createProposal: (proposal: ProposalDto) => Promise<void>;
  getProposalsByUserId: () => Promise<void>;
  getProposalsByProjectId: (projectId: string) => Promise<void>;
  updateProposal: (
    proposalId: string,
    proposal: Partial<ProposalDto>
  ) => Promise<void>;
};

export type ProposalDto = {
  userId: string;
  projectId: string;
  nameProject: string;
  userName: string;
  userEmail: string;
  status?: string | null;
};

export type Proposal = ProposalDto & {
  _id: string;
};

export enum StatusProposal {
  Accept = "aceptado",
  Pending = "pendiente",
  Reject = "rechazado",
}
