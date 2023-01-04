import { BaseInterfaceModal } from "../utils/types";

export interface FunctiiInterface extends BaseInterfaceModal {
  idFunctie?: number;
  den_functie: string | null;
  salariuBaza: number | null;
}
