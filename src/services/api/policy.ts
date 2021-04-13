import * as fetch from "../fetch";

type Parameter = {
  name: string;
  market?: string;
  symbol: string;
  value: number | boolean;
};

type Policy = {
  id: number;
  parentID: number;
  name: string;
  shared: boolean | string;
};

type CreatePolicy = {
  name: string;
  parentId: number;
  parameters: Parameter[];
};

export const Policies = {
  index: async () => {
    let policies: Policy[] = [],
      error: Error = {} as Error;

    try {
      const response = await fetch.get<Policy[]>("policy");

      const policyResponse = response.map((policy) => ({
        ...policy,
        shared: policy.shared ? "Compartilhada" : "Privada",
      }));

      policies = policyResponse;
    } catch (err) {
      error = err;
    }

    return { policies, error };
  },

  create: async (policy: CreatePolicy) => {
    try {
      const response = await fetch.post("policy", policy);

      console.log(response);
    } catch (err) {
      console.log(err);
    }
  },
};
