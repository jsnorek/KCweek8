import { test, expect, vi } from "vitest";
import { render, fireEvent } from '@testing-library/react';
import Header from "./components/header";
import Item from "./components/item";
import Form from "./components/form";


//alt test
// describe('Header', () => {
//     it('renders the Header component', () => {
//         render(<Header />)

//         screen.debug();
//     })
// })

test('renders Header component correctly', () => {
    const { getByText } = render (<Header />);
    expect(getByText( "Hello Techtonica!")).toBeDefined(); //expects text that is defined in header.jsx h1 element
  });

test('items in the list render correctly', () => {
    const itemData = { text: 'test' }; //test element
    const { getByText } = render (< Item item={itemData} />); //rendering with test item text passed
    expect(getByText("test")).toBeDefined();
});

test('Form component renders correctly', () => {
    const { getByPlaceholderText, getByText } = render(<Form />); 

    //check if the input field is rendered
    expect(getByPlaceholderText('Enter an item')).toBeDefined();

    //check if the submit button is rendered
    expect(getByText('Submit')).toBeDefined();
});

test('Form submits our mock data correctly', () => {
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

test('Form does not submit with empty mock data', () => {
    const mockAddItem = vi.fn(); //mock function for addItem using Vitest
    const { getByText } = render(<Form addItem={mockAddItem} />);

    const submitButton = getByText('Submit');

    //simulate form submission without user entering mock data
    fireEvent.click(submitButton);

    //check if the mockAddItem function was not called
    expect(mockAddItem).not.toHaveBeenCalled();
});