import { type Page } from "@playwright/test";

export type InputType = {
  type: string;
  value: string;
};

export type Input = {
  fieldId: string;
  label: string;
  isRequired?: boolean;
  field: InputType;
};

export const phoneExtensions = {
  EMEA: "+7",
  AMER: "+1",
  APAC: "+81",
} as const;

export const URL = "/contact-us";
export const FORM_ID = "mktoForm_1987";

export const fillForm = async (page: Page, isSales?: boolean) => {
  const fieldsList = isSales ? salesInputList : supportInputList;

  for (const element of fieldsList) {
    if (element.field.type === "input") {
      await page.getByLabel(element.label).fill(element.field.value);
    }
    if (element.field.type === "select") {
      const isReasonForContact = element.fieldId === "Reason_for_Contact__c";
      let value = element.field.value;

      if (isReasonForContact && isSales) {
        value = "Sales-Inquiry";
      }

      await page.getByLabel(element.label).selectOption({ value });
    }
    if (element.field.type === "checkbox") {
      await page.getByLabel(element.label).click();
    }
  }
};

// This is the default list of form fields, loaded from Marketo
// Any changes made in Marketo will need to be reflected here
export const initialInputList = [
  {
    fieldId: "Reason_for_Contact__c",
    label: "*How can we help?",
    isRequired: true,
    field: {
      type: "select",
      value: "Support",
    },
  },
  {
    fieldId: "FirstName",
    label: "*First name",
    field: {
      type: "input",
      value: "Frontend",
    },
    isRequired: true,
  },
  {
    fieldId: "LastName",
    label: "*Last name",
    field: {
      value: "Test",
      type: "input",
    },
    isRequired: true,
  },
  {
    fieldId: "Email",
    label: "*Business email",
    field: {
      value: "dotcom.squad@telnyx.com",
      type: "input",
    },
    isRequired: true,
  },
  {
    fieldId: "Phone_Number_Extension__c",
    label: "*Country",
    field: {
      type: "select",
      value: phoneExtensions.APAC,
    },
    isRequired: false,
  },
  {
    fieldId: "Phone_Number_Base__c",
    label: "*Phone number",
    field: {
      value: "1234567890",
      type: "input",
    },
    isRequired: false,
  },
  {
    fieldId: "Website",
    label: "*Company website",
    field: {
      value: "https://telnyx.com",
      type: "input",
    },
    isRequired: true,
  },
] as Input[];

export const endInputList = [
  {
    fieldId: "How_did_you_hear_about_Telnyx_Open__c",
    label: "*How did you hear about Telnyx?",
    field: {
      value: "Google",
      type: "input",
    },
    isRequired: true,
  },
  {
    fieldId: "mktoCheckbox_13332_0",
    label: "I want to receive marketing emails from Telnyx",
    field: {
      type: "checkbox",
      value: true,
    },
  },
] as Input[];

export const supportInputList = [
  ...initialInputList,
  {
    fieldId: "Form_Additional_Information__c",
    label: "*Please describe your request",
    field: {
      value: "This is an E2E test from the dotcom squad. Please ignore.",
      type: "input",
    },
    isRequired: true,
  },
  ...endInputList,
] as Input[];

export const salesInputList = [
  ...initialInputList,
  {
    fieldId: "Form_Product__c",
    label: "*Primary Product Interest",
    isRequired: true,
    field: {
      type: "select",
      value: "Messaging",
    },
  },
  {
    fieldId: "Use_Case_Form__c",
    label: "*Use Case",
    isRequired: true,
    field: {
      type: "select",
      value: "Other",
    },
  },
  {
    fieldId: "Form_Budget__c",
    label: "*What is your estimated monthly spend?",
    isRequired: true,
    field: {
      type: "select",
      value: "Less than $500",
    },
  },
  {
    fieldId: "Form_Additional_Information__c",
    label: "*How do you plan to use Telnyx?",
    field: {
      value: "This is an E2E test from the dotcom squad. Please ignore.",
      type: "input",
    },
    isRequired: true,
  },
  ...endInputList,
] as Input[];
