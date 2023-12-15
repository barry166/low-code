// import { Button } from "@lowcode/materials";
import Header from "../../components/header";
import Editor from "../../editor";
import "./index.scss";

function Index() {
  return (
    <div className="index-page">
      <Header />
      <div className="content-wrapper">
        <Editor />
      </div>
    </div>
  );
}

export default Index;
