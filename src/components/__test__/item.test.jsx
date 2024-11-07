import { it, expect, describe } from "vitest";
import { render } from '@testing-library/react';
import Item from "../item";

describe("Item Component", () => {

    it('should render items in the list correctly', () => {
        const itemData = { text: 'test' }; //test element
        const { getByText } = render (< Item item={itemData} />); //rendering with test item text passed
        expect(getByText("test")).toBeDefined();
    });
});

