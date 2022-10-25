import { useState } from "react";
import { Accordion, AccordionSummary, AccordionDetails} from '@mui/material';
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";

const FormDrawer = ({label, open, children, ...props}) => {
    const [ isOpen, setIsOpen ] = useState(open);

    return (
        <Accordion
            expanded={isOpen}
            onChange={() => { setIsOpen(!isOpen) }}
            sx={{
                width: '100%', 
                margin: '0px', 
                padding: '0px', 
                boxShadow: 'none',
                marginTop: '20px',
                '&:before': {
                    backgroundColor: 'transparent !important',
                },
            }}
            {...props}
        >
            <AccordionSummary 
                className="form__label" 
                expandIcon={
                        <FontAwesomeIcon 
                            icon={['fal', 'chevron-down']} 
                        />
                    }
                sx={{padding: '0px', maxHeight: '50px', border: 'none !important'}}
            >
                <h3>{label}</h3>
            </AccordionSummary>
            <AccordionDetails sx={{padding: '0px'}}>
                {children}
            </AccordionDetails>
        </Accordion>
    )
}

export default FormDrawer;