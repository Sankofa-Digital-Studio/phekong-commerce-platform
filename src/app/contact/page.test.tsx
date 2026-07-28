import { fireEvent, render, screen } from '@testing-library/react';
import { beforeEach, describe, expect, it, vi } from 'vitest';

import ContactPage from './page';

const getMock = vi.fn();

vi.mock('next/navigation', () => ({
  useSearchParams: () => ({
    get: getMock,
  }),
}));

vi.mock('../../components/shell/ApplicationShell', () => ({
  ApplicationShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../components/routes/Breadcrumbs', () => ({
  Breadcrumbs: () => <nav aria-label="Breadcrumb">Home / Contact</nav>,
}));

describe('ContactPage', () => {
  beforeEach(() => {
    getMock.mockReset();
    getMock.mockReturnValue('');
  });

  it('shows required-field feedback for an empty submission', () => {
    render(<ContactPage />);

    fireEvent.click(screen.getByRole('button', { name: /submit form/i }));

    expect(screen.getByText('Full name is required.')).toBeInTheDocument();
    expect(screen.getByText('Email address is required.')).toBeInTheDocument();
    expect(screen.getByText('Message is required.')).toBeInTheDocument();
  });

  it('reveals wholesale-specific fields when wholesale is selected', () => {
    render(<ContactPage />);

    fireEvent.change(screen.getByLabelText(/inquiry type/i), {
      target: { value: 'wholesale' },
    });

    expect(screen.getByLabelText(/company \/ business name/i)).toBeInTheDocument();
    expect(screen.getByLabelText(/estimated monthly volume/i)).toBeInTheDocument();
  });

  it('shows the product context supplied through the URL', () => {
    getMock.mockImplementation((key: string) => {
      if (key === 'productName') return 'Restorative Body Oil';
      if (key === 'productId') return 'restorative-body-oil';
      return '';
    });

    render(<ContactPage />);

    expect(
      screen.getByText(/inquiry about product:/i),
    ).toHaveTextContent('Restorative Body Oil');
  });
});
