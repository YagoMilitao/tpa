import React from 'react'
import { render, screen } from '@testing-library/react'
import { NewUsersSection } from '../components/NewUsersSection'
import type { User } from '../types'

const makeUser = (id: number, overrides: Partial<User> = {}): User => ({
  id: `u${id}`,
  name: `User ${id}`,
  avatar: `https://example.com/u${id}.jpg`,
  isOnline: id % 2 === 0,
  ...overrides,
})

describe('NewUsersSection', () => {
  it('renders up to 2 user avatars and shows remaining count', () => {
    const users: User[] = [makeUser(1), makeUser(2), makeUser(3), makeUser(4)]

    render(<NewUsersSection users={users} />)

    // Two visible avatars (find by alt text of first two users)
    expect(screen.getByAltText('User 1')).toBeInTheDocument()
    expect(screen.getByAltText('User 2')).toBeInTheDocument()

    // Plus remaining count should be +2
    expect(screen.getByText('+2')).toBeInTheDocument()

    // Each visible avatar should have badge NEW
    const badges = screen.getAllByText(/new/i)
    expect(badges.length).toBe(2)
  })

  it('handles fewer than 2 users without remaining count', () => {
    const users: User[] = [makeUser(1)]

    render(<NewUsersSection users={users} />)

    expect(screen.getByAltText('User 1')).toBeInTheDocument()
    // no "+N" indicator
    expect(screen.queryByText(/^\+\d+$/)).toBeNull()
  })
})
