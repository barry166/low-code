import { ProForm, ProFormSelect } from "@ant-design/pro-components";
import { IButtonProps } from ".";
import { CommonSetterProps } from "../../helper/types";

const ButtonSetter = (props: IButtonProps & CommonSetterProps) => {
  console.log("ButtonSetter", props);
  return (
    <ProForm
      submitter={false}
      onValuesChange={(values: any) => {
        console.log("onValuesChange", values);
        props.onChange(values);
      }}
    >
      <ProFormSelect
        name="type"
        label="type"
        options={[
          { label: "default", value: "default" },
          { label: "primary", value: "primary" },
          { label: "secondary", value: "secondary" },
          { label: "tertiary", value: "tertiary" },
        ]}
        placeholder="Please select a type"
      />
    </ProForm>
  );
};

export default ButtonSetter;
