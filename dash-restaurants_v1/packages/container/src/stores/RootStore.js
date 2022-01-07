import { createContext, useContext } from 'react';
import UserStore from './UserStore/UserStore';

const RootStore = {
	userStore: new UserStore(),
};

export const StoreContext = createContext(RootStore);
export const useStores = () => useContext(StoreContext);

export default RootStore;
