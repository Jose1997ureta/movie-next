import React from "react";
import { AuthProvider } from "./_shared/contexts/auth.context";

export const AppRoot = ({ children }: { children: React.ReactNode }) => {
	return <AuthProvider>{children}</AuthProvider>;
};
