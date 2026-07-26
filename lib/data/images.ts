/**
 * Curated, verified Unsplash luxury architecture & interiors.
 * All IDs return HTTP 200. Use `img()` to request a sized, optimized variant.
 */
export const PHOTOS = {
  villaGlassPool: "1600596542815-ffad4c1539a9",
  modernNightVilla: "1512917774080-9991f1c4c750",
  whiteCliffVilla: "1613490493576-7fde63acd811",
  minimalConcrete: "1600585154340-be6161a56a0c",
  infinityPoolDusk: "1600047509807-ba8f99d2cdde",
  whiteMediterranean: "1580587771525-78b9dba3b914",
  nycPenthouseView: "1493809842364-78817add7ffb",
  dubaiSkyline: "1512453979798-5ea266f8880c",
  warmLivingRoom: "1600607687939-ce8a6c25118c",
  marbleKitchen: "1600566753086-00f18fb6b3ea",
  sculptedStair: "1600210492486-724fe5c67fb0",
  cityApartment: "1560518883-ce09059eeffa",
  glassLakeHouse: "1600573472550-8090b5e0745e",
  softBedroom: "1600566753190-17f0baa2a6c3",
  loungeGold: "1600607687920-4e2a09cf159d",
  spaBathroom: "1600585152220-90363fe7e115",
  poolTerrace: "1512918728675-ed5a9ecdebfd",
  diningHall: "1600047509358-9dc75507daeb",
  brutalistFacade: "1600121848594-d8644e57abab",
  openPlanLiving: "1600585153490-76fb20a32601",
  masterSuite: "1600566752355-35792bedcfea",
  libraryStudy: "1600607688969-a5bfcd646154",
  gardenPavilion: "1600585154084-4e5fe7c39198",
} as const;

export type PhotoKey = keyof typeof PHOTOS;

/** Build an optimized Unsplash URL for a given curated key. */
export function img(key: PhotoKey, w = 1600, q = 80): string {
  return `https://images.unsplash.com/photo-${PHOTOS[key]}?auto=format&fit=crop&w=${w}&q=${q}`;
}

/** Raw URL by key (for meta / og). */
export function imgById(id: string, w = 1600, q = 80): string {
  return `https://images.unsplash.com/photo-${id}?auto=format&fit=crop&w=${w}&q=${q}`;
}
