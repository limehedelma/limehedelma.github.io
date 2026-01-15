import './App.css';
import Footer from './footer/footer';

function App() {
    return (
        <div className="board min-h-[100dvh] flex flex-col overflow-hidden">
            {/* ... existing code ... */}

            <div className="flex-1 flex items-center justify-center">
                <div className="label --info -bordered -blink">
                    Work in progress
                </div>
            </div>

            <Footer />
        </div>
    );
}

export default App;