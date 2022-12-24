import { BaseInterfaceModal } from "../utils/types";

export interface EchipamenteInterface extends BaseInterfaceModal {
  idEchipament?: number;
  denumireTehnica: string | null;
  serie: string | null;
  dataCumparare?: string;
  idSaloane?: number[];
}
