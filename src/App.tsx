import { Suspense } from "react";
import { Routes, Route } from "react-router-dom";
import { Navbar } from "./components/Navbar";
import { MainPageAsync } from "./pages/MainPage/MainPage.async";
import { NotFoundPage } from "./pages/NotFoundPage";
import { SinglePostPageAsync } from "./pages/SinglePostPage/SinglePostPage.async";

export const App = () => {
  return (
    <div className="min-h-screen text-2xl">
      <Navbar />
      <Suspense fallback={<div>Loading...</div>}>
        <Routes>
          <Route path="/" element={<MainPageAsync />} />
          <Route path="/post/:id" element={<SinglePostPageAsync />} />
          <Route path="*" element={<NotFoundPage />} />
        </Routes>
      </Suspense>
    </div>
  );
};
