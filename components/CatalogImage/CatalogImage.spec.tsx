import { render, screen, fireEvent } from "@testing-library/react-native";
import { CATALOG_IMAGE_TEST_ID, CatalogImage, imageErrorText } from "./CatalogImage";


describe("components/CatalogImage/CatalogImage.tsx", () => {
    it("should initially show loading spinner ", () => {
        render(<CatalogImage src="" />);
        expect(screen.getByTestId(CATALOG_IMAGE_TEST_ID.loadingSpinner)).toBeOnTheScreen();
    });

    it("should show image without spinner or error when loaded", () => {
        render(<CatalogImage src="" />);
        const image = screen.getByTestId(CATALOG_IMAGE_TEST_ID.image);

        fireEvent(image, "loadEnd");

        expect(image).toBeOnTheScreen();
        expect(screen.queryByTestId(CATALOG_IMAGE_TEST_ID.loadingSpinner)).toBeNull();
    });

    it("should show error view on error", () => {
        render(<CatalogImage src="" />);
        const image = screen.getByTestId(CATALOG_IMAGE_TEST_ID.image);

        fireEvent(image, "error");

        expect(screen.queryByTestId(CATALOG_IMAGE_TEST_ID.loadingSpinner)).toBeNull();
        expect(screen.queryByTestId(CATALOG_IMAGE_TEST_ID.image)).toBeNull();
        expect(screen.queryByText(imageErrorText)).toBeOnTheScreen();
    });
});
