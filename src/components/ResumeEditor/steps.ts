import GeneralInfoForm from "../Forms/GeneralInfoForm";
import PersonalInfoForm from "../Forms/PersonalInfoForm";
import WorkExperienceForm from "../Forms/WorkExperienceForm";
import EducationForm from "../Forms/EducationForm";
import SkillsForm from "../Forms/SkillsForm";
import SummaryForm from "../Forms/SummaryForm";

export const steps: Array<{
  title: string;
  component: React.ComponentType;
  key: string;
}> = [
  { title: "General Info", component: GeneralInfoForm, key: "general-info" },
  { title: "Personal Info", component: PersonalInfoForm, key: "personal-info" },
  {
    title: "Work Experience",
    component: WorkExperienceForm,
    key: "work-experience",
  },
  { title: "Education", component: EducationForm, key: "education" },
  { title: "Skills", component: SkillsForm, key: "skills" },
  { title: "Summary", component: SummaryForm, key: "summary" },
];
