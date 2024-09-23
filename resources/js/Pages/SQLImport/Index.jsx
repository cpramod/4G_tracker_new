import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm,usePage } from "@inertiajs/react";
import { Button, Card, Typography, useSelect } from "@material-tailwind/react";
import axios from "axios";
import React, { useEffect, useState, useMemo } from "react";
import { Table2, ChevronRight, ChevronDown, Play } from "lucide-react";
import { AgGridReact } from "ag-grid-react";
import DbTableColumns from "@/Components/Wntd/DbTableColumns";

export default function Index({
  auth,
  tablesNames,
  columnsName,
  dbtype
}) {
  console.log(dbtype)
  const { props } = usePage();
  const [query, setQuery] = useState();
  const [tablesList, setTablesList] = useState([]);
  const [columnsList, setColumnsList] = useState([]);
  const [columnsListByTable, setColumnsListByTable] = useState([]);
  const [isTableSelect, setIsTableSelect] = useState(true);
  const [selectedTableName, setSelectedTableName] = useState({});
  const [errorMsg, setErrorMsg] = useState("");
  const [response, setResponse] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isImporting, setIsImporting] = useState(false);
  const [importErrorMsg, setImportErrorMsg] = useState("");
  const [importSuccessMsg, setImportSuccessMsg] = useState("");

  const getSampleDAta = (data) => {
    if (typeof data === "string") {
      let newTableName = data.replace("Password: ", "");
    
      // Split the data by commas
      const dataArray = newTableName.split("\n");
      let tempObj = [];
      let tempSecondVAlue = [];
      dataArray.forEach((itm) => {
        // return itm.replace(/\\/g, 'a');
        tempObj.push(itm.split(/,(?=\")/));
      });
      return tempObj;
    }
  };

  useEffect(() => {
    let customTablesNames = [];

    let customColumnsName = [];
    if (
      typeof tablesNames === "string" ||

      typeof columnsName === "string"
    ) {
      customTablesNames = getSampleDAta(tablesNames);

      customColumnsName = getSampleDAta(columnsName);
   
      let tableColumns = {};

      customColumnsName.forEach((row) => {
        const [table, column,data_type] = row;
        if (table) {
          if (!tableColumns[table]) {
            tableColumns[table] = [];
          }
          // Push the column to the corresponding table array
          tableColumns[table].push({column_name:column,data_type:data_type});
        }
      });

        setColumnsList(
            tableColumns
        );
      
      setTablesList(customTablesNames);
    } else {
      setTablesList(tablesNames);
 
        setColumnsList(columnsName);
    }

  }, [tablesNames, columnsName]);
  // useEffect(()=>{
  //     if(typeof tablesNames==='string'){
  //         let newTableName=tablesNames.replace('Password:','');

  //         // Split the data by commas
  //         const dataArray = newTableName.split('\n');
  //         let tempObj=[];
  //         let tempSecondVAlue=[];
  //      dataArray.forEach((itm)=>{
  //             // return itm.replace(/\\/g, 'a');
  //             tempObj.push(itm.split(','));
  //         })
  //         console.log(tempObj);
  //     }

  // },[tablesNames])
  const onSubmit = async (e) => {
    e && e.preventDefault();
    try {
      setIsLoading(true);
      const res = await axios.post(route("sql.run"), { sql_query: query?.query,id:props?.ziggy?.location.split('/').pop(),table_name:query.tablename });
        if(typeof res?.data?.data==='string'){
            let columnData = getSampleDAta(res?.data?.data);
            let columnNameData = getSampleDAta(res?.data?.data_column);
          
            let tempObj = {};
            let mainArray=[];
            columnData.forEach((itm)=>{
                itm.forEach((value,index)=>{
                  
                    if(value){
                        if(columnNameData[index]){

                       
                        if(columnNameData[index][0]){
                         

                                tempObj[removeQuote(columnNameData[index][0])]=removeQuote(value);

                        }
                    }
                    }
                })
                mainArray.push(tempObj);
                tempObj={};
            })
            mainArray= mainArray.filter((itm)=>{
              return  Object.keys(itm).length !== 0
            })
            setResponse(mainArray);
        }
        else{

            setResponse(res?.data?.data);
        }
      setErrorMsg("");
    } catch (err) {
   
      setErrorMsg(err?.response?.data?.error.message);
      setResponse([]);
    } finally {
      setIsLoading(false);
      setIsTableSelect(false);
    }
  };

  useEffect(() => {
    if (isTableSelect) {
      onSubmit();
    }
  }, [isTableSelect]);
  const handleImportBtn = async () => {
    if (response?.length > 0) {
      try {
        setIsImporting(true);
        const res = await axios.post(route("sql.store"), { data: response });
        setImportSuccessMsg(res?.data?.success.message);
      } catch (err) {
        setImportErrorMsg(err?.response?.data?.error.message);
      } finally {
        setIsImporting(false);
      }
    }
  };
  const defaultColDef = useMemo(() => ({
    filter: true,
  }));

  const onHandleRunSql = (e, tablename) => {
    e.stopPropagation();
    let tempSelectedTableName = {};
    tempSelectedTableName[tablename] = true;

    setSelectedTableName(tempSelectedTableName);

    setQuery({tablename:removeQuote(tablename),query:`select * from ${removeQuote(tablename)}`});
    setIsTableSelect(true);
  };
  const onHandleSelectTable = (e, tablename) => {
  
    e.stopPropagation();
    const tempSelectedTableName = { ...selectedTableName };
    if (tempSelectedTableName[tablename]) {
      tempSelectedTableName[tablename] = !tempSelectedTableName[tablename];
    } else {
      tempSelectedTableName[tablename] = true;
    }
    setSelectedTableName(tempSelectedTableName);
  };
  const removeQuote=(data)=>{
   
    if(data.includes('"')){
      return data.replace(/"/g, '');
    }
    return data;
  }

  const ShowResponse = ({ data }) => {
  
    if (data?.length > 0) { 
      const allKeys = Array.from(
        new Set(data.flatMap((item) => Object.keys(item)))
      );
      const changedData = allKeys.map((itm, index) => {
        return { field: itm, headerName: itm };
      });
     
      return (
        <div className="mt-8">
          <div
            className="ag-theme-quartz w-full" // applying the Data Grid theme
            style={{ height: data?.length > 5 ? 500 : 200 }} // the Data Grid will fill the size of the parent container
          >
            <AgGridReact
              //   ref={gridRef}
              rowData={data}
              columnDefs={changedData}
              defaultColDef={defaultColDef}
            />
          </div>
          <div className="flex justify-between mt-6 mb-8">
            <div className="">
              <InputError
                message={importErrorMsg}
                className="mt-0 font-medium text-red-500"
              />
              {importSuccessMsg && (
                <Typography className="font-medium text-green-500">
                  {importSuccessMsg}
                  <Link
                    href={route("wireless.sites.index")}
                    className="ps-1 underline"
                  >
                    Click here to check
                  </Link>
                </Typography>
              )}
            </div>
            <Button
              variant="gradient"
              size="sm"
              className="capitalize"
              onClick={handleImportBtn}
              disabled={isImporting}
            >
              Import Data
            </Button>
          </div>
        </div>
      );
    }
  };

  return (
    <Authenticated user={auth?.user}>
      <Head title="Wireless Sites" />
      <div className="top-section p-4">
        <div className="bg-white shadow rounded py-3 px-5 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="">
              <Typography variant={"h3"} className="tracking-tight">
                SQL Import
              </Typography>
              <ul className="flex gap-1 text-gray-600 text-sm">
                <li>
                  <Link href={route("dashboard")}>Dashboard</Link>
                </li>
                <li>/</li>
                {/* <li><Link href={route('sql.import')}>SQL Import</Link></li> */}
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="flex w-full mt-6 ">
        <div className=" ml-2">
          <div className=" bg-white shadow rounded py-3 px-5">
            <h1 className="mb-2 text-xl font-bold">Tables</h1>
            <div className="">
              <ul>
                {tablesList.map((itm, index) => {
                  let whichOne= dbtype==='starburst'?itm[0]: itm;
           
                  return (
                    <>
                    { whichOne ?
                    <div key={itm} className="">
                      <div
                        className="font-medium text-sm flex justify-between items-center mb-1 cursor-pointer text-gray-700 dark:text-gray-300 gap-2"
                        onClick={(e) => onHandleSelectTable(e, typeof itm==='string'? itm:itm[0])}
                      >
                        <div className="flex items-center gap-2">
                          {selectedTableName[ typeof itm==='string'? itm:itm[0]] ? (
                            <ChevronDown size="16" />
                          ) : (
                            <ChevronRight size="16" />
                          )}
                          <Table2 size="16" />
                          {removeQuote( typeof itm==='string'? itm:itm[0])}
                        </div>
                        <div title="play">
                          <Play
                            size={12}
                            fill="#000"
                            onClick={(e) => onHandleRunSql(e,  typeof itm==='string'? itm:itm[0])}
                          />
                        </div>
                      </div>
                      {selectedTableName[typeof itm==='string'? itm:itm[0]] && (
                        <DbTableColumns columnsByTable={columnsList[typeof itm==='string'? itm:itm[0]]} />
                      )}
                    </div>:null
                    }
                    </>
                  );
                })}
              </ul>
            </div>
          </div>
        </div>
        <div className="w-[90%] filter-wrapper px-4">
          <Card className="w-full px-6 py-4">
            <InputLabel value={"SQl Code"} className="mb-2" />
            <textarea
              className="border rounded-md border-gray-300 text-base font-medium focus:ring-0"
              rows={3}
              value={query?.query}
              onChange={(e) => setQuery({tablename:removeQuote(e.target.value.split(' ').pop()),query:e.target.value})}
            />

            <div className="flex justify-between">
              <div>
                <InputError
                  message={errorMsg}
                  className="mt-0 font-medium text-red-500"
                />
              </div>
              <Button
                className="mt-4 block capitalize"
                onClick={onSubmit}
                disabled={isLoading}
              >
                Run
              </Button>
            </div>
          </Card>
          <ShowResponse data={response} />
        </div>
      </div>
    </Authenticated>
  );
}
