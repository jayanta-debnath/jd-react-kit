import { Scaffold } from "../components/Scaffold";
// import { Scaffold } from "../jd-react-kit/components/Scaffold";
import { Box } from "@mui/material";

import yaml from "js-yaml";
import PageYaml from "../contents/Page.yaml?raw";

type PageContent = {
  title: string;
  address: string;
  phone: string;
  email: string;
};
const pageContent = yaml.load(PageYaml) as PageContent;

export default function NewPage() {
  return <Scaffold appname="YETGER" title="Contact Us" body=<Box></Box> />;
}
