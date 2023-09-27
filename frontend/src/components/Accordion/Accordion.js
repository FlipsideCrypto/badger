import Markdown from 'markdown-to-jsx';

import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Accordion/Accordion.css";

const Title = ({ item }) => {
    if (item.icon)
        return <h3 className="left"><span><FontAwesomeIcon icon={item.icon} /></span> {item.title}</h3>

    return <h3 className="animated">{item.title} <span><FontAwesomeIcon icon="fal fa-chevron-down" /></span></h3>
}

const Accordion = ({ accordianKey, items, onClick = () => {} }) => {
    return (
        <div className="accordion">
            {items.map((item, index) => {
                const className = `card ${item.selected === true ? 'selected' : ''} ${item.icon ? 'left' : ''}`

                return <div 
                    key={`${accordianKey}-${index}`} 
                    className={className} 
                    onClick={() => onClick(previous => { 
                        return { 
                            ...previous,
                            [accordianKey]: previous[accordianKey]
                                .map(item => {
                                    item.selected = false
                                    return item
                                })
                                .map((item, i) => {
                                    if (i === index)
                                        item.selected = true

                                    return item
                                })
                            }
                        })
                    }>
                    <Title item={item} />

                    <Markdown className="card-body">{item.content}</Markdown>
                </div>
            })}
        </div>
    )
}

export { Accordion }