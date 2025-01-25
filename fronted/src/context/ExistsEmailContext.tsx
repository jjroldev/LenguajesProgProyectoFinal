import { createContext, useContext, useState } from "react";

const EmailContext = createContext({ emailExists: false, setEmailExists: (value: boolean) => {} });

export const EmailProvider = ({ children }: { children: React.ReactNode }) => {
  const [emailExists, setEmailExists] = useState(false);
  return (
    <EmailContext.Provider value={{ emailExists, setEmailExists }}>
      {children}
    </EmailContext.Provider>
  );
};

export const useEmail = () => useContext(EmailContext);
