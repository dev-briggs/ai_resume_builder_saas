import React from "react";
import { render } from "@testing-library/react";
import {
  AppRouterContext,
  AppRouterInstance,
} from "next/dist/shared/lib/app-router-context.shared-runtime";
import { ClerkProvider, useAuth } from "@clerk/nextjs";
import { ThemeProvider } from "@/components/theme-provider";

/**
 * Mocking methods which are not implemented in JSDOM
 * https://jestjs.io/docs/manual-mocks#mocking-methods-which-are-not-implemented-in-jsdom
 */
Object.defineProperty(window, "matchMedia", {
  writable: true,
  value: jest.fn().mockImplementation((query) => ({
    matches: false,
    media: query,
    onchange: null,
    addListener: jest.fn(), // deprecated
    removeListener: jest.fn(), // deprecated
    addEventListener: jest.fn(),
    removeEventListener: jest.fn(),
    dispatchEvent: jest.fn(),
  })),
});

/**
 * https://clerk.com/blog/testing-clerk-nextjs#set-up-your-mocks-and-helpers
 */
jest.mock("@clerk/nextjs", () => {
  const originalModule = jest.requireActual("@clerk/nextjs");
  return {
    ...originalModule,
    useAuth: jest.fn(() => ({ userId: null })),
    SignIn: () => <div data-testid="clerk-sign-in">Sign In Component</div>,
    ClerkProvider: ({ children }: { children: React.ReactNode }) => (
      <div>{children}</div>
    ),
  };
});

type RenderOptions = {
  isLoggedIn?: boolean;
};

function Wrapper({
  children,
  options = {},
}: {
  children: React.ReactNode;
  options?: RenderOptions;
}) {
  const { isLoggedIn = false } = options;
  (useAuth as jest.Mock).mockReturnValue({
    userId: isLoggedIn ? "user-id" : null,
  });

  return (
    <AppRouterContext.Provider value={{} as AppRouterInstance}>
      <React.StrictMode>
        <ClerkProvider>
          <ThemeProvider
            attribute="class"
            defaultTheme="system"
            enableSystem
            disableTransitionOnChange
          >
            {children}
          </ThemeProvider>
        </ClerkProvider>
      </React.StrictMode>
    </AppRouterContext.Provider>
  );
}

function renderWithProviders(ui: React.ReactElement, options?: RenderOptions) {
  return render(ui, {
    wrapper: Wrapper,
    ...options,
  });
}

export * from "@testing-library/react";
export { renderWithProviders };