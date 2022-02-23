import '../styles/globals.css'
import 'bootstrap/dist/css/bootstrap.css'
import Header from '../components/shared/Header'
import type {AppProps} from 'next/app'
import Head from 'next/head';
import { store } from '../redux/store'
import { Provider } from 'react-redux'

function MyApp({Component, pageProps}: AppProps) {


    return <>
        <Provider store={store}>
        <Head>
            <title>Unleashed Capital Test</title>
            <meta name="viewport" content="width=device-width, initial-scale=1"/>
        </Head>
        <div className={'container p-0 main'}>
            <Header/>
            <Component {...pageProps} />
        </div>
        </Provider>
    </>
}

export default MyApp
