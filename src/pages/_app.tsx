import { AppContext, AppInitialProps, NextWebVitalsMetric } from 'next/app';
import { CssBaseline, GeistProvider } from '@geist-ui/react';
import '../../styles/globals.css';
import anylogger from 'anylogger';
import Header from '../components/c005';

const logger = anylogger('app');

export function reportWebVitals(metric: NextWebVitalsMetric) {
	logger.info(metric);
}

function App({ Component, pageProps }: AppInitialProps & AppContext) {
	return (
		<GeistProvider>
			<CssBaseline />
			<Header />
			<Component {...pageProps} />
		</GeistProvider>
	);
}

export default App;
