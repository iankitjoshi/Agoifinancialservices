import React from "react";
import {
  TableHead,
  TableRow,
  TableCell,
  Checkbox,
  TableSortLabel,
} from '@material-ui/core'


//Table Heading
function EnhancedTableHead(props) {
  const [selected, setSelected] = React.useState([]);

  let {
    order,
    orderBy,
    onRequestSort,
    headCells,
    showCheck,
    onChangeClick,
    isChecked
  } = props;

  const createSortHandler = (property) => (event) => {
    onRequestSort(event, property);
  };

  
  if (showCheck) {
    headCells = headCells.map((item, index) => ({ ...item, showCheck: false }))
    headCells.push({ showCheck: true })
  }
  return (
    <TableHead className="cf ">
      <TableRow>
        {headCells.map((headCell, i) => {
          if (headCell.showCheck) {
            return <TableCell
              key={i}
              padding="checkbox"
            >
              <div className="d-flex align-center">
                <Checkbox
                  checked={isChecked}
                  onClick={e => onChangeClick(e.target.checked)}
                  />
                <span>Live On TV</span>
              </div>
            </TableCell>
          } else {
            return <TableCell
              key={i}
              align={headCell.numeric ? "right" : "left"}
              padding={headCell.disablePadding ? "none" : "default"}
              sortDirection={orderBy === headCell.id ? order : false}
            >
              <TableSortLabel
                active={orderBy === headCell.id}
                direction={orderBy === headCell.id ? order : "asc"}
                onClick={createSortHandler(headCell.id)}
                hideSortIcon={true}
              >
                {headCell.label}
                {orderBy === headCell.id ? (
                  <span style={{ "display": "none" }}>
                    {order === "desc" ? "sorted descending" : "sorted ascending"}
                  </span>
                ) : null}
              </TableSortLabel>
            </TableCell>
          }
        })}
      </TableRow>
    </TableHead>
  );
}

export default EnhancedTableHead;