import React from 'react'

type Props = {
  onEdit?: () => void
  onMore?: () => void
}

export default function Header({ onEdit, onMore }: Props) {
  return (
    <header className="w-full py-3 px-4 flex items-center justify-between bg-white/6 backdrop-blur-sm sticky top-0 z-30">
      <div className="flex items-center gap-3">
        <button
          onClick={onEdit}
          className="px-3 py-1 rounded-md border border-white/10 text-sm"
        >
          Edit Circles
        </button>
        <button
          onClick={onMore}
          className="px-3 py-1 rounded-md bg-indigo-600 text-white text-sm"
        >
          More Circles
        </button>
      </div>
      <div className="text-sm text-slate-300">Mobile-first • Responsivo</div>
    </header>
  )
}
