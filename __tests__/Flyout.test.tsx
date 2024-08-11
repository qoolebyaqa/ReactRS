import { useRouter } from "next/router";
import SelectedFlyoutEl from "../components/SelectedFlyoutEl";
import { render, screen } from '@testing-library/react';

jest.mock('next/router', () => ({
  useRouter: jest.fn(),
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

  it('should render the "Unselect All" button', () => {
    const items = [
      { name: 'bulbasaur', url: 'url1' },
      { name: 'ivysaur', url: 'url2' },
    ];

    render(<SelectedFlyoutEl allItems={items} />);

    const unselectButton = screen.getByTestId('unselectALL');
    expect(unselectButton).toBeInTheDocument();
    expect(unselectButton).toHaveTextContent('Unselect All');
  });

  it('should render the "Download" button', () => {
    const items = [
      { name: 'bulbasaur', url: 'url1' },
      { name: 'ivysaur', url: 'url2' },
    ];

    render(<SelectedFlyoutEl allItems={items} />);

    const downloadButton = screen.getByText('Download');
    expect(downloadButton).toBeInTheDocument();
  });
});