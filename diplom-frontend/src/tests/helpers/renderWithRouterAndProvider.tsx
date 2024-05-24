import { render } from '@testing-library/react'
import { ReactNode } from 'react'
import { Provider } from 'react-redux'
import { MemoryRouter } from 'react-router-dom'
import { createStore } from 'store/store'

export const renderWithRouterAndProvider = (
  component: ReactNode,
  initialRoute: string = '/'
) => {
  const store = createStore()

  return render(
    <Provider store={store}>
      <MemoryRouter initialEntries={[initialRoute]}>{component}</MemoryRouter>
    </Provider>
  )
}
