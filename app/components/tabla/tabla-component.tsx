import React from "react";
import { columns } from "./columns";
import { DataTable } from "../data-table/data-table";
import countries from "~/data/country.json";
import timezones from "~/data/timezones.json";
import { Card, CardContent, CardHeader, CardTitle } from "../ui/card";

export default function TablaComponent() {
  return (
    <div className="flex flex-col gap-4">
      <Card className="w-full">
        <CardHeader>
          <CardTitle>Timezones</CardTitle>
        </CardHeader>
        <CardContent>
          <DataTable columns={columns} data={timezones} />
        </CardContent>
      </Card>
    </div>
  );
}
