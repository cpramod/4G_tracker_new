import React, { useEffect, useRef, useState, useMemo } from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { ChevronDownIcon, ChevronUpIcon, SearchIcon } from "lucide-react";
import axios from "axios";
import toast from "react-hot-toast";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import TextInput from "@/Components/TextInput";
import ColumnOptions from "@/Components/Wntd/ColumnOptions/ColumnOptions";
import ExportButton from "@/Components/ExportButton";
import CSVMapping from "@/Components/Wntd/CSVMapping";
import Pagination from "@/Components/Pagination";
import SaveBtn from "@/Components/Wntd/SaveBtn";
import RestoreTable from "@/Components/RestoreTable";
import DeleteButton from "@/Components/Wntd/DeleteButton";
import AddNewRow from "@/Components/Wntd/NewRow/AddNewRow";
import { AgGridReact } from "ag-grid-react";
import "ag-grid-community/styles/ag-grid.css";
import "ag-grid-community/styles/ag-theme-quartz.css";
import { useDispatch, useSelector } from "react-redux";
import { setChangedData ,setAddNewRow} from "@/Store/Reducers/TableSlice";
import UploadItem from "@/Components/FWSites/FieldItems/Edit/UploadItem";

const SaveDeleteComponent = (props) => {
  return (
    <div className="flex gap-5 my-2">
      <SaveBtn {...props} />
      <DeleteButton {...props} />
    </div>
  );
};

const LinkLocId = (props) => {
  return (
    <Link
      href={route("wireless.show.location.index", props?.data?.id)}
      className="font-semibold underline"
    >
      {props?.data?.loc_id}
    </Link>
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
  const dispatch = useDispatch();
  const defaultColDef = useMemo(() => ({
    editable: true,
    filter: true,
  }));
  const {addNewRow}=useSelector(state=>state.table)
  const { role } = auth;


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
  useEffect(() => {
 
    if(sites?.data?.length>0){
 
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
    {
      headerName: "LOCID",
      field: "loc_id",
      editable: false,
      cellRenderer: LinkLocId,

    },
    { headerName: "WNTD", field: "wntd"},
    { headerName: "IMSI", field: "imsi"},
    { headerName: "VERSION", field: "version"},
    { headerName: "AVC", field: "avc"},
    { headerName: "BW Profile", field: "bw_profile"},
    { headerName: "Lon", field: "lon"},
    { headerName: "Lat", field: "lat"},
    { headerName: "SiteName", field: "site_name"},
    { headerName: "HomeCell", field: "home_cell"},
    { headerName: "HomePCI", field: "home_pci"},

    {
      headerName: "Traffic Profile",
      field: "traffic_profile",
    
    },
    {
      headerName: "Start Date",
      field: "start_date",
      input_type:"date",
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
      filter: false,
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
      filter: false,
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
      cellRenderer: UploadItem,
      editable: false,
    
    },
    {
      headerName: "",
      field: "",
      editable: false,
      filter:false,
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
  //   const [siteItems] = useState(sites);
  const [siteItems, setSitesItems] = useState([]);
  const [mappingDialog, setMappingDialog] = useState(false);
  const [mappingData, setMappingData] = useState("");
  const [batchId, setBatchId] = useState(null);
  const [changedItems, setChangedItems] = useState([]);

  useEffect(() => {
    if (changedItems.length > 0) {
      dispatch(setChangedData(changedItems));
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
      const res = await axios.post(route("wireless.sites.import"), form_input);
      if (res?.data) {
        setMappingData(res?.data);
        setMappingDialog(true);
      }
    } catch (error) {
      toast.error(`${error?.response?.data?.error?.message}`);
    }
  };

  const handleSearch = async () => {
    router.get(route("wireless.sites.index", { search: searchText }));
  };


  const handlePerPageChange = (val) => {
    setPerPage(val);
    router.get(route("wireless.sites.index", { ...get_data, per_page: val }));
  };
  useEffect(() => {
    if (batch?.batch_site_id) {
      setBatchId(batch?.batch_site_id);
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
      <Head title="WNTD" />
      <div className="top-section p-4">
        <div className="bg-white shadow rounded py-3 px-5 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="">
              <Typography variant={"h3"} className="tracking-tight">
                WNTD
              </Typography>
              <ul className="flex gap-1 text-gray-600 text-sm">
                <li>
                  <Link href={route("dashboard")}>Dashboard</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={route("wireless.sites.index")}>WNTD</Link>
                </li>
              </ul>
            </div>
          </div>
          <div className="filter-wrapper md:px-4">
            <div className="flex filter-details justify-end gap-2">
              <div className="search-wrapper w-full flex relative">
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
                  <RestoreTable type={"wntd"} />
                </>
              )}
              <ExportButton
                route_name={"wireless.sites.export"}
                file_name={"WNTD_Export"}
              />
            </div>
          </div>
        </div>
      </div>

      <div className="content mt-6">
        <Card className="h-full w-full rounded-none">
          <div className="overflow-x-auto overflow-hidden">
          {siteItems?.data && siteItems?.data?.length > 0 &&<> <div
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
         
                {addNewRow && (
                  <AddNewRow
                    tableHeader={tableHeader}
                
                  />
                )}</>}
              {/* </tbody> */}
            {/* </table>  */}
            {siteItems?.length === 0 && (
              <Typography
                variant="h6"
                color="blue-gray"
                className="text-center py-6"
              >
                No data found
              </Typography>
            )}
          </div>
          <div className="pagination flex justify-between items-center">
            <div className="px-4">
              <Button
                variant="gradient"
                size="sm"
                className="capitalize rounded text-sm"
                onClick={() => {
                  dispatch(setAddNewRow(true));
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
