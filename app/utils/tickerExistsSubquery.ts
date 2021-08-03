
export const tickerExistsSubquery = async (tickerRef: { collection: (arg0: string) => { (): any; new(): any; where: { (arg0: any, arg1: string, arg2: string): { (): any; new(): any; orderBy: { (arg0: any, arg1: string): { (): any; new(): any; limit: { (arg0: number): any; new(): any; }; }; new(): any; }; }; new(): any; }; }; }, queryField: string) => {
  // * Get sector & industry data
  const sectorRef = tickerRef
    .collection("data")
    .where(queryField, ">", "''")
    .orderBy(queryField, "asc")
    .limit(1);

  let sector = (await sectorRef.get()).docs?.[0].data() ?? null;

  return { ...sector, lastUpdate: sector?.lastUpdate.toMillis() ?? null };
};
