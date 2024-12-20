import { BaseInterfaceModal } from "../utils/types";

export interface ReviziiTehniceInterface extends BaseInterfaceModal {
  idRevizieTehnica?: number;
  dataRevizie?: string;
  rezultatRevizie: string | null;
  idEchipament: number | null;
}
