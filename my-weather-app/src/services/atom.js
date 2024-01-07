import { atom } from "recoil";
export const _weather = atom({
  key: "_weather",
  default: [],
});
export const _location = atom({
  key: "_location",
  default: "",
});
