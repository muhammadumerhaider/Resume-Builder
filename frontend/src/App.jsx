import { Routes, Route } from "react-router-dom";
import ResumeForm from "./components/ResumeForm"
import ResumePreview from "./pages/ResumePreview";

function App() {

  return (
    <Routes>
      <Route path="/" element={<ResumeForm />}></Route>
      <Route path="/preview" element={<ResumePreview />}></Route>
    </Routes>
  )
}

export default App
