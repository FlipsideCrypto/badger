import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell } from "@mui/material";

import "@style/Table/TableSortHead.css";

const TableSortHead = ({ id, label, sorted, onSortChange }) => {
    function getIcon() {
        if (sorted.method === "asc") return (
            <FontAwesomeIcon 
                className="table__sort__icon__solid" 
                icon={["fal", "chevron-up"]} 
            />
        )
        if (sorted.method === "desc") return (
            <FontAwesomeIcon 
                className="table__sort__icon__solid" 
                icon={["fal", "chevron-down"]} 
            />
        )
        return <FontAwesomeIcon icon={["fal", "chevron-up"]} />;
    }

    return (
        <TableCell>
            <button className="button-unstyled" onClick={() => onSortChange(id)}>
                <div className="table__sort__head">
                    <div className="table__sort__head__label">
                        <span>{label}</span>
                    </div>
                    <div className="table__sort__icon">
                        {getIcon()}
                    </div>
                </div>
            </button>
        </TableCell>
    )
}

export default TableSortHead;