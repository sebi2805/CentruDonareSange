import { BaseInterfaceModal } from "../utils/types";

export interface DonatiiInterface extends BaseInterfaceModal {
  idDonatie?: number;
  idDonator: number;
  idRecipient: number;
  idTest?: number;
  anRecoltare: string;
  dataRecoltare: string;
  dataExpediere?: string;
  idCadruMedical: number;
  idSalon: number;
}
