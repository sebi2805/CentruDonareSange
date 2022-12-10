import internal from "stream";
import { BaseInterfaceModal } from "../utils/types";

export interface DonatoriInterface extends BaseInterfaceModal {
  idDonator?: number;
  nume: string;
  prenume: string;
  dataNasterii: string;
  idGrupaSange: number;
  greutate: number;
  inaltime: number;
  cnp: string;
  sex: string;
}
