export type RecipientSent = {
  email: string;
  date: Date;
};

export type Recipients = { send: string[]; skip: string[] };

export type SentEmails = RecipientSent[];
