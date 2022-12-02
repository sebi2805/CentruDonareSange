import { BaseInterfaceModal } from "../utils/types";

export interface SaloaneInterface extends BaseInterfaceModal {
  idSalon?: number;
  oraInceput: number;
  oraSfarsit: number;
  suprafata: number;
}
