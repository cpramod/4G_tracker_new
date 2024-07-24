<?php

namespace App\Http\Controllers;


use App\Models\Attribute;
use App\Models\Entity;
use App\Models\Value;
use Inertia\Inertia;
use Illuminate\Http\Request;
use Illuminate\Support\Facades\Auth;
use App\Rules\LowercaseWithUnderscore;
use Illuminate\Support\Facades\Validator;
use League\Csv\Reader;

class TableWizardController extends Controller
{
    public function index()
    {
        return Inertia::render('TableWizard/Index');
    }

    public function store(Request $request)
    {
        $request->validate([
            'title' => ['required', 'string', 'max:255'],
            'slug' => ['required', new LowercaseWithUnderscore, 'string', 'unique:' . Entity::class],
        ]);

        $item = Entity::create([
            'title' => $request->title,
            'slug' => str_replace(' ', '_', strtolower($request->slug)),
            'user_id' => Auth::id(),
        ]);
        if ($item) {
            return to_route('table.wizard.column.index', $item->id);
        }
    }

    public function column_index($id)
    {
        $table = Entity::findOrFail($id);
        return Inertia::render('TableWizard/ColumnIndex', [
            'table' => $table
        ]);
    }

    public function column_store(Request $request)
    {
        $request->validate([
            'items.*.name' => ['required', 'string', 'max:255'],
            'items.*.slug' => ['required', new LowercaseWithUnderscore, 'unique:' . Attribute::class],
            'items.*.input_type' => ['required_if:items.*.editable,true'],
            'items.*.options' => ['required_if:items.*.input_type,dropdown'],
        ], [
            'items.*.name.required' => 'The name field is required.',
            'items.*.slug.required' => 'The slug field is required.',
            'items.*.slug.unique' => 'The slug field must be unique.',
            'items.*.input_type.required_if' => 'This field is required.',
            'items.*.options.required_if' => 'This field is required.',
        ]);
        foreach ($request->items as $item) {
            Attribute::create([
                'entity_id' => $request->table_id,
                'name' => $item['name'],
                'slug' => $item['slug'],
                'type' => 'main',
                'sortable' => $item['sortable'],
                'position' => $item['position'],
                'editable' => $item['editable'],
                'input_type' => $item['input_type'],
                'input_options' => json_encode($item['options']),
                'user_id' => Auth::id(),
            ]);
        }

        return to_route('view.table.item', $request->table_slug);
    }

    public function view_table_item($slug)
    {
        $table = Entity::with([
            'attributes' => function ($query) {
                $query->orderBy('position', 'asc');
            },
            'values' => function ($query) {
                $query->select('id', 'entity_id', 'values');
            }
        ])->where('slug', $slug)->firstOrFail();
        return Inertia::render('TableWizard/ViewTableItem', [
            'entity' => $table
        ]);
    }

    public function import_from_csv(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_file' => 'required|file|mimes:csv',
        ]);
        if ($validator->fails()) {
            return response()->json(['error' => array('message' => $validator->errors()->first())], 500);
        }
        $file = $request->file('import_file');
        $filePath = $file->storeAs('import', now()->timestamp . "_{$file->getClientOriginalName()}");
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        $header = $csv->getHeader();
        return response()->json([
            'filePath' => $filePath,
            'header' => $header
        ], 200);
    }

    public function map_and_save_csv(Request $request)
    {
        $filePath = $request->input('file_path');
        $inputColumns = $request->all();
        $csv = Reader::createFromPath(storage_path('app/' . $filePath), 'r');
        $csv->setHeaderOffset(0);
        $rows = $csv->getRecords();
        foreach ($rows as $rowKey => $row) {
            $rowItem = [];
            foreach ($inputColumns as $columnKey => $column) {
                foreach ($row as $key => $value) {
                    if ($key === $column) {
                        $rowItem[] = array($columnKey => $value);
                    }
                }
            }
            Value::create([
                'entity_id' => $request->input('entity_id'),
                'values' => json_encode(array_values($rowItem)),
            ]);
        }
        return response()->json([
            'success' => ['message' => 'Data imported successfully.'],
        ], 200);
    }

    public function add_column(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'slug' => ['required', new LowercaseWithUnderscore, 'string', 'unique:' . Attribute::class],
            'input_type' => ['required_if:editable,true'],
            'options' => ['required_if:input_type,dropdown'],
        ]);
        $attributesCount = Attribute::where('entity_id', $request->entity_id)->count();
        $attribue = Attribute::create([
            'entity_id' => $request->entity_id,
            'name' => $request->name,
            'slug' => $request->slug,
            'type' => 'additional',
            'sortable' => $request->sortable,
            'position' => $attributesCount + 1,
            'editable' => $request->editable,
            'input_type' => $request->input_type,
            'input_options' => json_encode($request->options),
            'user_id' => Auth::id(),
        ]);
    }

    public function hide_column(Request $request)
    {
        $items = $request->items;
        $unHiddenItems = $request->unHiddenItems;

        if (count($items) > 0) {
            foreach ($items as $item) {
                $arrtibute = Attribute::where('id', $item)->first();
                $arrtibute->hidden = true;
                $arrtibute->update();
            }
        }
        if (count($unHiddenItems) > 0) {
            foreach ($unHiddenItems as $unHiddenItem) {
                $arrtibute = Attribute::where('id', $unHiddenItem)->first();
                $arrtibute->hidden = false;
                $arrtibute->update();
            }
        }
    }

    public function rename_column(Request $request)
    {
        $items = $request->items;
        if (is_array($items)) {
            foreach ($items as $item) {
                $arrtibute = Attribute::where('id', $item['id'])->first();
                $arrtibute->alternative_name = $item['name'];
                $arrtibute->update();
            }
        }
    }

    public function delete_column(Request $request)
    {
        $items = $request->items;
        if (is_array($items)) {
            foreach ($items as $item) {
                $arrtibute = Attribute::where('id', $item)->first();
                $arrtibute->delete();
            }
        }
    }

    public function delete_row($id)
    {
        $value = Value::findOrFail($id);
        $value->delete();
    }

    public function rearrange_column(Request $request)
    {
        $items = $request->items;
        if (is_array($items)) {
            foreach ($items as $item) {
                $arrtibute = Attribute::where('slug', $item['slug'])->first();
                $arrtibute->position = $item['position'];
                $arrtibute->update();
            }
        }
    }

    public function restore_column(Request $request)
    {
        // $entity_id = $request->entity_id;
        // $attributes = Attribute::where('entity_id', $entity_id)->get();
        // foreach ($attributes as $attribute) {
        //     $attribute->hidden = false;
        //     $attribute->alternative_name = null;
        //     $attribute->update();
        // }
    }

    // public function export_column($id)
    // {
    //     dd($id);
    // }

    public function delete_table($id)
    {
        $entity = Entity::findOrFail($id);
        $entity->delete();
        return to_route('dashboard');
    }
}
