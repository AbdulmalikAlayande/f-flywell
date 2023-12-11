module: {
    rules: [
        {
            test: /\.svg$/,
            use: [
                {
                    loader: '@svgr/webpack',
                    options: {
                        svgrOptions: {
                            throwIfNameSpace: false,
                        }
                    }
                }
            ]
        }
    ]
}
export default module