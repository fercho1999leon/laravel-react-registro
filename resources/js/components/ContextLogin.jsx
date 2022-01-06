import React from "react";
const ContextLogin = React.createContext();
export const ProviderLogin = ContextLogin.Provider;
export const ConsumerLogin = ContextLogin.Consumer;
export default ContextLogin;