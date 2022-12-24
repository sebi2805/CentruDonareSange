import { BaseInterfaceModal } from "../utils/types";

export interface GrupeSangeInterface extends BaseInterfaceModal {
  idGrupaSange?: number;
  denumire: string | null;
  anticorpi: string;
  antigene: string;
}
