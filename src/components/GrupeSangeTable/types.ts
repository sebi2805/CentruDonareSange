import { BaseInterfaceModal } from "../utils/types";

export interface GrupeSangeInterface extends BaseInterfaceModal {
  idGrupaSange?: number;
  den_grupa: string | null;
  anticorpi: string;
  antigene: string;
}
