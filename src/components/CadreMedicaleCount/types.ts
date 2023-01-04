export interface CadreMedicaleCount {
  idCadruMedical: number;
  nrDonatii: number;
}
export interface FilterCadreMedicaleCount {
  idCadruMedical: number | null;
  minCount: number;
}
