import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell } from "@mui/material";

import "@style/Table/TableSortHead.css";

const TableSortHead = ({ id, label, sortMethod, onSortChange, align, width }) => {
    return (
        <TableCell align={align} sx={{width: width}}>
            <button 
                className="button__unstyled" 
                onClick={() => onSortChange(id)}
                style={{ width: "100%" }}
            >
                <div className="table__sort__head">
                    <div className="table__sort__head__label">
                        <span>{label}</span>
                    </div>
                    <div className="table__sort__icon">
                            <FontAwesomeIcon 
                                className="table__sort__icon__solid" 
                                icon={ ["fal", `${sortMethod==="asc" ? "chevron-up" : "chevron-down"}`] } 
                            />
                    </div>
                </div>
            </button>
        </TableCell>
    )
}

export default TableSortHead;