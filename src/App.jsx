import StudentManager from "./component/StudentForm";
import { ThemeProvider, ThemeToggleButton, useTheme } from "./component/ThemeManagement";

function AppContent() {
  const { styles } = useTheme();

  return (
    <div style={styles.app}>
      <ThemeToggleButton />
      <StudentManager />
    </div>
  );
}

function App() {
  return (
    <ThemeProvider>
      <AppContent />
    </ThemeProvider>
  );
}

export default App;