import React, { useState, useMemo } from "react";
import { Button } from "@material-tailwind/react";
import { Trash2Icon } from "lucide-react";
import { router } from "@inertiajs/react";
import toast from "react-hot-toast";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { setAddNewRowData, setAddNewRow } from "@/Store/Reducers/TableSlice";
import { useSelector, useDispatch } from "react-redux";
import UploadItem from "@/Components/FWSites/FieldItems/Edit/UploadItem";
const SaveDeleteComponent = () => {
  const dispatch = useDispatch();
  const { addNewRowData } = useSelector((state) => state.table);
  const onSubmitHandler = (e) => {
    e.preventDefault();
    if (!addNewRowData["loc_id"]) {
      return toast.error("LocId is required");
    }
    router.post(route("wireless.sites.add.row"), {newItem:addNewRowData}, {
      onSuccess: () => {
        dispatch(setAddNewRow(false));
        toast.success("Row Added successfully");
      },
    });
  };
  const handeOnDelete = () => {
    dispatch(setAddNewRow(false));
    (setAddNewRowData({}));

  };
  return (
    <div className="flex gap-2 mt-1">
      <Button
        variant="gradient"
        size="sm"
        className="capitalize py-1 px-2 rounded font-semibold"
        onClick={onSubmitHandler}
      >
        Save
      </Button>
      <Button
        variant="gradient"
        color="red"
        size="sm"
        className="capitalize py-1 px-2 rounded"
        onClick={handeOnDelete}
      >
        <Trash2Icon size={14} />
      </Button>
    </div>
  );
};

export default function AddNewRow({ setAddNewRow }) {
  const dispatch = useDispatch();
  const { addNewRowData } = useSelector((state) => state.table);

  const solutionType = [
    "device_upgrade",
    "reparent",
    "repan",
    "opti_type_1",
    "opti_type_5",
    "opti_type_6",
    "epo",
  ];
  const status = ["in_progress", "not_started", "completed"];
  const defaultColDef = useMemo(() => ({
    editable: true,
  }));

  const [tableHeader] = useState([
    {
      headerName: "LOCID",
      field: "loc_id",
    },
    { headerName: "WNTD", field: "wntd" },
    { headerName: "IMSI", field: "imsi" },
    { headerName: "VERSION", field: "version" },
    { headerName: "AVC", field: "avc" },
    { headerName: "BW Profile", field: "bw_profile" },
    { headerName: "Lon", field: "lon" },
    { headerName: "Lat", field: "lat" },
    { headerName: "SiteName", field: "site_name" },
    { headerName: "HomeCell", field: "home_cell" },
    { headerName: "HomePCI", field: "home_pci" },

    {
      headerName: "Traffic Profile",
      field: "traffic_profile",
    },
    {
      headerName: "Start Date",
      field: "start_date",
      input_type: "date",
      valueFormatter: (params) => {
        if (!params.value) {
          return "";
        }
        const month = params.value.getMonth() + 1;
        const day = params.value.getDate();
        return `${params.value.getFullYear()}-${
          month < 10 ? "0" + month : month
        }-${day < 10 ? "0" + day : day}`;
      },
      cellEditor: "agDateCellEditor",
    },
    {
      headerName: "End Date",
      field: "end_date",
      valueFormatter: (params) => {
        if (!params.value) {
          return "";
        }

        const month = params.value.getMonth() + 1;
        const day = params.value.getDate();
        return `${params.value.getFullYear()}-${
          month < 10 ? "0" + month : month
        }-${day < 10 ? "0" + day : day}`;
      },
      cellEditor: "agDateCellEditor",
    },
    {
      headerName: "Solution Type",
      field: "solution_type",
      cellEditor: "agSelectCellEditor",
      filterParams: {
        caseSensitive: true,
        defaultOption: "startsWith",
      },
      cellEditorParams: {
        values: solutionType,
      },
    },
    {
      headerName: "Status",
      field: "status",
      cellEditor: "agSelectCellEditor",
      filterParams: {
        caseSensitive: true,
        defaultOption: "startsWith",
      },
      cellEditorParams: {
        values: status,
      },
    },
    { headerName: "Remarks", field: "remarks" },
    {
      headerName: "Artifacts",
      field: "artifacts",
      editable: false,
    },
    {
      headerName: "",
      field: "",
      editable: false,
      cellRenderer: SaveDeleteComponent,
    },
  ]);
  const [siteItems, setSitesItems] = useState([
    {
      loc_id: "",
      wntd: "",
      imsi: "",
      version: "",
      avc: "",
      bw_profile: "",
      lon: "",
      lat: "",
      site_name: "",
      home_cell: "",
      home_pci: "",
      traffic_profile: "",
      deleted_at: null,
      remarks: "",
      artifacts: "",
      solution_type: "",
      start_date: new Date(),
      status: "",
      end_date: new Date(),
    },
  ]);
  const onCellValueChanged = (event) => {
    const newItem = { ...addNewRowData };
    dispatch(
      setAddNewRowData({
        ...newItem,
        [event?.colDef?.field]: event?.value,
      })
    );
  };

  return (
    <>
      <div className="overflow-x-auto overflow-hidden">
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: 110 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            rowData={siteItems}
            columnDefs={tableHeader}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
      </div>
    </>

  );
}
