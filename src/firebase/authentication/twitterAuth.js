import {NativeModules} from "react-native"
const {RNTwitterSignIn} = NativeModules

RNTwitterSignIn.init(
	"XINLAI7fSIgsYSPXazxIGxicT",
	"pZkyfGa7QQinlk9Do8PpdETJHwQS2dqV4AoR3e7kIc1j4m8EbI"
).then(() => console.log("Twitter SDK initialized"))
