import InternalButton from "./Button";
import { withStaticProps } from "../../helper";
import type { IButtonProps } from "./types";
import ButtonSetter from "./setter";

export type { IButtonProps } from "./types";

export const Button = withStaticProps<
  IButtonProps,
  { Setter: typeof ButtonSetter }
>(InternalButton, {
  Setter: ButtonSetter,
});
