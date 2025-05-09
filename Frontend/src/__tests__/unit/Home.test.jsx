import { render, screen, fireEvent, waitFor } from '@testing-library/react'
import { vi } from 'vitest'
import { MemoryRouter } from 'react-router-dom'
import Home from '../../pages/Home'
import * as countriesApi from '../../services/countriesApi'

// Mock the API functions
vi.mock('../../services/countriesApi', () => ({
  getAllCountries: vi.fn(),
  getCountriesByRegion: vi.fn(),
  getCountryByName: vi.fn()
}))

// Mock the CountryCard component to avoid router issues
vi.mock('../../components/CountryCard', () => ({
  __esModule: true,
  default: ({ country }) => (
    <div data-testid="country-card">
      <div data-testid="country-name">{country.name.common}</div>
    </div>
  )
}))

// Mock the Hero component
vi.mock('../../components/Hero', () => ({
  __esModule: true,
  default: ({ onSearch, onFilter }) => (
    <div data-testid="hero-mock">
      <input 
        data-testid="search-input"
        placeholder="Search for a country..."
        onChange={(e) => onSearch(e.target.value)}
      />
      <select 
        data-testid="region-filter"
        onChange={(e) => onFilter(e.target.value)}
      >
        <option value="">All Regions</option>
        <option value="Americas">Americas</option>
      </select>
    </div>
  )
}))

const mockCountries = [
  { cca3: 'USA', name: { common: 'United States' }, flags: { png: 'us-flag.png' }, capital: ['Washington D.C.'], region: 'Americas' },
  { cca3: 'CAN', name: { common: 'Canada' }, flags: { png: 'ca-flag.png' }, capital: ['Ottawa'], region: 'Americas' },
  { cca3: 'MEX', name: { common: 'Mexico' }, flags: { png: 'mx-flag.png' }, capital: ['Mexico City'], region: 'Americas' },
]

describe('Home Page', () => {
  beforeEach(() => {
    vi.clearAllMocks()
    countriesApi.getAllCountries.mockResolvedValue(mockCountries)
  })

  const renderHome = () => {
    return render(
      <MemoryRouter>
        <Home />
      </MemoryRouter>
    )
  }

  it('renders the home page and fetches countries on mount', async () => {
    renderHome()
    
    await waitFor(() => {
      expect(countriesApi.getAllCountries).toHaveBeenCalledTimes(1)
    })
    
    expect(screen.getByTestId('hero-mock')).toBeInTheDocument()
    expect(screen.getAllByTestId('country-card')).toHaveLength(3)
  })

  it('searches for countries when search term changes', async () => {
    countriesApi.getCountryByName.mockResolvedValue([mockCountries[0]])
    renderHome()
    
    const searchInput = screen.getByTestId('search-input')
    fireEvent.change(searchInput, { target: { value: 'United' } })
    
    await waitFor(() => {
      expect(countriesApi.getCountryByName).toHaveBeenCalledWith('United')
      expect(screen.getAllByTestId('country-card')).toHaveLength(1)
      expect(screen.getByText('United States')).toBeInTheDocument()
    })
  })

  it('filters countries by region when region is selected', async () => {
    countriesApi.getCountriesByRegion.mockResolvedValue([mockCountries[0], mockCountries[1]])
    renderHome()
    
    const regionFilter = screen.getByTestId('region-filter')
    fireEvent.change(regionFilter, { target: { value: 'Americas' } })
    
    await waitFor(() => {
      expect(countriesApi.getCountriesByRegion).toHaveBeenCalledWith('Americas')
      expect(screen.getAllByTestId('country-card')).toHaveLength(2)
    })
  })

  it('shows more countries when "View More" button is clicked', async () => {
    const manyCountries = Array.from({ length: 50 }, (_, i) => ({
      cca3: `C${i}`,
      name: { common: `Country ${i}` },
      flags: { png: `flag-${i}.png` },
      capital: ['Capital'],
      region: 'Region'
    }))
    
    countriesApi.getAllCountries.mockResolvedValue(manyCountries)
    renderHome()
    
    await waitFor(() => {
      expect(screen.getAllByTestId('country-card')).toHaveLength(20)
      expect(screen.getByText('View More')).toBeInTheDocument()
    })
    
    fireEvent.click(screen.getByText('View More'))
    
    await waitFor(() => {
      expect(screen.getAllByTestId('country-card')).toHaveLength(40)
    })
  })

  it('handles API errors gracefully', async () => {
    countriesApi.getAllCountries.mockRejectedValue(new Error('API Error'))
    renderHome()
    
    await waitFor(() => {
      expect(screen.getByText('Error loading countries')).toBeInTheDocument()
    })
  })
})