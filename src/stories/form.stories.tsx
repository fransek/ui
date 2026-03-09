import type { Meta, StoryObj } from "@storybook/react-vite";
import React from "react";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { CheckboxGroup } from "../components/checkbox-group";
import { DatePicker } from "../components/date-picker";
import { Input } from "../components/input";
import { Radio } from "../components/radio";
import { RadioGroup } from "../components/radio-group";
import { Select } from "../components/select";

type FieldName =
  | "name"
  | "birthDate"
  | "favoriteFruit"
  | "contactMethod"
  | "interests"
  | "acceptTerms";
type FormErrors = Partial<Record<FieldName, string>>;

const fruitItems = [
  { label: "Apple", value: "apple" },
  { label: "Banana", value: "banana" },
  { label: "Orange", value: "orange" },
];

function ExampleForm() {
  const [name, setName] = React.useState("");
  const [birthDate, setBirthDate] = React.useState<Date | undefined>();
  const [favoriteFruit, setFavoriteFruit] = React.useState<
    string | undefined
  >();
  const [contactMethod, setContactMethod] = React.useState<
    string | undefined
  >();
  const [interests, setInterests] = React.useState<string[]>([]);
  const [acceptTerms, setAcceptTerms] = React.useState(false);
  const [errors, setErrors] = React.useState<FormErrors>({});
  const [isNameValidating, setIsNameValidating] = React.useState(false);
  const [isSubmitting, setIsSubmitting] = React.useState(false);
  const [submitMessage, setSubmitMessage] = React.useState("");

  function clearError(field: FieldName) {
    setErrors((currentErrors) => {
      const nextErrors = { ...currentErrors };
      delete nextErrors[field];
      return nextErrors;
    });
  }

  function validate(
    values?: Partial<{
      name: string;
      birthDate: Date | undefined;
      favoriteFruit: string | undefined;
      contactMethod: string | undefined;
      interests: string[];
      acceptTerms: boolean;
    }>,
  ) {
    const nextErrors: FormErrors = {};
    const resolvedName = values?.name ?? name;
    const resolvedBirthDate = values?.birthDate ?? birthDate;
    const resolvedFavoriteFruit = values?.favoriteFruit ?? favoriteFruit;
    const resolvedContactMethod = values?.contactMethod ?? contactMethod;
    const resolvedInterests = values?.interests ?? interests;
    const resolvedAcceptTerms = values?.acceptTerms ?? acceptTerms;

    if (!resolvedName.trim()) {
      nextErrors.name = "Full name is required.";
    }
    if (!resolvedBirthDate) {
      nextErrors.birthDate = "Date of birth is required.";
    }
    if (!resolvedFavoriteFruit) {
      nextErrors.favoriteFruit = "Please choose a favorite fruit.";
    }
    if (!resolvedContactMethod) {
      nextErrors.contactMethod = "Please choose a preferred contact method.";
    }
    if (!resolvedInterests.length) {
      nextErrors.interests = "Select at least one interest.";
    }
    if (!resolvedAcceptTerms) {
      nextErrors.acceptTerms = "You must accept the terms to continue.";
    }

    return nextErrors;
  }

  async function handleNameBlur() {
    if (!name.trim()) {
      return;
    }

    setIsNameValidating(true);
    await new Promise((resolve) => setTimeout(resolve, 600));
    setIsNameValidating(false);

    if (name.trim().length < 3) {
      setErrors((currentErrors) => ({
        ...currentErrors,
        name: "Full name must have at least 3 characters.",
      }));
      return;
    }

    clearError("name");
  }

  function handleSubmit(event: React.FormEvent<HTMLFormElement>) {
    event.preventDefault();
    setSubmitMessage("");

    const nextErrors = validate();
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      return;
    }

    setIsSubmitting(true);
    setTimeout(() => {
      setIsSubmitting(false);
      setSubmitMessage("Form submitted successfully.");
    }, 700);
  }

  function handleReset() {
    setName("");
    setBirthDate(undefined);
    setFavoriteFruit(undefined);
    setContactMethod(undefined);
    setInterests([]);
    setAcceptTerms(false);
    setErrors({});
    setSubmitMessage("");
    setIsNameValidating(false);
  }

  return (
    <form className="flex w-[440px] flex-col gap-4" onSubmit={handleSubmit}>
      <Input
        label="Full name"
        placeholder="Enter your full name"
        description="Used to personalize your profile."
        value={name}
        onChange={(event) => {
          setName(event.target.value);
          clearError("name");
          setSubmitMessage("");
        }}
        onBlur={handleNameBlur}
        errorMessage={errors.name}
        isValidating={isNameValidating}
        isValidatingMessage="Validating your name..."
      />
      <DatePicker
        label="Date of birth"
        description="Used for age verification."
        placeholder="Pick a date"
        value={birthDate}
        onValueChange={(value) => {
          setBirthDate(value);
          clearError("birthDate");
          setSubmitMessage("");
        }}
        errorMessage={errors.birthDate}
      />
      <Select
        label="Favorite fruit"
        description="Choose one option."
        placeholder="Select a fruit"
        items={fruitItems}
        value={favoriteFruit}
        onValueChange={(value) => {
          setFavoriteFruit(value as string | undefined);
          clearError("favoriteFruit");
          setSubmitMessage("");
        }}
        errorMessage={errors.favoriteFruit}
      />
      <RadioGroup
        label="Preferred contact method"
        description="We'll use this to send updates."
        value={contactMethod}
        onValueChange={(value) => {
          setContactMethod(value as string | undefined);
          clearError("contactMethod");
          setSubmitMessage("");
        }}
        errorMessage={errors.contactMethod}
      >
        <Radio value="email" label="Email" />
        <Radio value="phone" label="Phone" />
        <Radio value="sms" label="SMS" />
      </RadioGroup>
      <CheckboxGroup
        label="Interests"
        description="Select one or more."
        value={interests}
        onValueChange={(value) => {
          setInterests(value as string[]);
          clearError("interests");
          setSubmitMessage("");
        }}
        errorMessage={errors.interests}
      >
        <Checkbox label="Design" value="design" />
        <Checkbox label="Development" value="development" />
        <Checkbox label="Product" value="product" />
      </CheckboxGroup>
      <Checkbox
        label="I accept the terms and conditions"
        description="Required to submit the form."
        checked={acceptTerms}
        onCheckedChange={(checked) => {
          setAcceptTerms(checked === true);
          clearError("acceptTerms");
          setSubmitMessage("");
        }}
        errorMessage={errors.acceptTerms}
      />
      <div className="flex gap-2">
        <Button type="submit" disabled={isSubmitting}>
          {isSubmitting ? "Submitting..." : "Submit"}
        </Button>
        <Button type="button" variant="outline" onClick={handleReset}>
          Reset
        </Button>
      </div>
      {submitMessage && <p className="text-success text-sm">{submitMessage}</p>}
    </form>
  );
}

const meta = {
  title: "Components/Fields/Form",
  component: ExampleForm,
  parameters: {
    layout: "centered",
  },
  tags: ["autodocs"],
} satisfies Meta<typeof ExampleForm>;

export default meta;
type Story = StoryObj<typeof meta>;

export const WithValidation: Story = {
  args: {},
};
