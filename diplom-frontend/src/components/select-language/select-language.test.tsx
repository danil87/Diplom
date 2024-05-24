import { render, screen } from '@testing-library/react'

import { SelectLanguage } from './select-language'

describe('Select language test', () => {
  it('Render', () => {
    render(<SelectLanguage />)

    expect(screen.getByText(/ru/)).toBeInTheDocument()
  })
})
