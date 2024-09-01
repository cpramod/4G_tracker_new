import React, { useEffect, useRef, useState,useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import axios from "axios";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import toast from "react-hot-toast";
import Pagination from "@/Components/Pagination";
import TextInput from "@/Components/TextInput";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import CSVMapping from "@/Components/FWSites/CSVMapping";
import ExportButton from "@/Components/ExportButton";
import SaveBtn from "@/Components/FWSites/SaveBtn";
import ColumnOptions from "@/Components/FWSites/ColumnOptions/ColumnOptions";
import EditableComponent from "@/Components/FWSites/FieldItems/Edit/EditableComponent";
import RestoreTable from "@/Components/RestoreTable";
import DeleteButton from "@/Components/FWSites/DeleteButton";
import AddNewRow from "@/Components/FWSites/NewRow/AddNewRow";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch, useSelector } from "react-redux";
import { setChangedDataFW ,setAddNewRowFW} from "@/Store/Reducers/TableSlice";
import UploadItem from "@/Components/FWSites/FieldItems/Edit/UploadItem";

const SaveDeleteComponent = (props) => {
    return (
      <div className="flex gap-5 my-2">
        <SaveBtn {...props} />
        <DeleteButton {...props} />
      </div>
    );
  };


export default function Index({
  auth,
  sites,
  get_data,
  batch,
  additional_columns,
  hidden_columns,
  renamed_columns,
  deleted_columns,
  arrange_columns,
}) {
  const { role } = auth;
  const dispatch = useDispatch();
  const {addNewRowFW}=useSelector(state=>state.table)
  const defaultColDef = useMemo(() => ({
    editable: true,
    filter: true,
  }));
  const solutionType = [
    "opti_type_1",
    "opti_type_5",
    "opti_type_6",
  ];
  const status = ["in_progress", "not_started", "completed"];
  useEffect(() => {
   
    if (sites?.data?.length > 0) {
      sites?.data.map((itm) => {
        if (itm.end_date || itm.start_date) {
          let newDate = itm?.end_date ? new Date(itm?.end_date) : new Date();
          let newDateStart = itm?.start_date
            ? new Date(itm?.start_date)
            : new Date();
          itm.start_date = newDateStart;
          itm.end_date = newDate;
        }
        return itm;
      });
      setSitesItems(sites);
    }
  }, [sites?.data]);

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
      cellRenderer: UploadItem,
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
  const hiddenFileInput = useRef(null);
  const [searchText, setSearchText] = useState(
    get_data?.search ? get_data?.search : ""
  );
  const [perPage, setPerPage] = useState(
    get_data?.per_page ? get_data?.per_page : 10
  );
  const [siteItems, setSitesItems] = useState([]);
  const [mappingDialog, setMappingDialog] = useState(false);
  const [mappingData, setMappingData] = useState("");
  const [batchId, setBatchId] = useState(null);
  const [changedItems, setChangedItems] = useState([]);

  useEffect(() => {
    if (changedItems.length > 0) {
      dispatch(setChangedDataFW(changedItems));
    }
  }, [changedItems]);
  const onCellValueChanged = (event) => {
    const index = changedItems.findIndex(
      (item) =>
        item.site_id === event?.data?.id && item.loc_id === event?.data?.loc_id
    );
    if (index !== -1) {
      setChangedItems((prevItems) => {
        const updatedItems = [...prevItems];
        updatedItems[index] = {
          ...updatedItems[index],
          items: {
            ...updatedItems[index].items,
            [event?.colDef?.field]: event?.value,
          },
        };
        return updatedItems;
      });
    } else {
      setChangedItems((prevItems) => [
        ...prevItems,
        {
          site_id: event?.data?.id,
          loc_id: event?.data?.loc_id,
          items: {
            [event?.colDef?.field]: event?.value,
          },
        },
      ]);
    }
  };
  const handleClick = (event) => {
    hiddenFileInput.current.click();
  };
  const handleChangeUpload = async (event) => {
    const form_input = new FormData();
    form_input.append("import_file", event.target.files[0]);
    try {
      const res = await axios.post(route("site.field.name.import"), form_input);
      if (res?.data) {
        setMappingData(res?.data);
        setMappingDialog(true);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.error?.message}`);
    }
  };

  const handleSearch = async () => {
    if (searchText) {
      router.get(route("site.field.name.index", { search: searchText }));
    }
  };

  const sortData = async (key, order) => {
    router.get(route("site.field.name.index", { order_by: key, order: order }));
  };

  const onChangeFilter = async (key, value) => {
    router.get(
      route("site.field.name.index", { filter_by: key, value: value })
    );
  };
  const handlePerPageChange = (val) => {
    setPerPage(val);
    router.get(route("site.field.name.index", { ...get_data, per_page: val }));
  };
  useEffect(() => {
    if (batch?.batch_field_id) {
      setBatchId(batch?.batch_field_id);
    }
  }, []);
  useEffect(() => {
    const fetchProgress = async () => {
      try {
        let progress = 0;
        const response = await axios.get(
          route("import.progress", { batchId: batchId })
        );
        if (response?.data) {
          let totalJobs = parseInt(response?.data?.total_jobs);
          let pendingJobs = parseInt(response?.data?.pending_jobs);
          let completedJobs = totalJobs - pendingJobs;
          let failedJobs = parseInt(response?.data?.failed_jobs);
          if (failedJobs > 0) {
            clearInterval(interval);
          } else {
            progress = parseInt((completedJobs / totalJobs) * 100).toFixed(0);
            if (progress < 100) {
              toast.loading(
                `CSV Data Import Progress: ${progress}%.\n Please wait....`,
                {
                  id: "loading-toast",
                  style: {
                    backgroundColor: "#424242",
                    color: "#ffffff",
                    fontSize: 14,
                    borderRadius: 4,
                    fontWeight: "bold",
                  },
                }
              );
            } else {
              toast.dismiss("loading-toast");
              clearInterval(interval);
            }
          }
        }
      } catch (error) {
        console.log(error);
      }
    };
    const interval = setInterval(() => {
      if (batchId) {
        fetchProgress();
      }
    }, 5000);
    return () => clearInterval(interval);
  }, [batchId]);

  return (
    <Authenticated user={auth?.user}>
      <Head title="FW Sites" />
      <div className="top-section p-4">
        <div className="bg-white shadow rounded py-3 px-5 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="">
              <Typography variant={"h3"} className="tracking-tight">
                FW Site
              </Typography>
              <ul className="flex gap-1 text-gray-600 text-sm">
                <li>
                  <Link href={route("dashboard")}>Dashboard</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={route("site.field.name.index")}>FW Site</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="filter-wrapper md:px-4">
            <div className="flex filter-details justify-end gap-1">
              <div className="search-wrapper  w-full flex relative">
                <TextInput
                  placeholder="Search..."
                  className="w-full text-sm rounded-md rounded-r-none border-r-0 focus:ring-0 h-8"
                  value={searchText}
                  onChange={(e) => setSearchText(e.target.value)}
                />
                <div className="search-icon">
                  <IconButton
                    size="sm"
                    className="rounded-l-none"
                    onClick={handleSearch}
                  >
                    <SearchIcon color="white" size={18} />
                  </IconButton>
                </div>
              </div>
      
              {role === "super-admin" && (
                <>
                  <div className="import-type-field">
                    <Button
                      variant="gradient"
                      className="capitalize"
                      size="sm"
                      onClick={handleClick}
                    >
                      Import from CSV
                    </Button>
                    <input
                      type="file"
                      onChange={handleChangeUpload}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                  </div>
                  <ColumnOptions
                    columns={tableHeader}
                    hidden_columns={hidden_columns}
                    deleted_columns={deleted_columns ? deleted_columns : []}
                  />
                  <RestoreTable type={"fw_site"} />
                </>
              )}
              <ExportButton
                route_name={"site.field.name.export"}
                file_name={"FW Sites_Export"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content mt-6">
        <Card className="h-full w-full rounded-none">
          <div className="overflow-x-auto overflow-hidden">
           {siteItems?.data && siteItems?.data?.length > 0 && <><div
              className="ag-theme-quartz" // applying the Data Grid theme
              style={{ height: 500 }} // the Data Grid will fill the size of the parent container
            >
              <AgGridReact
                rowData={siteItems?.data}
                columnDefs={tableHeader}
                defaultColDef={defaultColDef}
                onCellValueChanged={onCellValueChanged}
              />
            </div>

            {addNewRowFW && <AddNewRow tableHeader={tableHeader} />}
            </>}
            {siteItems?.length === 0 && (
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-center py-6"
              >
                No data found
              </Typography>
            )}
            <div className="pagination flex justify-between items-center">
              <div className="px-4">
                <Button
                  variant="gradient"
                  size="sm"
                  className="capitalize rounded text-sm"
                  onClick={() => {
                    dispatch(setAddNewRowFW(true));
                  }}
                >
                  Add New Row
                </Button>
              </div>
              <div className="md:flex grid justify-start md:justify-end items-center pt-6 mb-8 gap-3 px-4">
                <div className="flex items-center gap-2">
                  <div className="text-sm font-medium">Rows per Page</div>
                  <select
                    className="rounded-md text-sm font-medium border-gray-400 focus:ring-0 py-2"
                    value={perPage}
                    onChange={(e) => {
                      handlePerPageChange(e.target.value);
                    }}
                  >
                    <option value="10">10</option>
                    <option value="15">15</option>
                    <option value="20">20</option>
                    <option value="20">25</option>
                    <option value="50">50</option>
                    <option value="all">All</option>
                  </select>
                </div>
                <div className="text-sm font-medium">{`${sites?.from}-${sites?.to} of ${sites?.total} Records`}</div>
                <Pagination links={siteItems?.links} perPage={perPage} />
              </div>
            </div>
          </div>
        </Card>
        <CSVMapping
          mappingDialog={mappingDialog}
          setMappingDialog={setMappingDialog}
          mappingData={mappingData}
          setBatchId={setBatchId}
        />
      </div>
    </Authenticated>
  );
}
