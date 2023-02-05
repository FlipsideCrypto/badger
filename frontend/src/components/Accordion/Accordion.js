import { useState } from "react";

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Accordion/Accordion.css";

const Accordion = ({ items }) => {
    const [ activeIndex, setActiveIndex ] = useState(null)

    const onAccordionClick = (index) => {
        setActiveIndex(activeIndex === index ? null : index)
    }

    return (
        <div className="accordion">
            {items.map((item, index) => {
                return (
                    <div className={`item ${activeIndex === index ? 'active' : ''}`}key={item.title}>
                        <div className={`title ${activeIndex === index ? 'active' : ''}`} onClick={() => onAccordionClick(index)}>
                            <p>{item.title}</p>
                            <FontAwesomeIcon icon="fal fa-chevron-down" />
                        </div>
                        <div className={`content ${activeIndex === index ? 'active' : ''}`}>
                            <p>{item.content}</p>
                        </div>
                    </div>
                )
            })}
        </div>
    )
}

export { Accordion }