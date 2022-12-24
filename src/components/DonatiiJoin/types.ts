import { BaseInterfaceModal } from "../utils/types";

export interface DonatiiFullInterface extends BaseInterfaceModal {
  idDonatie: number;
  nume: string;
  prenume: string;
  dataRecoltare: string;
  dataExpediere?: string;
  grupaSange: string;
}
export interface DonatiiJoinFilter {
  nume: string;
  prenume: string;
  idGrupaSange: number;
}
