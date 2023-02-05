import { useState } from 'react';

import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';

import "@style/Card/AccordianCard.css"

const AccordianCard = ({ actions = [], start = null }) => {
    const [selected, setSelected] = useState(start || 0)

    return (
        <div className="accordian">
            <div className="actions">
                {actions.map((action, index) => {
                    return (
                        <div
                            key={index}
                            className={`card ${selected === index ? 'selected' : ''}`}
                            onClick={() => setSelected(index)}
                        >
                            <h3><FontAwesomeIcon icon={action.icon} />{action.title}</h3>

                            <div
                                id={`collapse${index}`}
                                className={`collapse ${selected === index ? 'show' : ''}`}
                                aria-labelledby={`heading${index}`}
                                data-parent="#accordionExample"
                            >
                                <div className="card-body">{action.description}</div>
                            </div>
                        </div>
                    )
                })}
            </div>
        </div>
    )
}

export { AccordianCard }