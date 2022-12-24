import { BaseInterfaceModal } from "../utils/types";

export interface DonatiiInterface extends BaseInterfaceModal {
  idDonatie?: number;
  idDonator: number | null;
  idRecipient: number | null;
  dataRecoltare: string;
  dataExpediere?: string;
  idCadruMedical: number | null;
  idSalon: number | null;
}
