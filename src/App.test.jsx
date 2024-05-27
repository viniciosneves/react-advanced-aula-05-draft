import { render, screen } from '@testing-library/react'
import App from './App'
import userEvent from '@testing-library/user-event'

describe('App', () => {
  it('renders the App component', () => {
    render(<App />)
    expect(screen.getByText('Cadastro')).toBeInTheDocument();
  })

  it('simulates invalid form submission', async () => {
    render(<App />);

    const nameInput = screen.getByLabelText('Nome');
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.click(submitButton);

    expect(screen.queryByText('Por favor, informe o seu email')).toBeInTheDocument();
  });

  it('validates email field format', async () => {
    render(<App />);

    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('E-mail');
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'invalid-email');
    await userEvent.click(submitButton);

    expect(screen.getByText('Por favor, informe um e-mail válido')).toBeInTheDocument();
  });

  it('validates password confirmation', async () => {
    render(<App />);

    const nameInput = screen.getByLabelText('Nome');
    const emailInput = screen.getByLabelText('E-mail');
    const passwordInput = screen.getByLabelText('Senha');
    const confirmPasswordInput = screen.getByLabelText('Confirme sua senha');
    const submitButton = screen.getByRole('button', { name: /enviar/i });

    await userEvent.type(nameInput, 'John Doe');
    await userEvent.type(emailInput, 'john.doe@example.com');
    await userEvent.type(passwordInput, 'password123');
    await userEvent.type(confirmPasswordInput, 'differentPassword');
    await userEvent.click(submitButton);

    expect(screen.getByText('As senhas devem ser iguais!')).toBeInTheDocument();
  });

})