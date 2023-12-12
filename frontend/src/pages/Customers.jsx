import React from "react";
import DataSource from 'devextreme/data/data_source';
import { customers, orders } from "../data/data";

import {
  DataGrid,
  Sorting,
  LoadPanel,
  Column,
  Editing,
  HeaderFilter,
  GroupPanel,
  MasterDetail
} from "devextreme-react/data-grid";

const Orders = () => {
  const dataGrid = React.createRef();

  const dataSource = new DataSource({
    store: orders,
    filter: ["customer_id", "=", 1]
  });

  return (
    <>
      <div className="master-detail-caption">
        Orders:
      </div>
      <DataGrid
        id="dataGrid"
        key="customer_id"
        dataSource={dataSource}
        showRowLines={true}
        columnAutoWidth={true}
        allowColumnResizing={true}
        columnHidingEnabled={true}
        allowColumnReordering={true}
        searchPanel={{ visible: true, width: 200, placeholder: "Search..." }}
        ref={dataGrid}
      >
        <Editing
          mode="row"
          allowUpdating={true}
          allowDeleting={true}
          allowAdding={true}
        />
      </DataGrid>
    </>
  )
}

const Customers = () => {
  const dataGrid = React.createRef();

  return (
    <div>
      <h2>Customers</h2>
      <div className="customer-grid">
        <DataGrid
          id="dataGrid"
          key="id"
          dataSource={customers}
          searchPanel={{ visible: true, width: 200, placeholder: "Search..." }}
          showRowLines={true}
          columnAutoWidth={true}
          allowColumnResizing={true}
          columnHidingEnabled={true}
          allowColumnReordering={true}
          showBorders={true}
          ref={dataGrid}
        >
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

          <Column dataField="id" />
          <Column dataField="first_name" />
          <Column dataField="last_name" />
          <Column dataField="email" />
          <MasterDetail enabled={true} component={Orders} />
        </DataGrid>
      </div>
    </div>
  );
};

export default Customers;
