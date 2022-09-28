import { 
    Paper, Table, TableHead, TableRow, 
    TableContainer, TableCell, TableBody 
} from "@mui/material"
import { sliceAddress } from "@utils/helpers"

const HolderTable = ({ holders }) => {
    return (
        <div id="holder-table">
            <TableContainer component={Paper}>
                <Table aria-label="simple table">
                    <TableHead>
                        <TableRow>
                            <TableCell>Address</TableCell>
                            <TableCell>Received At</TableCell>
                            <TableCell>Nickname</TableCell>
                            <TableCell>Pod</TableCell>
                            <TableCell>Delegate</TableCell>
                        </TableRow>
                    </TableHead>

                    <TableBody>
                    {holders.map((holder) => (
                        <TableRow
                            key={holder.address}
                            sx={{ '&:last-child td, &:last-child th': { border: 0 } }}
                        >
                            <TableCell component="th" scope="row">
                                {sliceAddress(holder.address)}
                            </TableCell>
                            <TableCell>{holder.receivedAt}</TableCell>
                            <TableCell>{holder.nickname}</TableCell>
                            <TableCell>{holder.pod}</TableCell>
                            <TableCell>{holder.delegate ? "Yes" : "No"}</TableCell>
                        </TableRow>
                    ))}
                    </TableBody>
                </Table>
            </TableContainer>
        </div>
    )
}

export default HolderTable