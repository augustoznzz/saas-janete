import { render, screen } from '@testing-library/react';
import '@testing-library/jest-dom';
import Button from '@/components/Button';

describe('Button', () => {
  it('renders button with text', () => {
    render(<Button>Test Button</Button>);
    expect(screen.getByRole('button', { name: 'Test Button' })).toBeInTheDocument();
  });

  it('renders solid variant by default', () => {
    render(<Button>Solid Button</Button>);
    const button = screen.getByRole('button');
    expect(button).toHaveClass('bg-black');
  });

  it('renders ghost variant when requested', () => {
    render(
      <Button variant="ghost">Ghost Button</Button>
    );
    const button = screen.getByRole('button');
    expect(button).toHaveClass('border');
  });

  it('renders disabled state', () => {
    render(
      <Button disabled>
        Disabled Button
      </Button>
    );
    const button = screen.getByRole('button');
    expect(button).toBeDisabled();
  });
});
