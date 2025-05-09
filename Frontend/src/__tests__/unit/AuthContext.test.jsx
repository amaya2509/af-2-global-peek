import { render, act, fireEvent, screen } from '@testing-library/react'
import { vi } from 'vitest'
import { AuthProvider, AuthContext } from '../../context/AuthContext'

// Mock the entire firebase/auth module at the top level
vi.mock('firebase/auth', async (importOriginal) => {
  const actual = await importOriginal()
  return {
    ...actual,
    onAuthStateChanged: vi.fn(() => () => {}), 
    signInWithEmailAndPassword: vi.fn(),
    createUserWithEmailAndPassword: vi.fn(),
    signOut: vi.fn(),
  }
})

// Mock firebase.js auth export
vi.mock('../../firebase', () => ({
  auth: {
    currentUser: null,
  }
}))

// Test component to consume the context
const TestComponent = () => {
  return (
    <AuthContext.Consumer>
      {(value) => (
        <div>
          <span data-testid="user">{value?.user?.email || 'null'}</span>
          <button 
            onClick={() => value?.login('test@test.com', 'password')} 
            data-testid="login"
          >
            Login
          </button>
          <button 
            onClick={() => value?.register('test@test.com', 'password')} 
            data-testid="register"
          >
            Register
          </button>
          <button 
            onClick={() => value?.logout()} 
            data-testid="logout"
          >
            Logout
          </button>
        </div>
      )}
    </AuthContext.Consumer>
  )
}

describe('AuthProvider', () => {
  
  let mockOnAuthStateChanged
  let mockSignInWithEmailAndPassword
  let mockCreateUserWithEmailAndPassword
  let mockSignOut

  beforeEach(async () => {
    // Import the mocked module to access the mocks
    const firebaseAuth = await import('firebase/auth')
    mockOnAuthStateChanged = firebaseAuth.onAuthStateChanged
    mockSignInWithEmailAndPassword = firebaseAuth.signInWithEmailAndPassword
    mockCreateUserWithEmailAndPassword = firebaseAuth.createUserWithEmailAndPassword
    mockSignOut = firebaseAuth.signOut

    // Reset all mocks
    vi.clearAllMocks()
    
    // Setup default mock implementations
    mockSignInWithEmailAndPassword.mockResolvedValue({ user: { email: 'test@test.com' } })
    mockCreateUserWithEmailAndPassword.mockResolvedValue({ user: { email: 'test@test.com' } })
    mockSignOut.mockResolvedValue()
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback(null)
      return () => {} 
    })
  })

  it('initializes with null user', () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    expect(screen.getByTestId('user').textContent).toBe('null')
  })

  it('handles login successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      fireEvent.click(screen.getByTestId('login'))
    })

    expect(mockSignInWithEmailAndPassword).toHaveBeenCalled()
  })

  it('handles registration successfully', async () => {
    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      fireEvent.click(screen.getByTestId('register'))
    })

    expect(mockCreateUserWithEmailAndPassword).toHaveBeenCalled()
  })

  it('handles logout successfully', async () => {
    // First set a logged in state
    mockOnAuthStateChanged.mockImplementation((auth, callback) => {
      callback({ email: 'test@test.com' })
      return () => {}
    })

    render(
      <AuthProvider>
        <TestComponent />
      </AuthProvider>
    )

    await act(async () => {
      fireEvent.click(screen.getByTestId('logout'))
    })

    expect(mockSignOut).toHaveBeenCalled()
  })

  it('subscribes to auth state changes on mount and unsubscribes on unmount', async () => {
    const unsubscribeMock = vi.fn()
    mockOnAuthStateChanged.mockImplementation(() => unsubscribeMock)

    const { unmount } = render(
      <AuthProvider>
        <div>Test</div>
      </AuthProvider>
    )

    expect(mockOnAuthStateChanged).toHaveBeenCalledTimes(1)
    
    unmount()
    expect(unsubscribeMock).toHaveBeenCalledTimes(1)
  })

  it('shows nothing while loading', () => {
    // Don't call the callback immediately to simulate loading
    mockOnAuthStateChanged.mockImplementation(() => vi.fn())

    const { container } = render(
      <AuthProvider>
        <div>Should not render</div>
      </AuthProvider>
    )

    expect(container.firstChild).toBeNull()
  })
})