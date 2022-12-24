import { BaseInterfaceModal } from "../utils/types";

export interface CadrulMedicalFunctieInterface extends BaseInterfaceModal {
  idCadruMedical: number;
  nume: string;
  prenume: string;
  denumire: string;
  salariuBaza: number;
}
