import { BaseInterfaceModal } from "../utils/types";

export interface CadrulMedicalFunctieInterface extends BaseInterfaceModal {
  idCadruMedical: number;
  nume: string | null;
  prenume: string | null;
  denumire: string;
  salariuBaza: number;
}
