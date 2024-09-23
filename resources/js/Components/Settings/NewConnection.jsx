import React from "react";
import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";
import Checkbox from "@/Components/Checkbox";
import { Head, Link, useForm } from "@inertiajs/react";
import { useState } from "react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Dialog,
  DialogBody,
  DialogFooter,
  DialogHeader,
  Typography,
  Select,
  Option,
} from "@material-tailwind/react";
const NewConnection = ({ openNewConnection, onSetNewConnection }) => {
  const { data, setData, post, processing, errors, reset } = useForm({
    // dbtype: db ? db.dbtype : "",
    // host: db ? db.host : "",
    // port: db ? db.port : "",
    // database: db ? db.database : "",
    // username: db ? db.username : "",
    // password: db ? db.password : "",
  });
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    e.preventDefault();

    post(route("import.db.store"), {
      onSuccess: () => {
        setMessage("Saved Successfully");
        onSetNewConnection();
      },
      onError: (e) => {
        setMessage("Invalid Submit");
      },
    });
  };

  return (
    <Dialog open={openNewConnection} size="xs">
      <DialogHeader>Add New Connection</DialogHeader>
      <DialogBody className="w-full">
        <div className="filter-wrapper px-4 w-full h-[400px] overflow-y-scroll">
          <Card className="w-full shadow-none ">
            <CardBody className="w-full">
              <Typography variant="h5" color="blue-gray" className="mb-2">
                Database Credentials
              </Typography>
              <div className="form-wrapper pt-4">
                <div className="form-field mb-4">
                  <InputLabel value={"DB Type"} className="mb-2" />
                  <Select
                    label="Select db types"
                    onChange={(val) => setData("dbtype", val)}
                    value={data?.dbtype}
                  >
                    <Option value="mysql">mysql</Option>
                    <Option value="pgsql">pgsql</Option>
                    <Option value="starburst">starburst</Option>
                  </Select>
                  <InputError message={errors.dbtype} className="mt-2" />
                </div>
                {data?.dbtype === "starburst" && (
                  <>
                  <div className="form-field mb-4">
                    <InputLabel value={"Catalog"} className="mb-2" />
                    <TextInput
                      className="w-full text-sm"
                      placeholder="catalog..."
                      value={data.catalog}
                      onChange={(e) => setData("catalog", e.target.value)}
                    />
                    <InputError message={errors.host} className="mt-2" />
                  </div>
                        <div className="form-field mb-4">
                        <InputLabel value={"SSL Required"} className="mb-2" />
                        <Checkbox
                   
                          placeholder="catalog..."
                          value={data.sslrequired}
                          onChange={(e) => setData("sslrequired", e.target.checked)}
                        />
                        <InputError message={errors.host} className="mt-2" />
                      </div>
                      </>
                )}
                <div className="form-field mb-4">
                  <InputLabel value={"Host"} className="mb-2" />
                  <TextInput
                    className="w-full text-sm"
                    placeholder="127.0.0.1"
                    value={data.host}
                    onChange={(e) => setData("host", e.target.value)}
                  />
                  <InputError message={errors.host} className="mt-2" />
                </div>
                <div className="form-field mb-4">
                  <InputLabel value={"Port"} className="mb-2" />
                  <TextInput
                    className="w-full text-sm"
                    placeholder="3306"
                    value={data.port}
                    onChange={(e) => setData("port", e.target.value)}
                  />
                  <InputError message={errors.port} className="mt-2" />
                </div>
                <div className="form-field mb-4">
                  <InputLabel value={"DB Name"} className="mb-2" />
                  <TextInput
                    className="w-full text-sm"
                    placeholder="database"
                    value={data.database}
                    onChange={(e) => setData("database", e.target.value)}
                  />
                  <InputError message={errors.database} className="mt-2" />
                </div>
                <div className="form-field mb-4">
                  <InputLabel value={"DB User Name"} className="mb-2" />
                  <TextInput
                    className="w-full text-sm"
                    placeholder="root"
                    value={data.username}
                    onChange={(e) => setData("username", e.target.value)}
                  />
                  <InputError message={errors.username} className="mt-2" />
                </div>
                <div className="form-field mb-4">
                  <InputLabel value={"DB Password"} />
                  <TextInput
                    className="w-full text-sm"
                    placeholder="password"
                    value={data.password}
                    type="password"
                    onChange={(e) => setData("password", e.target.value)}
                  />
                  <InputError message={errors.password} className="mt-2" />
                </div>
              </div>
            </CardBody>
          </Card>
        </div>
      </DialogBody>
      <DialogFooter>
        <CardFooter className="pt-0 w-full text-right  px-0">
          <p className="text-center mb-2">{message}</p>
          <Button variant="gradient" className="text-right" onClick={onSubmit}>
            Save
          </Button>
          <Button
            variant="gradient"
            color="green"
            className="text-right ml-5"
            onClick={onSetNewConnection}
          >
            Cancel
          </Button>
        </CardFooter>
      </DialogFooter>
    </Dialog>
  );
};

export default NewConnection;
