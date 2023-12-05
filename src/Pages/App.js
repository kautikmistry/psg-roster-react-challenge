import Aside from '../Components/Aside';
import FormationOverview from '../Components/FormationOverview';
import MainSection from '../Components/MainSection';
import './App.css';
import { Routes, Route } from "react-router-dom";

function App() {
    return (
        <>
            <div className="flex h-screen items-stretch justify-between gap-12 max-md:flex-wrap bg-gradient-to-b from-neutral-800 to-neutral-900">
                <Aside />
                <Routes>
                    <Route path="/" element={<MainSection />} />
                    <Route path="/formation-overview" element={<FormationOverview />} />
                </Routes>
            </div>
        </>
    );
}

export default App;
