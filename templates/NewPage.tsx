import { Scaffold } from "../components/Scaffold";
// import { Scaffold } from "../jd-react-kit/components/Scaffold";
import { Box } from "@mui/material";

import yaml from "js-yaml";
import NewPageYaml from "../contents/NewPage.yaml?raw";

type PageContent = {
  title: string;
  address: string;
  phone: string;
  email: string;
};
const pageContent = yaml.load(NewPageYaml) as PageContent;

export default function NewPage() {
  return (
    <Scaffold
      appname="YETGER"
      logo="/assets/images/logo.png"
      title={pageContent.title}
      body=<Box></Box>
    />
  );
}
