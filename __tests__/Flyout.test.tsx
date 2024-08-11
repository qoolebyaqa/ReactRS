import SelectedFlyoutEl from "../components/SelectedFlyoutEl";
import { fireEvent, render, screen, waitFor } from '@testing-library/react';
import { usePathname, useRouter, useSearchParams } from "next/navigation";

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
}));
jest.mock('next/navigation', () => ({
  useRouter: jest.fn(),
  usePathname: jest.fn(),
  useSearchParams: jest.fn(),
}));
const mockUseRouter = useRouter as jest.Mock;

describe('SelectedFlyoutEl', () => {
  beforeAll(() => {
    global.URL.createObjectURL = jest.fn(() => 'mocked-url');
    global.URL.revokeObjectURL = jest.fn();
  });

  afterAll(() => {
    (global.URL.createObjectURL as jest.Mock).mockRestore();
    (global.URL.revokeObjectURL as jest.Mock).mockRestore();
  });

  beforeEach(() => {
    mockUseRouter.mockReturnValue({
      query: {
        checked: JSON.stringify(['bulbasaur']),
        theme: 'light', 
      },
      pathname: '/some-path',
      push: jest.fn(),
    });
  });

  const mockRouter = { push: jest.fn(), refresh: jest.fn() };

  beforeEach(() => {
    (useRouter as jest.Mock).mockReturnValue(mockRouter);
    (usePathname as jest.Mock).mockReturnValue('/current-path');
    (useSearchParams as jest.Mock).mockReturnValue(new URLSearchParams('checked=["bulbasaur"]'));
  });

  it('renders the component with correct data', async () => {
    const items = [
      { name: 'bulbasaur', url: 'url1' },
      { name: 'ivysaur', url: 'url2' }
    ];

    render(<SelectedFlyoutEl allItems={items} searchParams={{ theme: 'dark' }} />);

    await waitFor(() => {
      expect(screen.getByText('1 items are selected')).toBeInTheDocument();
    });

    const downloadButton = screen.getByText('Download');
    expect(downloadButton).toBeInTheDocument();

    const unselectButton = screen.getByText('Unselect All');
    expect(unselectButton).toBeInTheDocument();
  });

  it('handles unselect all button click', () => {
    const items = [{ name: 'bulbasaur', url: 'url1' }];
    render(<SelectedFlyoutEl allItems={items} searchParams={{ theme: 'dark' }} />);

    fireEvent.click(screen.getByText('Unselect All'));
    expect(mockRouter.push).toHaveBeenCalledWith('/current-path/?');
    expect(mockRouter.refresh).toHaveBeenCalled();
  });
});