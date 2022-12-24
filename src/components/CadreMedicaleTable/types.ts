import { BaseInterfaceModal } from "../utils/types";

export interface CadreMedicaleInterface extends BaseInterfaceModal {
  idCadruMedical?: number;
  nume: string | null;
  prenume: string | null;
  idFunctie: number | null;
  dataAngajarii: string;
}
