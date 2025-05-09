import { render, waitFor } from '@testing-library/react';
import { describe, it, expect, vi, beforeEach } from 'vitest';
import { FavoriteProvider, useFavorites } from '../../context/FavoriteContext';
import { AuthContext } from '../../context/AuthContext';
import React from 'react';

vi.mock('firebase/firestore', async () => {
  const actual = await vi.importActual('firebase/firestore');
  return {
    ...actual,
    doc: vi.fn(),
    getDoc: vi.fn(),
    setDoc: vi.fn(),
    updateDoc: vi.fn(),
    arrayUnion: vi.fn(),
    arrayRemove: vi.fn(),
  };
});

import { doc, getDoc, setDoc, updateDoc } from 'firebase/firestore';

const mockUser = { uid: 'test-user' };

// Mock consumer component
const TestComponent = () => {
  const { favorites, favoritesLoaded } = useFavorites();
  return (
    <div>
      <div data-testid="favorites">{JSON.stringify(favorites)}</div>
      <div data-testid="loaded">{favoritesLoaded ? 'yes' : 'no'}</div>
    </div>
  );
};

describe('FavoriteContext', () => {
  beforeEach(() => {
    vi.clearAllMocks();
  });

  it('loads favorites for a logged-in user', async () => {
    getDoc.mockResolvedValue({
      exists: () => true,
      data: () => ({ codes: ['USA', 'CAN'] }),
    });

    const { getByTestId } = render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <FavoriteProvider>
          <TestComponent />
        </FavoriteProvider>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(getByTestId('favorites').textContent).toContain('USA');
      expect(getByTestId('loaded').textContent).toBe('yes');
    });
  });

  it('initializes an empty favorites list if no document exists', async () => {
    getDoc.mockResolvedValue({ exists: () => false });
    setDoc.mockResolvedValue();

    const { getByTestId } = render(
      <AuthContext.Provider value={{ user: mockUser }}>
        <FavoriteProvider>
          <TestComponent />
        </FavoriteProvider>
      </AuthContext.Provider>
    );

    await waitFor(() => {
      expect(getByTestId('favorites').textContent).toBe('[]');
      expect(getByTestId('loaded').textContent).toBe('yes');
    });
  });
});
