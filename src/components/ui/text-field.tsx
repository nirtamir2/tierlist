import type { PolymorphicProps } from "@kobalte/core";
import * as TextFieldPrimitive from "@kobalte/core/text-field";
import { cva } from "class-variance-authority";
import { clsx } from "clsx";
import type { ValidComponent } from "solid-js";
import { splitProps } from "solid-js";

type OmitClass<T> = Omit<T, "class">;

const TextField = TextFieldPrimitive.Root;

type TextFieldInputProps<T extends ValidComponent = "input"> = OmitClass<
  TextFieldPrimitive.TextFieldInputProps<T>
> & {
  type:
    | "button"
    | "checkbox"
    | "color"
    | "date"
    | "datetime-local"
    | "email"
    | "file"
    | "hidden"
    | "image"
    | "month"
    | "number"
    | "password"
    | "radio"
    | "range"
    | "reset"
    | "search"
    | "submit"
    | "tel"
    | "text"
    | "time"
    | "url"
    | "week";
};

const TextFieldInput = <T extends ValidComponent = "input">(
  props: PolymorphicProps<T, TextFieldInputProps<T>>,
) => {
  const [local, others] = splitProps(props as unknown as TextFieldInputProps, [
    "type",
  ]);
  return (
    <TextFieldPrimitive.Input
      type={local.type}
      class="flex h-10 w-full rounded-md border border-input bg-transparent px-3 py-2 text-sm ring-offset-background file:border-0 file:bg-transparent file:text-sm file:font-medium placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...others}
    />
  );
};

type TextFieldTextAreaProps<T extends ValidComponent = "textarea"> = OmitClass<
  TextFieldPrimitive.TextFieldTextAreaProps<T>
>;

const TextFieldTextArea = <T extends ValidComponent = "textarea">(
  props: PolymorphicProps<T, TextFieldTextAreaProps<T>>,
) => {
  return (
    <TextFieldPrimitive.TextArea
      class="flex min-h-[80px] w-full rounded-md border border-input bg-background px-3 py-2 text-sm ring-offset-background placeholder:text-muted-foreground focus-visible:outline-none focus-visible:ring-2 focus-visible:ring-ring focus-visible:ring-offset-2 disabled:cursor-not-allowed disabled:opacity-50"
      {...props}
    />
  );
};

const labelVariants = cva(
  "text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70",
  {
    variants: {
      variant: {
        label: "data-[invalid]:text-destructive",
        description: "text-destructive",
        error: "font-normal text-muted-foreground",
      },
    },
    defaultVariants: {
      variant: "label",
    },
  },
);

type TextFieldLabelProps<T extends ValidComponent = "label"> = OmitClass<
  TextFieldPrimitive.TextFieldLabelProps<T>
>;

const TextFieldLabel = <T extends ValidComponent = "label">(
  props: PolymorphicProps<T, TextFieldLabelProps<T>>,
) => {
  return <TextFieldPrimitive.Label class={labelVariants()} {...props} />;
};

type TextFieldDescriptionProps<T extends ValidComponent = "div"> = OmitClass<
  TextFieldPrimitive.TextFieldDescriptionProps<T>
>;

const TextFieldDescription = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldDescriptionProps<T>>,
) => {
  return (
    <TextFieldPrimitive.Description
      class={clsx(labelVariants({ variant: "description" }))}
      {...props}
    />
  );
};

type TextFieldErrorMessageProps<T extends ValidComponent = "div"> = OmitClass<
  TextFieldPrimitive.TextFieldErrorMessageProps<T>
>;

const TextFieldErrorMessage = <T extends ValidComponent = "div">(
  props: PolymorphicProps<T, TextFieldErrorMessageProps<T>>,
) => {
  return (
    <TextFieldPrimitive.ErrorMessage
      class={labelVariants({ variant: "error" })}
      {...props}
    />
  );
};

export {
  TextField,
  TextFieldInput,
  TextFieldTextArea,
  TextFieldLabel,
  TextFieldDescription,
  TextFieldErrorMessage,
};
