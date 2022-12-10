import internal from "stream";
import { BaseInterfaceModal } from "../utils/types";

export interface RecipienteInterface extends BaseInterfaceModal {
  idRecipient?: number;
  denumire: string;
  culoare: string;
  temperaturaInceput: number;
  temperaturaSfarsit: number;
}
