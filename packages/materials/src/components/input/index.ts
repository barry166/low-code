import InputSetter from "./setter";
import InternalInput from "./input";
import type { IInputProps } from "./types";
import { withStaticProps } from "../../helper";

export type { IInputProps } from "./types";

export const Input = withStaticProps<
  IInputProps,
  { Setter: typeof InputSetter }
>(InternalInput, {
  Setter: InputSetter,
});
