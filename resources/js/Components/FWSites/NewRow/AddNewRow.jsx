import React ,{useMemo,useState}from 'react'
import { Button } from '@material-tailwind/react'
import { Trash2Icon } from 'lucide-react'
import { router } from '@inertiajs/react'
import toast from 'react-hot-toast'
import EditableComponent from '../FieldItems/New/EditableComponent'
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { setAddNewRowDataFW, setAddNewRowFW } from "@/Store/Reducers/TableSlice";
import { useSelector, useDispatch } from "react-redux";

const SaveDeleteComponent = () => {
    const dispatch = useDispatch();
    const { addNewRowDataFW } = useSelector((state) => state.table);
    const onSubmitHandler = (e) => {

      e.preventDefault();
      if (!addNewRowDataFW['site_name']) {
   
        return toast.error('Site name is required')
    }
      router.post(route("site.field.name.add.row"), addNewRowDataFW, {
        onSuccess: () => {
          dispatch(setAddNewRowFW(false));
          toast.success("Row Added successfully");
        },
      });
    };
    const handeOnDelete = () => {
      dispatch(setAddNewRowFW(false));
      (setAddNewRowDataFW({}));
  
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
        "opti_type_1",
        "opti_type_5",
        "opti_type_6",
      ];
      const status = ["in_progress", "not_started", "completed"];
    const defaultColDef = useMemo(() => ({
      editable: true,
    }));
  
    const [tableHeader] = useState([
        { headerName: 'Site Name',  field: 'site_name',},
        { headerName: "Cell Name", field: "cell_name" },
        { headerName: "Lon", field: "lon" },
        { headerName: "Lat", field: "lat" },
        { headerName: "BB Type", field: "bb_type" },
        { headerName: "RRU Type", field: "rru_type" },
        { headerName: "Antenna Type", field: "antenna_type" },
        { headerName: "Frequency", field: "frequency" },
        { headerName: "PCI", field: "pci" },
        { headerName: "Azimuth", field: "azimuth" },
        { headerName: "Height", field: "height" },
        {
            headerName: "Last EPO",
            field: "last_epo",
          },
          {
            headerName: "Next EPO",
            field: "next_epo",
          },
          {
            headerName: "Start Date",
            field: "start_date",
          },
          {
            headerName: "End Date",
            field: "end_date",
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
          {
            headerName: "Remarks",
            field: "remarks",
          },
          {
            headerName: "Artifacts",
            field: "artifacts",
           
            editable: false,
          },
      
          {
            headerName: "",
            field: "",
            editable: false,
            filter: false,
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
        setAddNewRowDataFW({
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
              style={{ height: 100 }} // the Data Grid will fill the size of the parent container
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