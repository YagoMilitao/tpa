import React from 'react'
import { render, screen, fireEvent } from '@testing-library/react'
import Header from '../components/Header'

describe('Header', () => {
  it('renders buttons and triggers callbacks', () => {
    const onEdit = jest.fn()
    const onMore = jest.fn()

    render(<Header onEdit={onEdit} onMore={onMore} />)

    const editBtn = screen.getByRole('button', { name: /edit circles/i })
    const moreBtn = screen.getByRole('button', { name: /more circles/i })

    expect(editBtn).toBeInTheDocument()
    expect(moreBtn).toBeInTheDocument()

    fireEvent.click(editBtn)
    fireEvent.click(moreBtn)

    expect(onEdit).toHaveBeenCalledTimes(1)
    expect(onMore).toHaveBeenCalledTimes(1)
  })
})
