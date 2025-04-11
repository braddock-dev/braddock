export interface IOperator {
  id: string;
  name: string;
  msisdn: string;
  email: string;
  description: string;
  iconUrl: string;
}

export interface IToggleTreatment {
  operatorId: string;
  treatmentId: string;
  isActive: boolean;
}
