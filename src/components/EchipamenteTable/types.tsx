import { BaseInterfaceModal } from "../utils/types";

export interface EchipamenteInterface extends BaseInterfaceModal {
  idEchipament?: number;
  denumireTehnica: string;
  serie: string;
  dataCumparare?: string;
}
