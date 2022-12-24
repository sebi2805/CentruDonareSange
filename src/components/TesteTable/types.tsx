import internal from "stream";
import { BaseInterfaceModal } from "../utils/types";

export interface TesteInterface extends BaseInterfaceModal {
  idTest?: number;
  hiv: string | null;
  hcv: string | null;
  verificareGrupajulSanguin: string | null;
  diabet: string | null;
  idDonatie: number | null;
}
