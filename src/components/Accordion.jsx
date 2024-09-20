import { useState } from "react"
import './Accordion.css'
import data from "./data";

const Accordion = () => {
    const [selected, setSelected] = useState(null);
    const [enableMultiSelection, setEnableMultiSelection] = useState(false);
    const [multiple, setMultiple] = useState([]);

    function handleMultiSelection(currentId) {
        setMultiple(oldVersion => {
            if (oldVersion.includes(currentId)) {
                return oldVersion.filter(id => id !== currentId)
            }
            else {
                return [...oldVersion, currentId]
            }
        })
    }

    function handleSingleSelection(currentId) {
        setSelected(currentId === selected ? null : currentId)
    }

    return (
        <div className="wrapper">
            <button onClick={() => setEnableMultiSelection(!enableMultiSelection)}>
                {enableMultiSelection ? "Multi Selection" : "Single Selection"}
            </button>
            <div className="accordion">
                {data && data.length > 0 ?
                    data.map(item => (
                        <div key={item.id} className="item">
                            <div
                                onClick={
                                    enableMultiSelection
                                        ? () => handleMultiSelection(item.id)
                                        : () => handleSingleSelection(item.id)
                                }
                                className="title"
                            >
                                <h3>{item.question}</h3>
                                <span>+</span>
                            </div>
                            {
                                enableMultiSelection
                                    ? multiple.includes(item.id) && <div className="answer">{item.answer}</div>
                                    : selected === item.id && <div className="answer">{item.answer}</div>
                            }
                        </div>
                    ))
                    :
                    <div>No data found!</div>
                }
            </div>

        </div>
    )
}

export default Accordion


