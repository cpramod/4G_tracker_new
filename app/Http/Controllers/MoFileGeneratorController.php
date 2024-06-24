<?php

namespace App\Http\Controllers;

use Illuminate\Http\Request;
use Illuminate\Support\Facades\Storage;
use Illuminate\Support\Facades\Validator;
use Inertia\Inertia;

class MoFileGeneratorController extends Controller
{
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
            return response()->json(['error' => array('message' => $validator->errors()->first())], 500);
        }
        $file = $request->file('import_file');
        $fileName = now()->timestamp . "_{$file->getClientOriginalName()}";
        $filePath = $file->storeAs('generator', $fileName);
        $absolutePath = storage_path('app/' . $filePath);
        $response = $this->runPythonScript($absolutePath);
        return $response;

    }
    // public function runPythonScript($filePath)
    // {
    //     $scriptPath = storage_path('python/enm_script_generator.py ' . $filePath);
    //     $venvActivatePath = storage_path('python/venv/bin/activate'); // For macOS/Linux
    //     $command = "source $venvActivatePath && python $scriptPath";
    //     $output = shell_exec($command);
    //     $filePaths = json_decode($output, true);
    //     $filePathsWithUrl = [];
    //     if (is_array($filePaths)) {
    //         foreach ($filePaths['filePaths'] as $value) {
    //             $filePathsWithUrl[] = url('/') . '/' . $value;
    //         }
    //     }
    //     return response()->json([
    //         'output' => $filePaths ? array('filePaths' => $filePathsWithUrl) : ['error' => 'Something went wrong'],
    //     ]);
    // }
    public function runPythonScript($filePath)
    {
        $scriptPath = storage_path('python/enm_script_generator.py ' . $filePath);
        $venvActivatePath = storage_path('python/venv/bin/activate'); // For macOS/Linux

        $pythonPath = storage_path('python/venv/bin/python');
        $command = "$pythonPath $scriptPath";
        $output = shell_exec($command);
        $filePaths = json_decode($output, true);
        $filePathsWithUrl = [];
        if (is_array($filePaths)) {
            foreach ($filePaths['filePaths'] as $value) {
                $filePathsWithUrl[] = url('/') . '/' . $value;
            }
        }
        return response()->json([
            'output' => $filePaths ? array('filePaths' => $filePathsWithUrl) : ['error' => 'Something went wrong'],
        ]);
    }
}
