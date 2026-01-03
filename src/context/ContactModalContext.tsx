"use client";

import { createContext, useContext, useState } from "react";

type FormType = "beta" | "partner" | "invest";

type ContactModalContextType = {
  open: boolean;
  formType: FormType;
  openForm: (type?: FormType) => void;
  closeForm: () => void;
};

const ContactModalContext = createContext<ContactModalContextType | null>(null);

export function ContactModalProvider({ children }: { children: React.ReactNode }) {
  const [open, setOpen] = useState(false);
  const [formType, setFormType] = useState<FormType>("beta");

  const openForm = (type: FormType = "beta") => {
    setFormType(type);
    setOpen(true);
  };

  const closeForm = () => setOpen(false);

  return (
    <ContactModalContext.Provider
      value={{ open, formType, openForm, closeForm }}
    >
      {children}
    </ContactModalContext.Provider>
  );
}

export function useContactModal() {
  const ctx = useContext(ContactModalContext);
  if (!ctx) throw new Error("useContactModal must be used inside Provider");
  return ctx;
}
