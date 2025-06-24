import { fireEvent, screen } from "@testing-library/react";
import "@testing-library/jest-dom";
import { renderWithProviders } from "../../test";
import Home from "./page";

// Mock Next.js router
const mockPush = jest.fn();
jest.mock("next/router", () => ({
  useRouter() {
    return {
      route: "/",
      pathname: "",
      query: "",
      asPath: "",
      push: mockPush,
      events: {
        on: jest.fn(),
        off: jest.fn(),
      },
      beforePopState: jest.fn(() => null),
      prefetch: jest.fn(() => null),
    };
  },
}));

describe("Home component", () => {
  beforeEach(() => {
    // Clear any previous mocks
    jest.clearAllMocks();
  });

  describe("rendering", () => {
    it("renders the main container with correct styles and attributes", () => {
      renderWithProviders(<Home />);
      const mainContainer = screen.getByTestId("home-main-container");
      expect(mainContainer).toBeInTheDocument();
      expect(mainContainer).toHaveClass(
        "flex min-h-screen flex-col items-center justify-center gap-6 bg-gray-100 px-5 py-12 text-center text-gray-900",
      );
    });

    it("renders the logo image with correct attributes", () => {
      renderWithProviders(<Home />);
      const logoImage = screen.getByTestId("home-logo-image");
      expect(logoImage).toBeInTheDocument();
      expect(logoImage).toHaveAttribute("alt", "Logo");
      expect(logoImage).toHaveAttribute("width", "150");
      expect(logoImage).toHaveAttribute("height", "150");
    });

    it("renders the main heading with highlighted text", () => {
      renderWithProviders(<Home />);
      const mainHeading = screen.getByTestId("home-main-heading");
      const highlightedText = screen.getByTestId("home-highlighted-text");

      expect(mainHeading).toBeInTheDocument();
      expect(mainHeading).toHaveTextContent(
        "Create the Perfect Resume in minutes",
      );
      expect(highlightedText).toBeInTheDocument();
      expect(highlightedText).toHaveTextContent("Perfect Resume");
    });

    it("renders the description paragraph with correct text", () => {
      renderWithProviders(<Home />);
      const descriptionParagraph = screen.getByTestId(
        "home-description-paragraph",
      );
      expect(descriptionParagraph).toBeInTheDocument();
      expect(descriptionParagraph).toHaveTextContent(
        "Our AI resume builder helps you design a professional resume, even if you're not very smart.",
      );
    });

    it("renders the 'Get started' button with correct attributes", () => {
      renderWithProviders(<Home />);
      const getStartedLink = screen.getByTestId("home-get-started-link");

      expect(getStartedLink).toBeInTheDocument();
      expect(getStartedLink).toHaveAttribute("href", "/resumes");
      expect(getStartedLink).toHaveTextContent("Get started");
    });

    it("renders the resume preview container", () => {
      renderWithProviders(<Home />);
      const resumePreviewContainer = screen.getByTestId(
        "home-resume-preview-container",
      );
      expect(resumePreviewContainer).toBeInTheDocument();
    });

    it("'Get started' link is rendered with the correct attributes", () => {
      renderWithProviders(<Home />);
      const getStartedLink = screen.getByTestId("home-get-started-link");

      expect(getStartedLink).toHaveAttribute("href", "/resumes");
    });
  });

  describe("user interactions", () => {
    // it("highlights the 'Perfect Resume' text on hover", () => {
    //   renderWithProviders(<Home />);
    //   const highlightedText = screen.getByTestId("home-highlighted-text");

    //   fireEvent.mouseOver(highlightedText);

    //   // Assuming hover changes the text color or style
    //   expect(highlightedText).toHaveClass(
    //     "bg-gradient-to-r from-green-600 to-green-400",
    //   );
    // });
  });
});
