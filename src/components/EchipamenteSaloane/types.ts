import { BaseInterfaceModal } from "../utils/types";

export interface EchipamentSalonInterface extends BaseInterfaceModal {
  idSalon: number;
  idEchipament: number;
}
export interface CreateEchipamentSalonInterface {
  idSaloane: number[];
  idEchipamente: number[];
}
