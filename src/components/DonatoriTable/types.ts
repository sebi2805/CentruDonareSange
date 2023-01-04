import internal from "stream";
import { BaseInterfaceModal } from "../utils/types";

export interface DonatoriInterface extends BaseInterfaceModal {
  idDonator?: number;
  d_nume: string | null;
  d_prenume: string | null;
  dataNasterii: string;
  idGrupaSange: number | null;
  greutate: number;
  inaltime: number;
  cnp: string;
  sex: string | null;
}
