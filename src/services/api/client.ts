import * as fetch from "../fetch";

type Client = {
  account: string;
  document: string;
  name: string;
  policyId: number;
  status: string;
};

type Register = {
  document: string;
  name: string;
  advisor: number;
  status: string;
};

export const Clients = {
  search: async (query: string) => {
    let results: Client[] = [],
      error: Error = {} as Error;

    try {
      const response = await fetch.get<Client[]>(`client/search?q=${query}`);

      const searchResult = response?.map((client) => ({
        ...client,
        document: formatCpfCnpj(client.document),
      }));

      results = searchResult;
    } catch (err) {
      error = err;
    }

    return { results, error };
  },

  register: async (account: string) => {
    let register: Register = {} as Register,
      error: Error = {} as Error;

    try {
      const response = await fetch.get<Register>(`client/${account}/register`);

      const clientRegister = {
        ...response,
        document: formatCpfCnpj(register.document),
      };

      register = clientRegister;
    } catch (err) {
      error = err;
    }

    return { register, error };
  },
};

function formatCpfCnpj(document: string) {
  return document;
}
