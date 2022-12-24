import internal from "stream";
import { BaseInterfaceModal } from "../utils/types";

export interface DonatoriInterface extends BaseInterfaceModal {
  idDonator?: number;
  nume: string | null;
  prenume: string | null;
  dataNasterii: string;
  idGrupaSange: number | null;
  greutate: number;
  inaltime: number;
  cnp: string;
  sex: string | null;
}
