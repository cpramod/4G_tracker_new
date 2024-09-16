import InputError from "@/Components/InputError";
import InputLabel from "@/Components/InputLabel";
import TextInput from "@/Components/TextInput";

import Authenticated from "@/Layouts/AuthenticatedLayout";
import { Head, Link, useForm } from "@inertiajs/react";
import {
  Button,
  Card,
  CardBody,
  CardFooter,
  CardHeader,
  Typography,
  Select,
  Option
} from "@material-tailwind/react";
import React, { useState } from "react";

export default function Index({ auth, db }) {
  const { data, setData, post, processing, errors, reset } = useForm({
    dbtype: db ? db.dbtype : "",
    host: db ? db.host : "",
    port: db ? db.port : "",
    database: db ? db.database : "",
    username: db ? db.username : "",
    password: db ? db.password : "",
  });
  const [message, setMessage] = useState("");

  const onSubmit = (e) => {
    console.log(data);
    e.preventDefault();
    post(route("import.db.store"), {
      onSuccess: () => {
        setMessage("Saved Successfully");
      },
      onError: () => {
        setMessage("Something went wrong");
      },
    });
  };

  return (
    <Authenticated user={auth?.user}>
      <Head title="Wireless Sites" />
      <div className="top-section p-4">
        <div className="bg-white shadow rounded py-3 px-5 flex justify-between items-center">
          <div className="flex items-center justify-between">
            <div className="">
              <Typography variant={"h3"} className="tracking-tight">
                Settings
              </Typography>
              <ul className="flex gap-1 text-gray-600 text-sm">
                <li>
                  <Link href={route("dashboard")}>Dashboard</Link>
                </li>
                <li>/</li>
                <li>
                  <Link href={route("settings.index")}>Settings</Link>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </div>
      <div className="filter-wrapper px-4">
        <Card className="mt-6 mb-6 w-full xl:w-1/4">
          <CardBody>
            <Typography variant="h5" color="blue-gray" className="mb-2">
              Database Credentials
            </Typography>
            <div className="form-wrapper pt-4">
              <div className="form-field mb-4">
                <InputLabel value={"DB Type"} className="mb-2" />
                <Select label="Select db types"
                     onChange={(val) => setData("dbtype", val)}
                     value={data?.dbtype}
                >
                  <Option value='mysql'>mysql</Option>
                  <Option value="pgsql">pgsql</Option>
                </Select>
                <InputError message={errors.host} className="mt-2" />
              </div>
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
              <CardFooter className="pt-0 text-right px-0 py-4">
                <Button variant="gradient" onClick={onSubmit}>
                  Save
                </Button>
              </CardFooter>
              {message}
            </div>
          </CardBody>
        </Card>
      </div>
    </Authenticated>
  );
}
