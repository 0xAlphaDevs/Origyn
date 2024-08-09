import { atom } from "recoil";

interface CreatorSession {
  proof: any | null;
  verified: boolean;
}

export const creatorSessionAtom = atom<CreatorSession>({
  key: "creatorSessionAtom",
  default: {
    proof: null,
    verified: false,
  },
});
