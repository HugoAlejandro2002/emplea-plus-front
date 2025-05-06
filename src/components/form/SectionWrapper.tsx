import DynamicFormSection from "./DynamicFormSection";
import RepeatableFormSection from "./RepeatableFormSection";

interface Props {
  section: any;
  register: any;
  control: any;
  errors: any;
}

const SectionWrapper = ({ section, register, control, errors }: Props) => {
  return section.repeatable ? (
    <RepeatableFormSection
      section={section}
      control={control}
      register={register}
      errors={errors}
    />
  ) : (
    <DynamicFormSection
      section={section}
      register={register}
      errors={errors}
    />
  );
};

export default SectionWrapper;