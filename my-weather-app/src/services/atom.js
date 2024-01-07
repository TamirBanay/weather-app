import { atom } from "recoil";
export const _weather = atom({
  key: "_weather",
  default: [],
});
export const _location = atom({
  key: "_location",
  default: "",
});
export const _city = atom({
  key: "_city",
  default: "tel-aviv",
});
