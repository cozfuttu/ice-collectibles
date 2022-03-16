import { Provider } from 'react-redux'
import WalletContextProvider from './context/WalletContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {

  return (
    <Provider store={store}>
      <WalletContextProvider>
        {children}
      </WalletContextProvider>
    </Provider>
  )
}

export default Providers