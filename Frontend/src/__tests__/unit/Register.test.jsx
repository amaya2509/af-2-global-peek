import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Register from '../../pages/Register'
import { createUserWithEmailAndPassword, updateProfile } from 'firebase/auth'
import { auth } from '../../firebase'

// Mock Firebase auth functions
vi.mock('firebase/auth', () => ({
  createUserWithEmailAndPassword: vi.fn(),
  updateProfile: vi.fn(),
}))

// Mock firebase.js auth export
vi.mock('../../firebase', () => ({
  auth: {
    currentUser: null,
  }
}))

// Mock useNavigate
const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const renderRegister = () => {
  return render(
    <MemoryRouter>
      <Register />
    </MemoryRouter>
  )
}

describe('Register component', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    createUserWithEmailAndPassword.mockResolvedValue({ user: { uid: '123' } })
  })

  it('renders all input fields and the button', () => {
    renderRegister()
    
    expect(screen.getByPlaceholderText('Name')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Email')).toBeInTheDocument()
    expect(screen.getByPlaceholderText('Password')).toBeInTheDocument()
    expect(screen.getByRole('button', { name: 'Register' })).toBeInTheDocument()
  })

  it('shows error on Firebase failure', async () => {
    createUserWithEmailAndPassword.mockRejectedValue(new Error('Registration failed'))
    
    renderRegister()
    
    fireEvent.change(screen.getByPlaceholderText('Name'), { target: { value: 'Jane' } })
    fireEvent.change(screen.getByPlaceholderText('Email'), { target: { value: 'jane@example.com' } })
    fireEvent.change(screen.getByPlaceholderText('Password'), { target: { value: 'securePass123' } })
    fireEvent.click(screen.getByRole('button', { name: 'Register' }))
    
    await waitFor(() => {
      expect(screen.getByText(/registration failed/i)).toBeInTheDocument()
    })
  })

})