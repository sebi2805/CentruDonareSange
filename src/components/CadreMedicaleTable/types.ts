import { BaseInterfaceModal } from "../utils/types";

export interface CadreMedicaleInterface extends BaseInterfaceModal {
  idCadruMedical?: number;
  nume: string;
  prenume: string;
  idFunctie: number | null;
  dataAngajarii: string;
}
