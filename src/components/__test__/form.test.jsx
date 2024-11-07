import { it, expect, describe, vi } from "vitest";
import { render, fireEvent } from '@testing-library/react';
import Form from "../form";

describe("Form Component", () => {

    it('should render form component correctly', () => {
        const { getByPlaceholderText, getByText } = render(<Form />); 
    
        //check if the input field is rendered
        expect(getByPlaceholderText('Enter an item')).toBeDefined();
    
        //check if the submit button is rendered
        expect(getByText('Submit')).toBeDefined();
    });
    
    it('should test for form submiting our mock data correctly', () => {
        const mockAddItem = vi.fn(); //mock function for addItem using Vitest - This mock function will replace the real addItem function in the Form component, allowing us to track when it’s called and with what arguments
        const mockInputValue = 'Mock Item'; //mock input value from a user
        const { getByPlaceholderText, getByText } = render(<Form addItem={mockAddItem} />);
    
        const inputField = getByPlaceholderText('Enter an item');
        const submitButton = getByText('Submit');
    
        //simulate user entering mock data into the input field
        fireEvent.change(inputField, { target: { value: mockInputValue } });
    
        //simulate form submission
        fireEvent.click(submitButton);
    
        //check if the mockAddItem function was called with the mock data
        expect(mockAddItem).toHaveBeenCalledWith(mockInputValue);
    
    });
    
    it('should test that form does not submit with empty mock data', () => {
        const mockAddItem = vi.fn(); //mock function for addItem using Vitest
        const { getByText } = render(<Form addItem={mockAddItem} />);
    
        const submitButton = getByText('Submit');
    
        //simulate form submission without user entering mock data
        fireEvent.click(submitButton);
    
        //check if the mockAddItem function was not called
        expect(mockAddItem).not.toHaveBeenCalled();
});

});