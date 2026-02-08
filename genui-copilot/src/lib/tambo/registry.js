// This registry maps string names to actual React components
// Tambo uses this to render the IDs it decides on.

import * as Productivity from '../../components/Productivity';
import * as Travel from '../../components/Travel';
import * as Dev from '../../components/Dev';

export const ComponentRegistry = {
    // Productivity
    'CalendarView': Productivity.CalendarView,
    'TaskList': Productivity.TaskList,
    'ProductivityChart': Productivity.ProductivityChart,
    'FocusTimer': Productivity.FocusTimer,

    // Travel
    'MapView': Travel.MapView,
    'BudgetBreakdown': Travel.BudgetBreakdown,
    'HotelCards': Travel.HotelCards,
    'FlightOptions': Travel.FlightOptions,
    'WeatherWidget': Travel.WeatherWidget,

    // Dev
    'CodeEditor': Dev.CodeEditor,
    'AIChatPanel': Dev.AIChatPanel,
    'FileExplorer': Dev.FileExplorer,
};
