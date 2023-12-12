import React from "react";
import { useState, useEffect } from "react";
import axios from "axios";

import {
  DataGrid,
  Sorting,
  LoadPanel,
  Column,
  Editing,
  HeaderFilter,
  GroupPanel,
  Export,
  Selection
} from "devextreme-react/data-grid";

import { Workbook } from 'exceljs';
import saveAs from 'file-saver';
import { exportDataGrid } from 'devextreme/excel_exporter';
import { jsPDF } from 'jspdf';
import { exportDataGrid as exportDataGridToPdf } from 'devextreme/pdf_exporter';

const exportFormats = ['xlsx', 'pdf'];

function exportGrid(e) {
  if (e.format === 'xlsx') {
    const workbook = new Workbook();
    const worksheet = workbook.addWorksheet("Main sheet");
    exportDataGrid({
      worksheet: worksheet,
      component: e.component,
    }).then(function () {
      workbook.xlsx.writeBuffer().then(function (buffer) {
        saveAs(new Blob([buffer], { type: "application/octet-stream" }), "DataGrid.xlsx");
      });
    });
  }
  else if (e.format === 'pdf') {
    const doc = new jsPDF();
    exportDataGridToPdf({
      jsPDFDocument: doc,
      component: e.component,
    }).then(() => {
      doc.save('DataGrid.pdf');
    });
  }
}

const Employees = () => {
  const dataGrid = React.createRef();
  const [employees, setEmployees] = useState([]);

  useEffect(() => {
    const fetchEmployees = async () => {
      const config = {
        headers: {
          "Content-Type": "application/json",
        },
      };
      try {
        const { data } = await axios.get(
          "http://localhost:8000/api/employees",
          config
        );
        setEmployees(data);
      } catch (error) {
        console.log(error);
      }
    };
    fetchEmployees();
  }, []);

  const onRowInserted = (e) => {
    const employeeData = {
      employee_id: e.data.employee_id,
      name: e.data.name,
      email: e.data.email,
      phone: e.data.phone,
      job_title: e.data.job_title,
      department: e.data.department,
      hire_date: e.data.hire_date,
      is_active: e.data.is_active,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .post("http://localhost:8000/api/employees", employeeData, config)
      .catch((error) => {
        console.log(error);
      });
  };

  const onRowUpdated = (e) => {
    const employeeData = {
      employee_id: e.data.employee_id,
      name: e.data.name,
      email: e.data.email,
      phone: e.data.phone,
      job_title: e.data.job_title,
      department: e.data.department,
      hire_date: e.data.hire_date,
      is_active: e.data.is_active,
    };
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    axios
      .put(
        `http://localhost:8000/api/employees/${e.data._id}`,
        employeeData,
        config
      )
      .catch((error) => {
        console.log(error);
      });
  };

  const onRowRemoved = (e) => {
    const config = {
      headers: {
        "Content-Type": "application/json",
      },
    };
    console.log(e.data._id);
    axios
      .delete(`http://localhost:8000/api/employees/${e.data._id}`, config)
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div>
      <h2>Employees</h2>
      {/* <button onClick={() => dataGrid.current.instance.addRow()}>Add</button> */}
      <div className="grid">
        <DataGrid
          id="dataGrid"
          dataSource={employees}
          searchPanel={{ visible: true, width: 200, placeholder: "Search..." }}
          showRowLines={true}
          columnAutoWidth={true}
          allowColumnResizing={true}
          columnHidingEnabled={true}
          allowColumnReordering={true}
          onRowInserted={onRowInserted}
          onRowUpdated={onRowUpdated}
          onRowRemoved={onRowRemoved}
          ref={dataGrid}
          onExporting={exportGrid}
        >
          <Selection mode="multiple" />
          <Export enabled={true} formats={exportFormats} allowExportSelectedData={true} />
          <Editing
            mode="row"
            allowUpdating={true}
            allowDeleting={true}
            allowAdding={true}
          />
          
          <Sorting mode="single" />
          <LoadPanel enabled={true} />
          <HeaderFilter visible={true} allowSelectAll={false} />
          <GroupPanel visible={true} />

          <Column dataField="_id" visible={false} />
          <Column dataField="employee_id" width={140} />
          <Column dataField="name" />
          <Column dataField="email" />
          <Column dataField="phone" />
          <Column dataField="job_title" />
          <Column dataField="department" />
          <Column dataField="hire_date" dataType="date" format="shortDate" />
          <Column dataField="is_active" dataType="boolean" />
        </DataGrid>
      </div>
    </div>
  );
};

export default Employees;
