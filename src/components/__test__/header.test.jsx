import { it, expect, describe } from "vitest";
import { render } from '@testing-library/react';
import Header from "../header";

describe("Header Component", () => {

    it('should render Header component correctly', () => {
        const { getByText } = render (<Header />);
        expect(getByText( "Hello Techtonica!")).toBeDefined(); //expects text that is defined in header.jsx h1 element
      });
});