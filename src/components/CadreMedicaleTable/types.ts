import { BaseInterfaceModal } from "../utils/types";

export interface CadreMedicaleInterface extends BaseInterfaceModal {
  idCadruMedical?: number;
  c_nume: string | null;
  c_prenume: string | null;
  idFunctie: number | null;
  dataAngajarii: string;
}
