import React, {
  useEffect,
  useRef,
  useState,
  useMemo,
  useCallback,
} from "react";
import { Head, Link, router } from "@inertiajs/react";
import { Button, Card, IconButton, Typography } from "@material-tailwind/react";
import { PanelRightOpen } from "lucide-react";
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
import { setChangedData, setAddNewRow } from "@/Store/Reducers/TableSlice";
import UploadItem from "@/Components/Wntd/FieldItems/Edit/UploadItem";
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
  hidden_columns_names,
  renamed_columns,
  deleted_columns,
  arrange_columns,
}) {

  const [hideColumnDialog, setHideColumnDialog] = useState(false);
  const gridRef = useRef();
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
  const table_hader_constant = [
    {
      headerName: "LOCID",
      field: "loc_id",
      editable: false,
      cellRenderer: LinkLocId,
      position: 1,
    },
    { headerName: "WNTD", field: "wntd", position: 2 },
    { headerName: "IMSI", field: "imsi", position: 3 },
    { headerName: "VERSION", field: "version", position: 4 },
    { headerName: "AVC", field: "avc", position: 5 },
    { headerName: "BW Profile", field: "bw_profile", position: 6 },
    { headerName: "Lon", field: "lon", position: 7 },
    { headerName: "Lat", field: "lat", position: 8 },
    { headerName: "SiteName", field: "site_name", position: 9 },
    { headerName: "HomeCell", field: "home_cell", position: 10 },
    { headerName: "HomePCI", field: "home_pci", position: 11 },

    {
      headerName: "Traffic Profile",
      field: "traffic_profile",
      position: 12,
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
      filter: false,
      position: 13,
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
      position: 14,
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
      position: 15,
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
      position: 16,
    },
    { headerName: "Remarks", field: "remarks", position: 17 },
    {
      headerName: "Artifacts",
      field: "artifacts",
      cellRenderer: UploadItem,
      editable: false,
      position: 18,
    },
  ];
  function mergeHiddenDeletedColumn(arr1) {
    if (arr1 === null || arr1 === undefined) {
      return [];
    }
    let tempArr1 = [];
    arr1.forEach((itm) => {
      if (itm) {
        tempArr1.push(itm);
      }
    });

    const merged = [...new Set([...tempArr1])];
    return merged;
  }
  const hiddenColumnItems = mergeHiddenDeletedColumn(hidden_columns);
  const dispatch = useDispatch();
  const defaultColDef = useMemo(() => ({
    editable: true,
    filter: true,
  }));
  const { addNewRow } = useSelector((state) => state.table);
  const { role } = auth;

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

  const [tableHeader, setTableHeader] = useState(table_hader_constant);
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
    function get_table_header(additional_columns) {
      const updatedTableHeader = [...table_hader_constant];
    
      const updatedAdditionalTableHeader = additional_columns?.map((item,index) => {
        let tempObj = {};
        if (item?.input_type === "date") {
          tempObj = {
            headerName: item?.name.toUpperCase(),
            field: item?.key,
            position:table_hader_constant.length+index+1,
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
          };
        } else if (item?.input_type === "text") {
          tempObj = { headerName: item?.name.toUpperCase(), field: item?.key ,  position:table_hader_constant.length+index+1, };
        } else if (item?.input_type === "dropdown") {
          tempObj = {
            headerName: item?.name.toUpperCase(),
            field: item?.key,
            position:table_hader_constant.length+index+1,
            cellEditorParams: {
              values: JSON.parse(item?.options),
            },
          };
        }
        return tempObj;
      });

      // const sortByPosition = (a, b) => {
      //     if (a.position !== undefined && b.position !== undefined) {
      //         return a.position - b.position;
      //     } else if (a.position !== undefined) {
      //         return -1;
      //     } else if (b.position !== undefined) {
      //         return 1;
      //     }
      //     return 0;
      // };

      // if (renamed_columns) {
      //     updatedTableHeader.forEach(column => {
      //         const renamedColumn = renamed_columns.find(renamed => renamed.key === column.key);
      //         if (renamedColumn) {
      //             column.name = renamedColumn.name;
      //         }
      //     });
      //     updatedAdditionalTableHeader.forEach(column => {
      //         const renamedColumn = renamed_columns.find(renamed => renamed.key === column.key);
      //         if (renamedColumn) {
      //             column.name = renamedColumn.name;
      //         }
      //     });
      // }

      if (hiddenColumnItems) {
        updatedTableHeader.forEach((column) => {
          const hiddenColumn = hiddenColumnItems.find((hidden) => {
            return column.field === hidden;
          });
          if (hiddenColumn) {
            column.hide = true;
          }  else {
     
            column.hide = false;
          
        }
        });
        updatedAdditionalTableHeader.forEach((column) => {
          const hiddenColumn = hiddenColumnItems.find(
            (hidden) => hidden === column.field
          );
          if (hiddenColumn) {
            column.hide = true;
          } else {
     
              column.hide = false;
            
          }
        });
      }

      // if (arrange_columns) {
      //     updatedTableHeader.forEach(column => {
      //         const arrangedColumn = arrange_columns.find(arranged => arranged.key === column.key);
      //         if (arrangedColumn) {
      //             column.position = arrangedColumn.position;
      //         }
      //     });
      //     updatedAdditionalTableHeader.forEach(column => {
      //         const arrangedColumn = arrange_columns.find(arranged => arranged.key === column.key);
      //         if (arrangedColumn) {
      //             column.position = arrangedColumn.position;
      //         }
      //     });
      // }
      const combinedTableHeader = [...updatedTableHeader, ...updatedAdditionalTableHeader, {
        headerName: "",
        field: "",
        editable: false,
        filter: false,
        cellRenderer: SaveDeleteComponent,
      }];
      // const sortedTableHeader = combinedTableHeader.sort(sortByPosition);
      // return sortedTableHeader
      setTableHeader(combinedTableHeader);
    }
    if (additional_columns?.length > 0) {
      get_table_header(additional_columns);
    }
  }, [additional_columns]);

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

  const onFilterChanged = () => {
    const allColumns = gridRef.current.props?.columnDefs;
    allColumns.forEach((column) => {
      const columnFieldName = column.field; // Get the column field name

      const filterInstanceFilterText =
        gridRef.current.api.getColumnFilterModel(columnFieldName);

      // const filterInstanceId = gridRef.current.api.getColumn(columnFieldName).colId;
      if (filterInstanceFilterText?.filter) {
        router.get(
          route("wireless.sites.index", {
            search: filterInstanceFilterText?.filter,
          })
        );
      }
    });
  };

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
              {role === "super-admin" && (
                <>
                  {/* <div className="import-type-field">
                    <Button
                      onClick={handleClick}
                      variant="gradient"
                      size="sm"
                      className="capitalize rounded text-sm"
                    >
                      Import from CSV
                    </Button>

                    <input
                      type="file"
                      onChange={handleChangeUpload}
                      ref={hiddenFileInput}
                      style={{ display: "none" }}
                    />
                  </div> */}

                  {/* <RestoreTable type={"wntd"} /> */}
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
            {siteItems?.data && siteItems?.data?.length > 0 && (
              <>
                <div className="flex">
                  <div
                    className="ag-theme-quartz w-full" // applying the Data Grid theme
                    style={{ height: 500 }} // the Data Grid will fill the size of the parent container
                  >
                    <AgGridReact
                      ref={gridRef}
                      rowData={siteItems?.data}
                      columnDefs={tableHeader}
                      defaultColDef={defaultColDef}
                      onCellValueChanged={onCellValueChanged}
                      onFilterChanged={onFilterChanged}
                    />
                  </div>
                  <div className="w-[40px]">
                    <div
                      className="border flex justify-center rounded cursor-pointer"
                      onClick={() => setHideColumnDialog(true)}
                    >
                      <p className="column-hide-show py-10 flex gap-2">
                        <PanelRightOpen size={22} /> Columns
                      </p>
                    </div>
                  </div>
                </div>
                {addNewRow && <AddNewRow tableHeader={tableHeader} />}
              </>
            )}
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
            <div className="px-4 flex gap-5">
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
              <ColumnOptions
                columns={tableHeader}
                hidden_columns={hidden_columns}
                deleted_columns={deleted_columns ? deleted_columns : []}
                hideColumnDialog={hideColumnDialog}
                setHideColumnDialog={setHideColumnDialog}
              />
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
