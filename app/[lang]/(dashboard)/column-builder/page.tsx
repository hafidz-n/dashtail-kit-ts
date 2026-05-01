"use client";
import React, { useState } from "react";
import { Breadcrumbs, BreadcrumbItem } from "@/components/ui/breadcrumbs";
import { Card, CardContent, CardFooter, CardHeader, CardTitle } from "@/components/ui/card";
import { Button } from "@/components/ui/button";
import { Input } from "@/components/ui/input";
import { Label } from "@/components/ui/label";
import {
  Select,
  SelectContent,
  SelectItem,
  SelectTrigger,
  SelectValue,
} from "@/components/ui/select";
import { Badge } from "@/components/ui/badge";
import { Switch } from "@/components/ui/switch";
import {
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableHeader,
  TableRow,
} from "@/components/ui/table";
import {
  DndContext,
  useSensor,
  useSensors,
  PointerSensor,
  closestCenter,
} from "@dnd-kit/core";
import {
  SortableContext,
  arrayMove,
  useSortable,
  verticalListSortingStrategy,
} from "@dnd-kit/sortable";
import { CSS } from "@dnd-kit/utilities";
import { Icon } from "@iconify/react";
import { Grip, Plus, Trash2, Eye, EyeOff } from "lucide-react";

const COLUMN_TYPES = ["text", "number", "date", "boolean", "email", "badge"];

const MOCK_DATA = [
  { id: 1, name: "Alice Johnson", email: "alice@example.com", age: 28, status: "Active", joined: "2024-01-15", verified: true },
  { id: 2, name: "Bob Smith", email: "bob@example.com", age: 34, status: "Inactive", joined: "2023-11-08", verified: false },
  { id: 3, name: "Carol White", email: "carol@example.com", age: 22, status: "Pending", joined: "2024-03-22", verified: true },
  { id: 4, name: "David Lee", email: "david@example.com", age: 41, status: "Active", joined: "2022-07-01", verified: true },
  { id: 5, name: "Emma Brown", email: "emma@example.com", age: 30, status: "Active", joined: "2023-05-19", verified: false },
];

const DATA_FIELDS = ["id", "name", "email", "age", "status", "joined", "verified"];

type Column = {
  id: string;
  label: string;
  field: string;
  type: string;
  sortable: boolean;
  visible: boolean;
};

const DEFAULT_COLUMNS: Column[] = [
  { id: "col-1", label: "Name", field: "name", type: "text", sortable: true, visible: true },
  { id: "col-2", label: "Email", field: "email", type: "email", sortable: false, visible: true },
  { id: "col-3", label: "Age", field: "age", type: "number", sortable: true, visible: true },
  { id: "col-4", label: "Status", field: "status", type: "badge", sortable: false, visible: true },
];

const TYPE_COLOR: Record<string, string> = {
  text: "secondary",
  number: "info",
  date: "warning",
  boolean: "success",
  email: "primary",
  badge: "destructive",
};

const STATUS_COLOR: Record<string, string> = {
  Active: "success",
  Inactive: "destructive",
  Pending: "warning",
};

function SortableColumnItem({ column, onToggleVisible, onDelete, onLabelChange }: any) {
  const { attributes, listeners, setNodeRef, transform, transition } =
    useSortable({ id: column.id });

  return (
    <div
      ref={setNodeRef}
      style={{ transform: CSS.Transform.toString(transform), transition }}
      className={`flex items-center gap-3 pl-3 pr-2 py-2.5 rounded-md border border-default-200 bg-background hover:bg-default-50 transition-colors ${!column.visible ? "opacity-50" : ""}`}
    >
      {/* drag handle */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="h-5 w-5 flex-none cursor-move text-default-400 hover:text-default-600"
        {...attributes}
        {...listeners}
      >
        <Grip className="w-3.5 h-3.5" />
      </Button>

      {/* label + meta */}
      <div className="flex-1 min-w-0">
        <Input
          size="sm"
          value={column.label}
          onChange={(e: any) => onLabelChange(column.id, e.target.value)}
          className="h-7 text-sm font-medium text-default-800 border-transparent hover:border-default-300 focus:border-primary bg-transparent"
        />
        <div className="flex items-center gap-1.5 mt-0.5 pl-3">
          <span className="text-xs text-default-400">{column.field}</span>
          <span className="text-default-300">·</span>
          <Badge color={TYPE_COLOR[column.type] || "secondary"} variant="soft" className="text-[10px] px-1.5 py-0 h-4">
            {column.type}
          </Badge>
        </div>
      </div>

      {/* visibility toggle */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        className="h-7 w-7 flex-none text-default-400 hover:text-default-600"
        onClick={() => onToggleVisible(column.id)}
      >
        {column.visible
          ? <Eye className="w-3.5 h-3.5" />
          : <EyeOff className="w-3.5 h-3.5" />
        }
      </Button>

      {/* delete */}
      <Button
        type="button"
        size="icon"
        variant="ghost"
        color="destructive"
        className="h-7 w-7 flex-none"
        onClick={() => onDelete(column.id)}
      >
        <Trash2 className="w-3.5 h-3.5" />
      </Button>
    </div>
  );
}

function CellValue({ value, type }: { value: any; type: string }) {
  if (type === "boolean") {
    return <Switch checked={Boolean(value)} disabled size="sm" color={value ? "success" : "secondary"} />;
  }
  if (type === "badge") {
    return (
      <Badge color={STATUS_COLOR[String(value)] || "secondary"} variant="soft" className="capitalize">
        {String(value)}
      </Badge>
    );
  }
  return <span className="text-sm font-medium text-default-600">{String(value ?? "—")}</span>;
}

const ColumnBuilderPage = () => {
  const [columns, setColumns] = useState<Column[]>(DEFAULT_COLUMNS);
  const [newLabel, setNewLabel] = useState("");
  const [newField, setNewField] = useState("name");
  const [newType, setNewType] = useState("text");
  const [newSortable, setNewSortable] = useState(false);

  const sensors = useSensors(useSensor(PointerSensor));

  const handleDragEnd = (event: any) => {
    const { active, over } = event;
    if (active.id !== over?.id) {
      setColumns((prev: Column[]) => {
        const oldIndex = prev.findIndex((c: Column) => c.id === active.id);
        const newIndex = prev.findIndex((c: Column) => c.id === over.id);
        return arrayMove(prev, oldIndex, newIndex);
      });
    }
  };

  const addColumn = () => {
    if (!newLabel.trim()) return;
    setColumns((prev: Column[]) => [
      ...prev,
      { id: `col-${Date.now()}`, label: newLabel.trim(), field: newField, type: newType, sortable: newSortable, visible: true },
    ]);
    setNewLabel("");
    setNewField("name");
    setNewType("text");
    setNewSortable(false);
  };

  const toggleVisible = (id: string) =>
    setColumns((prev: Column[]) => prev.map((c: Column) => (c.id === id ? { ...c, visible: !c.visible } : c)));

  const deleteColumn = (id: string) =>
    setColumns((prev: Column[]) => prev.filter((c: Column) => c.id !== id));

  const updateLabel = (id: string, label: string) =>
    setColumns((prev: Column[]) => prev.map((c: Column) => (c.id === id ? { ...c, label } : c)));

  const visibleColumns = columns.filter((c: Column) => c.visible);

  return (
    <div className="space-y-5">
      <Breadcrumbs>
        <BreadcrumbItem>Pages</BreadcrumbItem>
        <BreadcrumbItem className="text-primary">Column Builder</BreadcrumbItem>
      </Breadcrumbs>

      <div className="grid grid-cols-1 xl:grid-cols-3 gap-5">

        {/* ── Left: config panel ─────────────────────────────── */}
        <div className="xl:col-span-1 space-y-5">

          {/* Add column form */}
          <Card>
            <CardHeader className="flex-row items-center border-none mb-0 pb-0 pt-6 px-6">
              <div className="flex-1">
                <CardTitle>Add Column</CardTitle>
                <div className="text-sm font-medium text-default-500 mt-0.5">
                  Define a new column for the table
                </div>
              </div>
            </CardHeader>
            <CardContent className="px-6 pt-5 space-y-4">
              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-default-700" htmlFor="col-label">
                  Column Label
                </Label>
                <Input
                  id="col-label"
                  size="lg"
                  placeholder="e.g. Full Name"
                  value={newLabel}
                  onChange={(e: any) => setNewLabel(e.target.value)}
                  onKeyDown={(e: any) => e.key === "Enter" && addColumn()}
                />
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-default-700" htmlFor="col-field">
                  Data Field
                </Label>
                <Select value={newField} onValueChange={setNewField}>
                  <SelectTrigger id="col-field" size="lg">
                    <SelectValue placeholder="Select field" />
                  </SelectTrigger>
                  <SelectContent>
                    {DATA_FIELDS.map((f) => (
                      <SelectItem key={f} value={f}>{f}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="space-y-1.5">
                <Label className="text-sm font-medium text-default-700" htmlFor="col-type">
                  Column Type
                </Label>
                <Select value={newType} onValueChange={setNewType}>
                  <SelectTrigger id="col-type" size="lg">
                    <SelectValue placeholder="Select type" />
                  </SelectTrigger>
                  <SelectContent>
                    {COLUMN_TYPES.map((t) => (
                      <SelectItem key={t} value={t} className="capitalize">{t}</SelectItem>
                    ))}
                  </SelectContent>
                </Select>
              </div>

              <div className="flex items-center gap-3 pt-1">
                <Switch id="col-sortable" checked={newSortable} onCheckedChange={setNewSortable} />
                <Label htmlFor="col-sortable" className="text-sm font-medium text-default-700 cursor-pointer">
                  Sortable column
                </Label>
              </div>
            </CardContent>
            <CardFooter className="px-6 pb-6 gap-3">
              <Button className="flex-1" onClick={addColumn} disabled={!newLabel.trim()}>
                <Plus className="w-4 h-4 ltr:mr-2 rtl:ml-2" />
                Add Column
              </Button>
              <Button
                color="secondary"
                onClick={() => { setNewLabel(""); setNewField("name"); setNewType("text"); setNewSortable(false); }}
              >
                Clear
              </Button>
            </CardFooter>
          </Card>

          {/* Columns list */}
          <Card>
            <CardHeader className="flex-row justify-between items-center mb-0 border-none pt-6 px-6">
              <div>
                <CardTitle>Columns</CardTitle>
                <div className="text-sm font-medium text-default-500 mt-0.5">
                  Drag to reorder
                </div>
              </div>
              <Badge color="secondary" variant="soft">
                {visibleColumns.length}/{columns.length} visible
              </Badge>
            </CardHeader>

            <CardContent className="px-6 pt-3">
              {columns.length === 0 ? (
                <div className="flex flex-col items-center justify-center py-10 gap-2">
                  <Icon icon="heroicons:table-cells" className="w-8 h-8 text-default-300" />
                  <p className="text-sm font-medium text-default-400">No columns yet. Add one above.</p>
                </div>
              ) : (
                <DndContext sensors={sensors} collisionDetection={closestCenter} onDragEnd={handleDragEnd}>
                  <SortableContext items={columns.map((c: Column) => c.id)} strategy={verticalListSortingStrategy}>
                    <div className="space-y-2">
                      {columns.map((col: Column) => (
                        <SortableColumnItem
                          key={col.id}
                          column={col}
                          onToggleVisible={toggleVisible}
                          onDelete={deleteColumn}
                          onLabelChange={updateLabel}
                        />
                      ))}
                    </div>
                  </SortableContext>
                </DndContext>
              )}
            </CardContent>

            {columns.length > 0 && (
              <CardFooter className="px-6 pb-6 pt-0 border-t border-default-100 mt-2">
                <Button
                  variant="outline"
                  color="destructive"
                  size="sm"
                  className="w-full mt-4"
                  onClick={() => setColumns(DEFAULT_COLUMNS)}
                >
                  Reset to Default
                </Button>
              </CardFooter>
            )}
          </Card>
        </div>

        {/* ── Right: live table preview ───────────────────────── */}
        <div className="xl:col-span-2">
          <Card>
            <CardHeader className="flex-row justify-between items-center mb-0 border-none pt-6 px-6">
              <div>
                <CardTitle>Table Preview</CardTitle>
                <div className="text-sm font-medium text-default-500 mt-0.5">
                  Updates live as you configure columns
                </div>
              </div>
              <Badge color="info" variant="soft">
                {MOCK_DATA.length} rows · {visibleColumns.length} col{visibleColumns.length !== 1 ? "s" : ""}
              </Badge>
            </CardHeader>

            <CardContent className="px-0 pb-0 overflow-x-auto">
              {visibleColumns.length === 0 ? (
                <div className="flex flex-col items-center justify-center h-52 gap-3">
                  <Icon icon="heroicons:table-cells" className="w-10 h-10 text-default-300" />
                  <p className="text-sm font-medium text-default-400">
                    No visible columns — toggle visibility or add a column.
                  </p>
                </div>
              ) : (
                <Table>
                  <TableHeader className="bg-default-200">
                    <TableRow>
                      {visibleColumns.map((col: Column) => (
                        <TableHead
                          key={col.id}
                          className="text-sm font-semibold text-default-800 whitespace-nowrap h-12"
                        >
                          {col.label}
                          {col.sortable && (
                            <Icon
                              icon="heroicons:arrows-up-down"
                              className="inline-block w-3.5 h-3.5 ltr:ml-1 rtl:mr-1 text-default-400"
                            />
                          )}
                        </TableHead>
                      ))}
                    </TableRow>
                  </TableHeader>
                  <TableBody>
                    {MOCK_DATA.map((row) => (
                      <TableRow key={row.id} className="hover:bg-default-100">
                        {visibleColumns.map((col: Column) => (
                          <TableCell
                            key={col.id}
                            className="text-sm font-medium text-default-600 py-2"
                          >
                            <CellValue value={(row as any)[col.field]} type={col.type} />
                          </TableCell>
                        ))}
                      </TableRow>
                    ))}
                  </TableBody>
                </Table>
              )}
            </CardContent>
          </Card>
        </div>

      </div>
    </div>
  );
};

export default ColumnBuilderPage;
