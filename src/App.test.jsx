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
})