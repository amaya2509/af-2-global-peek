import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter, Routes, Route } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify'
import CountryCard from '../../components/CountryCard'
import { useFavorites } from '../../context/FavoriteContext'
import { getAuth } from 'firebase/auth'

// Mock the modules
vi.mock('firebase/auth')
vi.mock('../../context/FavoriteContext')
vi.mock('react-toastify', async () => {
  const actual = await vi.importActual('react-toastify')
  return {
    ...actual,
    toast: {
      info: vi.fn()
    }
  }
})

const mockNavigate = vi.fn()
vi.mock('react-router-dom', async () => {
  const actual = await vi.importActual('react-router-dom')
  return {
    ...actual,
    useNavigate: () => mockNavigate,
  }
})

const mockCountry = {
  cca3: 'CAN',
  name: { common: 'Canada' },
  flags: { svg: 'https://flagcdn.com/ca.svg', png: 'https://flagcdn.com/w320/ca.png' },
  capital: ['Ottawa'],
  region: 'Americas'
}

describe('CountryCard', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: vi.fn()
    })
  })

  it('renders country information correctly', () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )
  
    // Check country name
    expect(screen.getByText('Canada')).toBeInTheDocument()
    
    // Check capital
    const capitalDiv = screen.getByText('Capital:').closest('div')
    expect(capitalDiv).toHaveTextContent('Ottawa')
    
    // Check region
    const regionDiv = screen.getByText('Region:').closest('div')
    expect(regionDiv).toHaveTextContent('Americas')
    
    // Check flag image
    expect(screen.getByAltText('Canada flag')).toHaveAttribute('src', mockCountry.flags.svg)
  })

  it('renders with favorite button', () => {
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )

    expect(screen.getByRole('button')).toBeInTheDocument()
    expect(screen.getByRole('button').textContent).toBe('🤍')
  })

  it('shows filled heart when country is favorite', () => {
    useFavorites.mockReturnValue({
      favorites: ['CAN'],
      toggleFavorite: vi.fn()
    })

    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )

    expect(screen.getByRole('button').textContent).toBe('❤️')
  })

  it('calls toggleFavorite when favorite button is clicked and user is logged in', () => {
    const mockToggleFavorite = vi.fn()
    useFavorites.mockReturnValue({
      favorites: [],
      toggleFavorite: mockToggleFavorite
    })
    getAuth.mockReturnValue({ currentUser: { uid: '123' } })

    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button'))
    expect(mockToggleFavorite).toHaveBeenCalledWith(mockCountry)
  })

  it('shows toast and navigates to login when favorite button clicked without user', async () => {
    getAuth.mockReturnValue({ currentUser: null })

    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
        <ToastContainer />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('button'))
    
    await waitFor(() => {
      expect(toast.info).toHaveBeenCalledWith('🔒 Login to add favorites', {
        theme: 'dark',
        onClick: expect.any(Function),
        style: { cursor: 'pointer' },
      })
    })
  })

  it('navigates to country details when card is clicked', () => {
    // Mock window.location.href
    delete window.location
    window.location = { href: '' }
    
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} />
      </MemoryRouter>
    )
  
    const link = screen.getByRole('link')
    fireEvent.click(link)
    
    // Verify the href was set correctly
    expect(link).toHaveAttribute('href', '/country/CAN')
  })

  it('calls onClick prop when provided', () => {
    const mockOnClick = vi.fn()
    render(
      <MemoryRouter>
        <CountryCard country={mockCountry} onClick={mockOnClick} />
      </MemoryRouter>
    )

    fireEvent.click(screen.getByRole('link'))
    expect(mockOnClick).toHaveBeenCalledWith(mockCountry)
  })
})