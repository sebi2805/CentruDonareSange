import { BaseInterfaceModal } from "../utils/types";

export interface GrupeSangeInterface extends BaseInterfaceModal {
  idGrupaSange?: number;
  denumire: string;
  anticorpi: string;
  antigene: string;
}
