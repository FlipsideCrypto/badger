import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { TableCell } from "@mui/material";

import "@style/Table/TableSortHead.css";

const TableSortHead = ({ id, label, sortMethod, onSortChange, align, width }) => {
    return (
        <TableCell align={align} sx={{ width: width }}>
            <button
                className="table__sort__button"
                onClick={() => onSortChange(id)}
            >
                <div className="table__sort__head">
                    <div className="table__sort__head__label">
                        <span>{label}</span>
                    </div>
                    <div className="table__sort__icon">
                        <FontAwesomeIcon
                            className="table__sort__icon__solid"
                            icon={["fal", `${sortMethod === "asc" ? "chevron-up" : "chevron-down"}`]}
                            style={{
                                width: "0.9em",
                            }}
                        />
                    </div>
                </div>
            </button>
        </TableCell>
    )
}

export { TableSortHead };