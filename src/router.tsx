import { createBrowserRouter, createRoutesFromElements, Route } from "react-router-dom";
import App from "./App";
import LandingPage from "./Pages/LandingPage";
import EntriesPage from "./Pages/EntriesPage";
import EntryPage from "./Pages/EntryPage";
import EditEntryPage from "./Pages/EditEntryPage";
import NewEntryPage from "./Pages/NewEntryPage";
import NotfoundPage from "./Pages/NotfoundPage";
import TaggedEntriesPage from "./Pages/TaggedEntriesPage";
import ProfilePage from "./Pages/ProfilePage";
import EditProfilePage from "./Pages/EditProfilePage";

export const router = createBrowserRouter(
  createRoutesFromElements(
    <Route path="/" element={<App />}>
      <Route index element={<LandingPage />} />
      <Route path="entries">
        <Route index element={<EntriesPage />} />
        <Route path="tagged/:tag" element={<TaggedEntriesPage />} />
      </Route>
      <Route path="entry/:id" element={<EntryPage />} />
      <Route path="edit/:id" element={<EditEntryPage />} />
      <Route path="edit/profile" element={<EditProfilePage />} />
      <Route path="new" element={<NewEntryPage />} />
      <Route path="profile" element={<ProfilePage />} />

      <Route path="*" element={<NotfoundPage />} />
    </Route>
  ),
  { basename: "/project-react-individual" }
);
