import React from "react";
import { EntryProvider } from "./components/EntryProvider";
import { EntryForm } from "./components/EntryForm";
import { EntryList } from "./components/EntryList";
import { MoodProvider } from "./components/mood/MoodProvider";
import { InstructorProvider } from './components/instructor/InstructorProvider';

export const DailyJournal = () => {
  return (
    <div className="DailyJournal">
      <InstructorProvider>
      <EntryProvider>
        <MoodProvider >
          <EntryForm />
          <EntryList />
        </MoodProvider>
      </EntryProvider>
      </InstructorProvider>
    </div>
  );
};
