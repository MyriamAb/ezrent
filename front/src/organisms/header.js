import useUser              from '../../src/context/user.js'
import IsLoggedIn 			from '../../src/molecules/header/isLoggedIn'
import IsLoggedOut 			from '../../src/molecules/header/isLoggedOut'

export default function Navbar() {
	const userContext = useUser()

	if (userContext.token != null) {
		return <IsLoggedIn/>
	}
	else{
		return <IsLoggedOut/>
	}
}	