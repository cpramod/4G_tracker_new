<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;
use App\Services\FreqTuningService;

class MoFileGeneratorController extends Controller
{
    protected $freqTuningService;

    public function __construct(FreqTuningService $freqTuningService)
    {
        $this->freqTuningService = $freqTuningService;
    }

    public function index()
    {
        return Inertia::render('FileGenerator/Index');
    }

    public function upload(Request $request)
    {
        $validator = Validator::make($request->all(), [
            'import_file' => 'required|mimes:xlsx',
        ]);

        if ($validator->fails()) {
            return response()->json(['error' => ['message' => $validator->errors()->first()]], 500);
        }

        $file = $request->file('import_file');
        $fileName = now()->timestamp . "_{$file->getClientOriginalName()}";
        $filePath = $file->storeAs('public/generator', $fileName);
        $absolutePath = storage_path('app/' . $filePath);

        $response = $this->freqTuningService->generateScript($absolutePath);
        unlink($absolutePath);
        return $response;
    }
}
