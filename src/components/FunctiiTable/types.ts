import { BaseInterfaceModal } from "../utils/types";

export interface FunctiiInterface extends BaseInterfaceModal {
  idFunctie?: number;
  denumire: string | null;
  salariuBaza: number | null;
}
