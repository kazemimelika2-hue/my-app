import { atom } from 'jotai';

export const favouritesAtom = atom();

export const favouritesCountAtom = atom((get) => get(favouritesAtom)?.length || 0);