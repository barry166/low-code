import { ProForm, ProFormText } from "@ant-design/pro-components";

const ButtonSetter = () => {
  return (
    <ProForm
      onFinish={async (values) => {
        console.log(values);
      }}
    >
      <ProFormText name="lable" label="文本" />
    </ProForm>
  );
};

export default ButtonSetter;
