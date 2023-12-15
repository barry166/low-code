import { IButtonProps } from "./types";
import classNames from "classnames";

const Button: React.FC<IButtonProps> = (props) => {
  const { type, children } = props;

  const classes = classNames("button", {
    [`button-${type}`]: type,
  });
  return <button className={classes}>{children}</button>;
};

Button.defaultProps = {
  type: "default",
};

export default Button;
