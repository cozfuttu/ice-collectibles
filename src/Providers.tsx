import { Provider } from 'react-redux'
import WalletContextProvider from './context/WalletContext'
import store from 'state'

const Providers: React.FC = ({ children }) => {

  return (
    <WalletContextProvider>
      <Provider store={store}>
        {children}
      </Provider>
    </WalletContextProvider>
  )
}

export default Providers