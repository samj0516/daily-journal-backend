import React, { useContext, useState, useEffect } from "react"
import { EntryContext } from "./EntryProvider"
import { MoodContext } from "./mood/MoodProvider"
import { InstructorContext } from './instructor/InstructorProvider'

export const EntryForm = (props) => {
    const { addEntry, updateEntry, entry, setEntry } = useContext(EntryContext)
    const { moods, getMoods } = useContext(MoodContext)
    const { instructors, getInstructors } = useContext(InstructorContext)
    const [editMode, editModeChanged] = useState(false)

    useEffect(() => {
        getMoods()
        .then(getInstructors)
    }, [])


    useEffect(() => {
        if ('id' in entry) {
            editModeChanged(true)
        }
        else {
            editModeChanged(false)
        }
    }, [entry])

    const handleControlledInputChange = (event) => {
        /*
            When changing a state object or array, always create a new one
            and change state instead of modifying current one
        */
        const newEntry = Object.assign({}, entry)
        newEntry[event.target.name] = event.target.value
        setEntry(newEntry)
    }



    const constructNewEntry = () => {

        if (editMode) {
            updateEntry({
                id: entry.id,
                concept: entry.concept,
                entry: entry.entry,
                date: entry.date,
                instructor_id: parseInt(entry.instructor_id),
                mood_id: parseInt(entry.mood_id)
            })
        } else {
            addEntry({
                concept: entry.concept,
                entry: entry.entry,
                date: Date.now(),
                instructor_id: parseInt(entry.instructor_id),
                mood_id: parseInt(entry.mood_id)
            })
        }
        setEntry({ concept: "", entry: "", date: "", mood_id: 0, instructor_id: 0 })
    }

    return (
        <form className="EntryForm">
            <h2 className="EntryForm__title">{editMode ? "Update Entry" : "Create Entry"}</h2>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="concept">Concept: </label>
                    <input type="text" name="concept" required autoFocus className="form-control"
                        proptype="varchar"
                        placeholder="Concept"
                        value={entry.concept}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="entry">Entry: </label>
                    <input type="text" name="entry" required className="form-control"
                        proptype="varchar"
                        placeholder="Entry"
                        value={entry.entry}
                        onChange={handleControlledInputChange}
                    />
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="mood_id">Mood: </label>
                    <select name="mood_id" className="form-control"
                        proptype="int"
                        value={entry.mood_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select a mood</option>
                        {moods.map(m => (
                            <option key={m.id} value={m.id}>
                                {m.label}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <fieldset>
                <div className="form-group">
                    <label htmlFor="instructor_id">Instructor: </label>
                    <select name="instructor_id" className="form-control"
                        proptype="int"
                        value={entry.instructor_id}
                        onChange={handleControlledInputChange}>

                        <option value="0">Select an instructor</option>
                        {instructors.map(e => (
                            <option key={e.id} value={e.id}>
                                {e.first_name}
                            </option>
                        ))}
                    </select>
                </div>
            </fieldset>
            <button type="submit"
                onClick={evt => {
                    evt.preventDefault()
                    constructNewEntry()
                }}
                className="btn btn-primary">
                {editMode ? "Update" : "Save"}
            </button>
        </form>
    )
}