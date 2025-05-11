import GeneralInfoForm from "../Forms/GeneralInfoForm";
import PersonalInfoForm from "../Forms/PersonalInfoForm";

export const steps: Array<{
  title: string;
  component: React.ComponentType;
  key: string;
}> = [
  { title: "General Info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
];
