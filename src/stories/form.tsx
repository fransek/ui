import React from "react";
import { Button } from "../components/button";
import { Checkbox } from "../components/checkbox";
import { Input } from "../components/input";
import { Radio } from "../components/radio";
import { RadioGroup } from "../components/radio-group";
import { Select } from "../components/select";
import { Textarea } from "../components/textarea";
import { useToast } from "../components/toast";

export function Form() {
  const toast = useToast();
  const [values, setValues] = React.useState<SignUpValues>(emptyValues);
  const [errors, setErrors] = React.useState<SignUpErrors>({});

  const update = <K extends keyof SignUpValues>(
    key: K,
    value: SignUpValues[K],
  ) => {
    setValues((prev) => ({ ...prev, [key]: value }));
    setErrors((prev) => ({ ...prev, [key]: undefined }));
  };

  const handleSubmit: React.DOMAttributes<HTMLFormElement>["onSubmit"] = (
    event,
  ) => {
    event.preventDefault();
    const nextErrors = validate(values);
    setErrors(nextErrors);

    if (Object.keys(nextErrors).length > 0) {
      toast.add({
        type: "error",
        title: "Check the form",
        description: "Some fields need your attention.",
      });
      return;
    }

    toast.add({
      type: "success",
      title: "Account created",
      description: `Welcome aboard, ${values.name}!`,
    });
    setValues(emptyValues);
  };

  return (
    <form
      onSubmit={handleSubmit}
      noValidate
      className="card m-auto flex w-full max-w-xl flex-col gap-4 p-6"
    >
      <div className="flex flex-col gap-1">
        <h2 className="text-foreground text-xl font-semibold">
          Create your account
        </h2>
        <p className="text-muted-foreground text-sm">
          Fill in the details below to get started.
        </p>
      </div>

      <Input
        label="Name"
        placeholder="Ada Lovelace"
        value={values.name}
        onChange={(event) => update("name", event.target.value)}
        errorMessage={errors.name}
      />

      <Input
        label="Email"
        type="email"
        placeholder="ada@example.com"
        value={values.email}
        onChange={(event) => update("email", event.target.value)}
        errorMessage={errors.email}
      />

      <Input
        label="Password"
        type="password"
        placeholder="At least 8 characters"
        value={values.password}
        onChange={(event) => update("password", event.target.value)}
        errorMessage={errors.password}
        infoPopover="Use at least 8 characters with a mix of letters and numbers."
      />

      <Select
        label="Role"
        placeholder="Select a role"
        items={roles}
        value={values.role}
        onValueChange={(value) => update("role", value)}
        errorMessage={errors.role}
      />

      <RadioGroup
        label="Plan"
        value={values.plan}
        onValueChange={(value) => update("plan", value as string)}
        errorMessage={errors.plan}
      >
        <Radio value="free" label="Free" />
        <Radio value="pro" label="Pro" />
        <Radio value="enterprise" label="Enterprise" />
      </RadioGroup>

      <Textarea
        label="Bio"
        placeholder="Tell us a little about yourself"
        rows={3}
        value={values.bio}
        onChange={(event) => update("bio", event.target.value)}
        description="Optional — this appears on your public profile."
      />

      <Checkbox
        label="I accept the terms and conditions"
        checked={values.terms}
        onCheckedChange={(checked) => update("terms", checked === true)}
        errorMessage={errors.terms}
      />

      <div className="flex justify-end gap-2 pt-2">
        <Button
          type="button"
          variant="ghost"
          onClick={() => {
            setValues(emptyValues);
            setErrors({});
          }}
        >
          Reset
        </Button>
        <Button type="submit">Create account</Button>
      </div>
    </form>
  );
}

interface SignUpValues {
  name: string;
  email: string;
  password: string;
  role: string | null;
  plan: string;
  bio: string;
  terms: boolean;
}

type SignUpErrors = Partial<Record<keyof SignUpValues, string>>;

const emptyValues: SignUpValues = {
  name: "",
  email: "",
  password: "",
  role: null,
  plan: "",
  bio: "",
  terms: false,
};

const roles = [
  { label: "Developer", value: "developer" },
  { label: "Designer", value: "designer" },
  { label: "Product manager", value: "product" },
  { label: "Other", value: "other" },
] as const;

function validate(values: SignUpValues): SignUpErrors {
  const errors: SignUpErrors = {};

  if (!values.name.trim()) {
    errors.name = "Please enter your name.";
  }
  if (!values.email.trim()) {
    errors.email = "Please enter your email.";
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(values.email)) {
    errors.email = "Please enter a valid email address.";
  }
  if (!values.password) {
    errors.password = "Please choose a password.";
  } else if (values.password.length < 8) {
    errors.password = "Password must be at least 8 characters.";
  }
  if (!values.role) {
    errors.role = "Please select a role.";
  }
  if (!values.plan) {
    errors.plan = "Please choose a plan.";
  }
  if (!values.terms) {
    errors.terms = "You must accept the terms to continue.";
  }

  return errors;
}
