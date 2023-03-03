import Markdown from 'markdown-to-jsx';

import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Accordion/Accordion.css";

const title = (item) => {
    if (item.icon)
        return <h3 className="left"><span><FontAwesomeIcon icon={item.icon} /></span> {item.title}</h3>

    return <h3 className="animated">{item.title} <span><FontAwesomeIcon icon="fal fa-chevron-down" /></span></h3>
}

const Accordion = ({ items, start = undefined }) => {
    const [selected, setSelected] = useState(start || 0)

    return (
        <div className="accordion">
            {items.map((item, index) => {
                const className = `card ${selected === index ? 'selected' : ''} ${item.icon ? 'left' : ''}`

                return <div key={index} className={className} onClick={() => setSelected(index)}>
                    {title(item)}

                    <Markdown className="card-body">{item.content}</Markdown>
                </div>
            })}
        </div>
    )
}

export { Accordion }