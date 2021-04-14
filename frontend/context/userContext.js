import { createContext, useState } from 'react';

export const UserContext = createContext();

export const UserProvider = ({ children }) => {
	const [userInfo, setUserInfo] = useState(null);
	const handleUserInfo = (userInfo) => {
		setUserInfo(userInfo);
		window.localStorage.setItem('userInfo', JSON.stringify(userInfo))
	};
	const contextProps = {
		userInfo,
		setUserInfo,
		handleUserInfo,
	};
	return (
		<UserContext.Provider value={contextProps}>{children}</UserContext.Provider>
	);
};
