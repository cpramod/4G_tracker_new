import React, { useState,useMemo, useEffect } from "react";

import { Trash2Icon, User, Network } from "lucide-react";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm ,router} from "@inertiajs/react";
import { useSelector,useDispatch } from 'react-redux';
import toast from 'react-hot-toast'
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
import {setDataBaseChange} from  "@/Store/Reducers/TableSlice";
import NewConnection from "@/Components/Settings/NewConnection";
import { AgGridReact } from "ag-grid-react";
const LinkSql = (props) => {

  return (
    <Link
      href={route("sql.import",props?.data?.id)}
      className="font-semibold underline"
    >
     {props?.data?.host}
    </Link>
  );
};
const SaveDeleteComponent = (props) => {
  const { processing, delete: destroy } = useForm();
  const {databaseChanged}= useSelector(state=>state.table);
  const onDeleteBtnHandler=()=>{
    destroy(route('import.db.delete', props?.data?.id), {
      preserveScroll: true,
  })
  }
  const onEditBtnHandler = async () => {
    if (databaseChanged.length > 0) {
      let toSaveitems = databaseChanged.filter(item => item.id === props.data.id)[0]
  
      if (toSaveitems) {
          // setLoading(true)
          const res = await axios.post(route('import.db.store'), {
            id  : toSaveitems?.items?.id,
            dbtype: toSaveitems?.items?.dbtype,
            host: toSaveitems?.items?.host,
            port: toSaveitems?.items?.port,
            database: toSaveitems?.items?.database,
            username: toSaveitems?.items?.username,
            password: toSaveitems?.items?.password,
            catalog: toSaveitems?.items?.catalog,
          })
      
          if (res?.data?.success) {
              // setLoading(false)
              toast.success(res?.data?.success?.message)
              // setChangedItems(prevItems => prevItems.filter(item => item.site_id !== site_id))
          }
      }

  }
  }

  return (
    <div className="flex gap-5 my-2">
    <Button 
      size="sm"
      className="capitalize py-1 px-2 rounded font-semibold"
      // disabled={!changedItems.some(item => item.site_id === site_id)}
      onClick={() => { onEditBtnHandler() }}
      // loading={loading}
    >
      Edit
    </Button>
    <Button
      variant="gradient"
      color="red"
      size="sm"
      className="capitalize py-1 px-2 rounded"
      onClick={onDeleteBtnHandler}
    >
      <Trash2Icon size={14} />
    </Button>
  </div>
  );
};

export default function Index({ auth, db }) {
  const dispatch=useDispatch();
  const [openNewConnection, setOpenNewConnection] = useState(false);
  const [changedItems, setChangedItems] = useState([]);
  const headerInfo=[
    {
      field:"host",
      headerName:"HOST",
      editable: false,
      cellRenderer:LinkSql
    },
    {
      field:"port",
      headerName:"PORT",
    },
    {
      field:"database",
      headerName:"Database",
    },
    {
      field:"username",
      headerName:"Username",
    },
    {
      field:"dbtype",
      headerName:"Db type",
    },
    {        headerName: "",
    field: "",
    editable: false,
    filter: false,
    cellRenderer: SaveDeleteComponent,}
   
  
  ]
  const defaultColDef = useMemo(() => ({
    flex: 1,
    filter: true,
    editable:true,
  }));


  const onSetNewConnection = () => {
    setOpenNewConnection(!openNewConnection);
  };

  useEffect(() => {
    if (changedItems.length > 0) {
      dispatch(setDataBaseChange(changedItems));
    }
  }, [changedItems]);
  const onCellValueChanged=(event)=>{

    const index = changedItems.findIndex(
      (item) =>
        item.id === event?.data?.id
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
         
          id: event?.data?.id,
          items: {
            ...event?.data,
            [event?.colDef?.field]: event?.value,
          },
        },
      ]);
    }
  }


  return (
    <Authenticated user={auth?.user}>
      <Head title="Wireless Sites" />
      <div className="top-section p-4">
        <div className="bg-white shadow rounded py-3 px-5 flex justify-between items-center">
          <div className="flex items-center justify-between w-full">
            <div className="">
              <Typography variant={"h3"} className="tracking-tight">
                SQL Import
              </Typography>
              <ul className="flex gap-1 text-gray-600 text-sm">
                <li>
                  <Link href={route("dashboard")}>Dashboard</Link>
                </li>
                <li>/</li>
                <li>
                  {/* <Link href={route("sql.import")}>SQL Import</Link> */}
                </li>
              </ul>
            </div>
            <div>
              <Button
                variant="gradient"
                size="sm"
                className="capitalize rounded text-sm"
                onClick={onSetNewConnection}
              >
                New Connection
              </Button>
            </div>
          </div>
        </div>
      </div>
      <div>
        <div
          className="ag-theme-quartz" // applying the Data Grid theme
          style={{ height: db?.length > 5 ? 500 : 200 }} // the Data Grid will fill the size of the parent container
        >
          <AgGridReact
            //   ref={gridRef}
            rowData={db}
            columnDefs={headerInfo}
            defaultColDef={defaultColDef}
            onCellValueChanged={onCellValueChanged}
          />
        </div>
        {/* {db.map((itm, index) => {
          return (
            <div
              key={index}
              className="cursor-pointer w-[80%] max-w-[533px] md:w-[50%] bg-white shadow rounded mx-4 py-3 px-5 flex justify-between items-center mb-3"
            >
              <div>
                <Link href={route("sql.import")}> {itm?.connection_name}</Link>
                <p><User />{itm?.username}</p>
                <p>{itm?.host}</p>
              </div>
              <div className="flex gap-2">
                <Button
                  size="sm"
                  className="capitalize py-1 px-2 rounded font-semibold"
                  // disabled={!changedItems.some(item => item.site_id === site_id)}
                  // onClick={() => { handleSave() }}
                  // loading={loading}
                >
                  Edit
                </Button>
                <Button
                  variant="gradient"
                  color="red"
                  size="sm"
                  className="capitalize py-1 px-2 rounded"
                >
                  <Trash2Icon size={14} />
                </Button>
              </div>
            </div>
          );
        })} */}

        <NewConnection
          openNewConnection={openNewConnection}
          onSetNewConnection={onSetNewConnection}
        />
      </div>
    </Authenticated>
  );
}
