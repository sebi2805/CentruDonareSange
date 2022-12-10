import internal from "stream";
import { BaseInterfaceModal } from "../utils/types";

export interface TesteInterface extends BaseInterfaceModal {
  idTest?: number;
  hiv: string;
  hcv: string;
  verificareGrupajulSanguin: string;
  diabet: string;
  idDonatie: number;
}
