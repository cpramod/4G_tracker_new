<?php


namespace App\Services;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;

class FreqTuningService
{

    public function generateScript($file)
    {
        // Load input files
        // $inputFile = storage_path('app/public/1719312290_freq_tuning_input 2.xlsx');
        $inputFile = $file;
        $fileNames = [];
        $inputExcel = IOFactory::load($inputFile);
        $inputSheet = $inputExcel->getSheetByName('input');
        $paramsSheet = $inputExcel->getSheetByName('parameters');

        // Process input data
        $freqTuningInput = $inputSheet->toArray(null, true, true, true);
        $parameters = $paramsSheet->toArray(null, true, true, true);
        // Unique eNB values
        $eNBs = array_unique(array_column($freqTuningInput, 'A'));

        foreach ($eNBs as $eNB) {
            if (!$eNB) continue; // Skip empty eNBs

            $filePath = storage_path("app/generator/{$eNB}_freq_tuning_script_v2.mos");
            $file = fopen($filePath, 'w');
            $this->writeFileHeader($file, $eNB);

            // Write frequency tuning details
            foreach ($freqTuningInput as $row) {
                if ($row['A'] == $eNB) {
                    $this->writeFreqTuning($file, $row);
                }
            }

            // Check for B40 list frequencies and write relation check if needed
            $newFrequencies = array_unique(array_column(array_filter($freqTuningInput, function ($row) use ($eNB) {
                return $row['A'] == $eNB;
            }), 'B'));

            foreach ($newFrequencies as $freq) {
                if (in_array($freq, $this->B40_list())) {
                    $this->doRelationCheck($file);
                    break;
                }
            }

            $this->writeFileFooter($file);
            fclose($file);
            $fileNames[] = basename($filePath);
        }

        return response()->json(['Files' => $fileNames]);
    }

    private function writeFileHeader($file, $eNB)
    {
        fwrite($file, "##### FILE HEADER" . "\n");
        fwrite($file, '$datetime = `date +%y%m%d%H%M`' . "\n");
        fwrite($file, '$central_log = ~/nodes_to_check_$datetime' . "\n");
        fwrite($file, '$central_log_OK = ~/nodes_OK_$datetime' . "\n");
        fwrite($file, '$error_cnt = 0' . "\n");
        fwrite($file, "l+ ~/" . $eNB . '_$datetime' . "\n");
        fwrite($file, "gs+" . "\n");
        fwrite($file, "confbl+" . "\n");
        fwrite($file, "lt all" . "\n");
        fwrite($file, "#CV packup PRE" . "\n");
        fwrite($file, 'cvms PRE_Retunes_$datetime' . "\n");
        fwrite($file, "# Prechecks" . "\n");
        fwrite($file, "ue print –admitted" . "\n");
        fwrite($file, "alt" . "\n");
        fwrite($file, '$alarm_pre = $nr_of_alarms' . "\n");
        fwrite($file, "st EutranCellTDD=" . "\n");
        fwrite($file, "hget . earfcn|channelBandwidth" . "\n");
        fwrite($file, "pr EutranFrequency=" . "\n");
        fwrite($file, "pr EUtranFreqRelation=" . "\n");
        fwrite($file, "pr EUtranCellRelation=" . "\n");
        fwrite($file, "# Disable duct detection feature" . "\n");
        fwrite($file, "set EUtranCellTDD=.* ductIntOpMode 0" . "\n");
        fwrite($file, "set ENodeBFunction=1 ductIntFlexibleDetectionEnabled false" . "\n");
    }

    private function writeFileFooter($file)
    {
        fwrite($file, "##### FILE FOOTER" . "\n");
        fwrite($file, "# Enable duct detection feature" . "\n");
        fwrite($file, "set EUtranCellTDD=.* ductIntOpMode 2" . "\n");
        fwrite($file, "set ENodeBFunction=1 ductIntFlexibleDetectionEnabled true" . "\n");
        fwrite($file, "# Post checks" . "\n");
        fwrite($file, "st EutranCellTDD=" . "\n");
        fwrite($file, "pr EutranFrequency=" . "\n");
        fwrite($file, "pr EUtranFreqRelation=" . "\n");
        fwrite($file, "pr EUtranCellRelation=" . "\n");
        fwrite($file, "ue print –admitted" . "\n");
        fwrite($file, "hget . earfcn|channelBandwidth" . "\n");
        fwrite($file, "done" . "\n");
        fwrite($file, "# Disable SCells for chosen freq relations" . "\n");
        fwrite($file, 'for $freqrel in Freq_rels_disable' . "\n");
        fwrite($file, '    $freqldn = ldn($freqrel)' . "\n");
        fwrite($file, '    lset $freqldn sCellCandidate 0' . "\n");
        fwrite($file, "done" . "\n");
    }

    private function writeFreqTuning($file, $row)
    {
        // Implement the logic to write frequency tuning details to the file
        // Similar to the write_file_header and write_file_footer methods
        fwrite($file, "# Frequency Tuning Details" . "\n");
    }

    private function doRelationCheck($file)
    {
        // Implement the logic to write the relation check to the file
        fwrite($file, "# Relation Check" . "\n");
        // Add your logic for the relation check
    }

    private function B40_list()
    {
        return ['F1', 'Geraldton-F1', 'F2', 'Geraldton-F2', 'F3', 'Geraldton-F3', 'F3b', 'F4', 'Geraldton-F4', 'F4b', 'F5', 'F5b', 'F5ab'];
    }
}
