import React, { useState, useEffect } from "react";
import MaterialTable from "material-table";
import useWindowSize from "../windowSize/windowSize"
const MaterialTables = ({ headings, data, title, ispdf }) => {
  const size = useWindowSize();

  const [selectedRow, setSelectedRow] = useState(null);
  const columns = [];
  const excludeHeads = [
    "Actions"
  ];

  headings.map((header) => {
    if (excludeHeads.includes(header)) {
      columns.push({
        title: header,
        field: header,
        export: false,
      });
    } else {
      columns.push({
        title: header,
        field: header,
      });
    }
  });

  if (size.width < 800) {
    title = "";
  }

  return (
    <MaterialTable
      title={title}
      columns={columns}
      data={data}
      onRowClick={(evt, selectedRow) =>
        setSelectedRow(selectedRow.tableData.id)
      }
      options={{
        headerStyle: {
          backgroundColor: "#dcd6f7",
          color: "#3e206d",
        },

        rowStyle: (rowData) => ({
          backgroundColor:
            selectedRow === rowData.tableData.id ? "#EEE" : "#FFF",
        }),
        exportButton: { csv: true, pdf: ispdf ? true : false },
        exportAllData: true,
      }}
    />
  );
};

MaterialTables.defaultProps = {
  ispdf: true,
};

export default MaterialTables;
