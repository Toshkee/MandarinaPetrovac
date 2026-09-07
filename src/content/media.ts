/**
 * Media manifest: every photograph used on the site, with localized alt text and
 * captions, intended placement and a responsive focal point (percentages used as
 * object-position when an image is cropped by its frame).
 *
 * Source files live in src/assets/photos and are processed by Astro's image
 * pipeline at build time. To replace a photo, drop a new file in that folder,
 * update the import below and keep the alt/caption truthful.
 */
import type { ImageMetadata } from 'astro';
import type { Localized } from '../i18n/types';

import terraceViewDay from '../assets/photos/terrace-view-day.jpg';
import livingRoomBalcony from '../assets/photos/living-room-balcony.jpg';
import livingRoomFromHall from '../assets/photos/living-room-from-hall.jpg';
import bedroomSeaView from '../assets/photos/bedroom-sea-view.jpg';
import kitchenBlue from '../assets/photos/kitchen-blue.jpg';
import bedroomWardrobeHall from '../assets/photos/bedroom-wardrobe-hall.jpg';
import buildingPoolOlive from '../assets/photos/building-pool-olive.jpg';
import poolSeaView from '../assets/photos/pool-sea-view.jpg';
import petrovacDusk from '../assets/photos/petrovac-dusk.jpg';
import heroBalconyView from '../assets/photos/hero-balcony-view.png';

export type Placement = 'hero' | 'intro' | 'interiors' | 'pool' | 'gallery' | 'social';

export interface MediaItem {
  id: MediaId;
  /** File name inside src/assets/photos (for the owner's reference). */
  file: string;
  src: ImageMetadata;
  alt: Localized;
  caption: Localized;
  placement: Placement[];
  /** Focal point in percent, used as object-position when the frame crops the image. */
  focal: { x: number; y: number };
}

export type MediaId =
  | 'terraceViewDay'
  | 'livingRoomBalcony'
  | 'livingRoomFromHall'
  | 'bedroomSeaView'
  | 'kitchenBlue'
  | 'bedroomWardrobeHall'
  | 'buildingPoolOlive'
  | 'poolSeaView'
  | 'petrovacDusk'
  | 'heroBalconyView';

export const media: Record<MediaId, MediaItem> = {
  heroBalconyView: {
    id: 'heroBalconyView',
    file: 'hero-balcony-view.png',
    src: heroBalconyView,
    alt: {
      me: 'Pogled sa terase apartmana preko staklene ograde i krovova Petrovca prema Jadranskom moru pod plavim nebom',
      en: 'View from the apartment terrace across the glass railing and Petrovac rooftops towards the Adriatic under a blue sky',
    },
    caption: { me: 'Pogled sa terase prema Petrovcu i moru', en: 'The view from the terrace over Petrovac and the sea' },
    placement: ['hero'],
    focal: { x: 54, y: 48 },
  },
  terraceViewDay: {
    id: 'terraceViewDay',
    file: 'terrace-view-day.jpg',
    src: terraceViewDay,
    alt: {
      me: 'Terasa apartmana s dvije bijele naslonjače i crnim stolićem, iza staklene ograde krovovi Petrovca i Jadransko more',
      en: 'The apartment terrace with two white armchairs and a black side table; beyond the glass railing, the rooftops of Petrovac and the Adriatic Sea',
    },
    caption: { me: 'Terasa, pogled preko Petrovca ka moru', en: 'The terrace, looking over Petrovac to the sea' },
    placement: ['hero', 'gallery', 'social'],
    focal: { x: 50, y: 42 },
  },
  livingRoomBalcony: {
    id: 'livingRoomBalcony',
    file: 'living-room-balcony.jpg',
    src: livingRoomBalcony,
    alt: {
      me: 'Dnevni boravak s krem sofom i plavim jastucima, pletenom visećom lampom, drvenim stolićem i otvorenim kliznim vratima ka terasi s pogledom na more',
      en: 'Living room with a cream sofa and blue cushions, a woven pendant lamp, a wooden coffee table and sliding doors open to the terrace with a sea view',
    },
    caption: {
      me: 'Dnevni boravak: sofa uz klizna vrata terase, pletena rasvjeta i šank za doručak',
      en: 'The living room: a sofa beside the terrace doors, a woven pendant and a breakfast bar',
    },
    placement: ['interiors', 'gallery'],
    focal: { x: 45, y: 50 },
  },
  livingRoomFromHall: {
    id: 'livingRoomFromHall',
    file: 'living-room-from-hall.jpg',
    src: livingRoomFromHall,
    alt: {
      me: 'Pogled iz hodnika: lijevo vrata spavaće sobe s krevetom, pravo dnevni boravak sa sofom i vrata terase s pogledom na more',
      en: 'View from the hallway: the bedroom door and bed on the left, the living room sofa and terrace doors with a sea view straight ahead',
    },
    caption: {
      me: 'Iz hodnika: spavaća soba lijevo, dnevni boravak i terasa pravo',
      en: 'From the hallway: the bedroom on the left, the living room and terrace straight ahead',
    },
    placement: ['intro', 'gallery'],
    focal: { x: 55, y: 50 },
  },
  bedroomSeaView: {
    id: 'bedroomSeaView',
    file: 'bedroom-sea-view.jpg',
    src: bedroomSeaView,
    alt: {
      me: 'Spavaća soba s bračnim krevetom, tapaciranim uzglavljem, dvije narandžaste slike i velikim prozorom kroz koji se vide zgrade Petrovca i more',
      en: 'Bedroom with a double bed, an upholstered headboard, two orange paintings and a tall window showing the buildings of Petrovac and the sea',
    },
    caption: {
      me: 'Spavaća soba: kroz prozor se vidi more iznad krovova Petrovca',
      en: 'The bedroom: the sea shows above the rooftops of Petrovac through the window',
    },
    placement: ['interiors', 'gallery'],
    focal: { x: 55, y: 50 },
  },
  kitchenBlue: {
    id: 'kitchenBlue',
    file: 'kitchen-blue.jpg',
    src: kitchenBlue,
    alt: {
      me: 'Kuhinja sa svijetloplavim gornjim elementima, pločom za kuvanje, sudoperom, drvenim šankom s dvije visoke stolice i pletenom lampom u prvom planu',
      en: 'Kitchen with pale blue upper cabinets, a hob, a sink, a wooden breakfast bar with two tall stools and a woven lamp in the foreground',
    },
    caption: {
      me: 'Kuhinja u svijetloplavoj: ploča za kuvanje, sudopera i visoke stolice uz šank',
      en: 'The kitchen in pale blue: hob, sink and tall stools at the counter',
    },
    placement: ['interiors', 'gallery'],
    focal: { x: 40, y: 55 },
  },
  bedroomWardrobeHall: {
    id: 'bedroomWardrobeHall',
    file: 'bedroom-wardrobe-hall.jpg',
    src: bedroomWardrobeHall,
    alt: {
      me: 'Ugradni plakar s kliznim vratima u spavaćoj sobi, klima uređaj iznad vrata i pogled kroz otvorena vrata u hodnik s ogledalom i tabureom',
      en: 'Built-in wardrobe with sliding doors in the bedroom, an air-conditioning unit above the door and a view through the open door into the hallway with a mirror and stool',
    },
    caption: {
      me: 'Plakar u spavaćoj sobi i hodnik s ogledalom',
      en: 'The wardrobe in the bedroom and the hallway with its mirror',
    },
    placement: ['interiors', 'gallery'],
    focal: { x: 50, y: 50 },
  },
  buildingPoolOlive: {
    id: 'buildingPoolOlive',
    file: 'building-pool-olive.jpg',
    src: buildingPoolOlive,
    alt: {
      me: 'Svijetla stambena zgrada sa staklenim balkonima, maslina i šljunčano dvorište uz bazen kompleksa',
      en: 'A pale residential building with glass balconies, an olive tree and a pebbled garden beside the complex pool',
    },
    caption: { me: 'Zgrada, masline i bazen kompleksa', en: 'The building, olive trees and the complex pool' },
    placement: ['pool', 'gallery'],
    focal: { x: 50, y: 55 },
  },
  poolSeaView: {
    id: 'poolSeaView',
    file: 'pool-sea-view.jpg',
    src: poolSeaView,
    alt: {
      me: 'Bazen s plavim mozaikom i metalnim stepenicama, iza ograde palma, zelenilo i otvoreno more',
      en: 'A pool with blue mosaic tiles and metal steps; beyond the railing, a palm, greenery and the open sea',
    },
    caption: { me: 'Bazen u sklopu kompleksa, okrenut ka moru', en: 'The pool in the complex, facing the sea' },
    placement: ['pool', 'gallery'],
    focal: { x: 50, y: 45 },
  },
  petrovacDusk: {
    id: 'petrovacDusk',
    file: 'petrovac-dusk.jpg',
    src: petrovacDusk,
    alt: {
      me: 'Petrovac u sumrak: krovovi i zgrade spuštaju se ka moru, nad horizontom narandžasti sjaj poslije zalaska sunca',
      en: 'Petrovac at dusk: rooftops and buildings step down to the sea, with an orange glow above the horizon after sunset',
    },
    caption: { me: 'Petrovac u sumrak', en: 'Petrovac at dusk' },
    placement: ['hero', 'gallery'],
    focal: { x: 50, y: 62 },
  },
};

/** Gallery order: alternate interior, terrace, view and pool so the grid has rhythm. */
export const galleryOrder: MediaId[] = [
  'livingRoomBalcony',
  'bedroomSeaView',
  'kitchenBlue',
  'bedroomWardrobeHall',
];

export function mediaList(): MediaItem[] {
  return Object.values(media);
}
