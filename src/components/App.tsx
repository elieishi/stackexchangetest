import { BrowserRouter, Routes, Route } from "react-router-dom";
import Users from './Users';
import 'semantic-ui-css/semantic.min.css';

export default function App() {
    return (
    <BrowserRouter>
        <Routes>
            <Route path="/" element={<Users />}>
            </Route>
        </Routes>
    </BrowserRouter>
    );
}
