import { BaseInterfaceModal } from "../utils/types";

export interface ReviziiTehniceInterface extends BaseInterfaceModal {
  idRevizieTehnica?: number;
  dataRevizieTehnica?: string;
  rezultatRevizieTehnica: string;
  idEchipament: number;
}
