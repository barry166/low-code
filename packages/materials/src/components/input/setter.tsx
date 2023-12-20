import { ProForm, ProFormText } from "@ant-design/pro-components";

const InputSetter = () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormText name="placeholder" label="提示文案" />
    </ProForm>
  );
};

export default InputSetter;
