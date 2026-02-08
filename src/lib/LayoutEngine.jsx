import ProductivityLayout from '../components/Productivity/ProductivityLayout';
import TravelLayout from '../components/Travel/TravelLayout';

const DefaultView = () => <div className="p-8 text-center text-gray-500">Welcome to GenUI. Try asking "Show productivity" or "Plan a trip".</div>;
const DevView = () => <div className="p-8 text-center text-indigo-400">Developer Tools (Placeholder)</div>;

export const getLayoutComponents = (layout) => {
    switch (layout) {
        case 'productivity': return [ProductivityLayout];
        case 'travel': return [TravelLayout];
        case 'dev': return [DevView];
        default: return [];
    }
};
