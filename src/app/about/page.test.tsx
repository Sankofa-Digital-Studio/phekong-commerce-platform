import { render, screen } from '@testing-library/react';
import { describe, expect, it, vi } from 'vitest';

import AboutPage from './page';

vi.mock('../../components/shell/ApplicationShell', () => ({
  ApplicationShell: ({ children }: { children: React.ReactNode }) => <>{children}</>,
}));

vi.mock('../../components/routes/Breadcrumbs', () => ({
  Breadcrumbs: () => <nav aria-label="Breadcrumb">Home / About</nav>,
}));

describe('AboutPage', () => {
  it('renders the main About page heading and core sections', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { level: 1, name: /about phekong/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /why choose us/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /our products & services/i })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: /our values/i })).toBeInTheDocument();
  });

  it('renders the three value cards', () => {
    render(<AboutPage />);

    expect(screen.getByRole('heading', { name: 'Quality' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Integrity' })).toBeInTheDocument();
    expect(screen.getByRole('heading', { name: 'Community' })).toBeInTheDocument();
  });

  it('renders both call-to-action controls', () => {
    render(<AboutPage />);

    expect(screen.getByRole('button', { name: /shop now/i })).toBeInTheDocument();
    expect(screen.getByRole('button', { name: /book massage/i })).toBeInTheDocument();
  });
});
