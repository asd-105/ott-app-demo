import { render } from "@testing-library/react-native";

import { ErrorCard } from "./ErrorCard";

describe("components/ErrorCard/ErrorCard.tsx", () => {
    it("should match snapshot", () => {
        const { toJSON } = render(<ErrorCard  />);
        expect(toJSON()).toMatchSnapshot();
    });
});
