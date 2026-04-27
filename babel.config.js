module.exports = {
	//presets: ['module:metro-react-native-babel-preset', '@babel/preset-typescript' ],
	presets: ['module:@react-native/babel-preset'],
	plugins: [
		[
			'module-resolver',
			{
				root: ["."],
				alias: {"~": "./src"},
				extensions: ['.ios.ts', '.android.ts', '.ts', '.ios.tsx', '.android.tsx', '.tsx', '.jsx', '.js', '.json'],
			},
		],
		//['react-native-worklets-core/plugin'],
		//['react-native-reanimated/plugin']
	],
};

