<?php

namespace App\Http\Controllers;

use App\Models\AdditionalColumn;
use App\Models\ColumnOption;
use App\Rules\LowercaseWithUnderscore;
use Illuminate\Http\Request;

class ColumnController extends Controller
{
    public function save_columns(Request $request)
    {
        $request->validate([
            'name' => ['required', 'string', 'max:255'],
            'key' => ['required', new LowercaseWithUnderscore, 'string', 'max:255', 'unique:' . AdditionalColumn::class],
            'input_type' => 'required|string|max:255',
            'options' => 'required_if:input_type,dropdown',
        ]);
        $options = $this->convert_options($request->options);
        $column = AdditionalColumn::create([
            'type' => $request->type,
            'name' => $request->name,
            'key' => str_replace(' ', '_', strtolower($request->key)),
            'input_type' => $request->input_type,
            'options' => $options
        ]);
    }

    public function convert_options($options)
    {
        if ($options) {
            $options_array = explode('|', $options);
            $modified_options = [];
            foreach ($options_array as $option) {
                $modified_options[] = array(
                    'label' => $option,
                    'value' => str_replace(' ', '_', strtolower($option))
                );
            }
            return json_encode($modified_options);
        } else {
            return null;
        }
    }
    public function hide_columns(Request $request)
    {
        $option = ColumnOption::where('type', $request->type)->where('key', $request->key)->first();
        if ($option) {
            $option->update([
                'value' => $request->items ? json_encode($request->items) : null,
                'names' => $request->names ? json_encode($request->names) : null
            ]);
        } else {
            ColumnOption::create([
                'type' => $request->type,
                'key' => $request->key,
                'value' => $request->items ? json_encode($request->items) : null,
                'names' => $request->names ? json_encode($request->names) : null

            ]);
        }
    }

    public function rename_columns(Request $request)
    {
        $option = ColumnOption::where('type', $request->type)->where('key', $request->key)->first();
        if ($option) {
            $option->update([
                'value' => $request->items ? json_encode($request->items) : null
            ]);
        } else {
            ColumnOption::create([
                'type' => $request->type,
                'key' => $request->key,
                'value' => $request->items ? json_encode($request->items) : null
            ]);
        }
    }

    public function delete_columns(Request $request)
    {
        $option = ColumnOption::where('type', $request->type)->where('key', $request->key)->first();
        if ($option) {
            $newItems = array_merge(json_decode($option->value), $request->items);
            $option->update([
                'value' => $request->items ? json_encode($newItems) : null
            ]);
        } else {
            ColumnOption::create([
                'type' => $request->type,
                'key' => $request->key,
                'value' => $request->items ? json_encode($request->items) : null
            ]);
        }
    }
    public function rearrange_columns(Request $request)
    {
        $option = ColumnOption::where('type', $request->type)->where('key', $request->key)->first();
        if ($option) {
            $option->update([
                'value' => $request->items ? json_encode($request->items) : null
            ]);
        } else {
            ColumnOption::create([
                'type' => $request->type,
                'key' => $request->key,
                'value' => $request->items ? json_encode($request->items) : null
            ]);
        }
    }

    public function restore_table(Request $request)
    {
        $all_options = ColumnOption::where('type', $request->table_type)->get();
        foreach ($all_options as $option) {
            $option->delete();
        }
    }
}
