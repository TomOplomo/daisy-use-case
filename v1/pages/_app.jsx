import '../styles/globals.css';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function App({ Component, pageProps }) {
    return (
        <div className="min-h-screen flex flex-col bg-daisy-cream font-sans">
        <Navbar />

        <main className="flex-1 flex flex-col">
            <Component {...pageProps} />
        </main>

        <Footer />
        </div>
    );
}
