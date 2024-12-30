import { UseFormRegister, UseFormWatch } from "react-hook-form";

export type FormValues = {
  username: string;
  email: string;
  age: string;
  phoneNumbers: string[];
  phNumbers: [{ number: string }];
  social: string;
  servicePlan: string;
  components: string[];
};

export type PricingDetail = {
  pricingEntryId: number;
  serviceComponent: boolean;
  planPrice: number;
  componentName: string;
  componentPrice: number;
  removable: boolean;
  type: string;
};

export type ServicePlan = {
  servicePlanName: string;
  pricingDetails: PricingDetail[];
};

export type Props = {
  response: ServicePlan[];
  register: UseFormRegister<FormValues>;
  watch: UseFormWatch<FormValues>;
};
