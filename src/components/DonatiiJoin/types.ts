import { BaseInterfaceModal } from "../utils/types";

export interface DonatiiFullInterface extends BaseInterfaceModal {
  idDonatie: number;
  d_nume: string;
  d_prenume: string;
  dataRecoltare: string;
  dataExpediere?: string;
  grupaSange: string;
}
export interface DonatiiJoinFilter {
  nume: string | null;
  prenume: string | null;
  idGrupaSange: number | null;
}
