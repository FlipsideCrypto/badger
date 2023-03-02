import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails } from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

import "@style/Form/FormDrawer.css";

const FormDrawer = ({ label, open = true, children, ...props }) => {
    const [isOpen, setIsOpen] = useState(open);

    return (
        <Accordion
            className="form__accordion"
            expanded={isOpen}
            onChange={() => { setIsOpen(!isOpen) }}
            {...props}
        >
            <AccordionSummary
                className="form__label"
                expandIcon={
                    <FontAwesomeIcon
                        icon={['fal', 'chevron-down']}
                    />
                }
            // sx={{padding: '0px', maxHeight: '50px', border: 'none !important'}}
            >
                <h4 style={{ fontSize: "15px", fontWeight: 700 }}>{label}</h4>
            </AccordionSummary>
            <AccordionDetails sx={{ padding: '0px' }}>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export { FormDrawer };