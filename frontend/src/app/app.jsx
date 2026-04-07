import AppRoutes from "./routes";
import Providers from "./providers";
const App = () => {
    return (
        // its like give the global power to routes for boost the app -->e.g. internet router 
        <Providers>
            <AppRoutes />
        </Providers>);
};
export default App;