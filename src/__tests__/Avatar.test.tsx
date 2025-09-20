import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import { Avatar } from '../components/Avatar'
import type { User } from '../types'

const makeUser = (overrides: Partial<User> = {}): User => ({
  id: 'u1',
  name: 'John Doe',
  avatar: 'https://example.com/avatar.jpg',
  isOnline: true,
  ...overrides,
})

describe('Avatar', () => {
  it('renders user image with alt and src', () => {
    const user = makeUser()
    render(<Avatar user={user} />)

    const img = screen.getByAltText(user.name) as HTMLImageElement
    expect(img).toBeInTheDocument()
    expect(img.src).toContain(user.avatar)
  })

  it('does not crash when showStatus=false', () => {
    const user = makeUser({ isOnline: true })
    render(<Avatar user={user} showStatus={false} />)
    // Image should still be present
    expect(screen.getByAltText(user.name)).toBeInTheDocument()
  })

  it('calls onClick when clicked', () => {
    const user = makeUser()
    const onClick = jest.fn()
    render(<Avatar user={user} onClick={onClick} />)

    // click wrapper (role not set; use image parent)
    const img = screen.getByAltText(user.name)
    fireEvent.click(img.parentElement!)

    expect(onClick).toHaveBeenCalledTimes(1)
  })
})
