import { BaseInterfaceModal } from "../utils/types";

export interface CadrulMedicalFunctieInterface extends BaseInterfaceModal {
  idCadruMedical: number;
  c_nume: string | null;
  c_prenume: string | null;
  denumire: string;
  salariuBaza: number;
}
