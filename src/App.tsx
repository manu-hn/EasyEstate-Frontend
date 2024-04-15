import { Provider } from "react-redux";
import { PersistGate } from "redux-persist/integration/react";
import userStore, { persistor } from "@/redux/store.tsx";
import Body from '@/components/body';

const App = () => {
  return (
    <Provider store={userStore}>
      <PersistGate persistor={persistor} loading={null}>

        <Body />
      </PersistGate>
    </Provider>
  )
}

export default App