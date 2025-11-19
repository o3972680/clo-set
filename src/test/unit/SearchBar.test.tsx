import { describe, test, expect, vi } from 'vitest';
import { render, screen, fireEvent } from '@testing-library/react';
import Search from '@/components/SearchBar/SearchBar';

vi.mock('@ant-design/icons', () => ({
  LoadingOutlined: vi.fn(() => <span data-testid="loading-icon" />),
  SearchOutlined: vi.fn(() => <span data-testid="search-icon" />),
}));

describe('SearchBar Component', () => {
  test('should render basic structure correctly', () => {
    render(<Search value="" onChange={vi.fn()} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toBeInTheDocument();
    
    expect(screen.getByTestId('search-icon')).toBeInTheDocument();
  });

  test('should display correct value', () => {
    const testValue = 'test query';
    render(<Search value={testValue} onChange={vi.fn()} />);
    
    const input = screen.getByRole('textbox');
    expect(input).toHaveValue(testValue);
  });

  test('should trigger onChange when input value changes', () => {
    const onChange = vi.fn();
    render(<Search value="" onChange={onChange} />);
    
    const input = screen.getByRole('textbox');
    const testValue = 'new search term';
    
    fireEvent.change(input, { target: { value: testValue } });
    
    expect(onChange).toHaveBeenCalledTimes(1);
    expect(onChange).toHaveBeenCalledWith(expect.any(Object));
    expect(onChange.mock.calls[0][0].target.value).toBe(testValue);
  });

  test('should have large size', () => {
    render(<Search value="" onChange={vi.fn()} />);
    expect(screen.getByRole('textbox')).toHaveClass('ant-input-lg');
  });
});