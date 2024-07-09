<?php


namespace App\Services;

use PhpOffice\PhpSpreadsheet\Spreadsheet;
use PhpOffice\PhpSpreadsheet\IOFactory;

class FreqTuningService
{

    public function generateScript($file)
    {
        $version = 'v1';
        $inputFile = $file;
        $fileNames = [];
        $inputExcel = IOFactory::load($inputFile);
        $inputSheet = $inputExcel->getSheetByName('input');
        $paramsSheet = $inputExcel->getSheetByName('parameters');

        // Process input data
        $freqTuningInput = $inputSheet->toArray(null, true, true, true);
        $parameters = $paramsSheet->toArray(null, true, true, true);
        $eNBs = array_unique(array_column($freqTuningInput, 'B'));
        array_shift($eNBs);
        foreach ($eNBs as $eNB) {
            if (!$eNB) continue; // Skip empty eNBs

            $filePath = storage_path("app/public/generator/{$eNB}_freq_tuning_script_$version.mos");
            $file = fopen($filePath, 'w');
            $this->writeFileHeader($file, $eNB);

            // Write frequency tuning details
            foreach ($freqTuningInput as $row) {
                if ($row['B'] == $eNB) {
                    $this->writeFreqTuning($file, $row ,$parameters);
                }
            }

            foreach ($freqTuningInput as $freq)
            {
                if($freq['B'] == $eNB && in_array($freq['E'],$this->B40_list()))
                {
                    $this->doRelationCheck($file);
                    break;
                }
            }
            $this->writeFileFooter($file, $eNB);
            fclose($file);
            $fileNames[] = ('/storage/generator/'.basename($filePath));
        }
        return response()->json(['filePaths' => $fileNames]);
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
        fwrite($file, 'cvms '.$eNB.'_PRE_Retunes_$datetime' . "\n");
        fwrite($file, "# Prechecks" . "\n");
        fwrite($file, "ue print –admitted" . "\n");
        fwrite($file, "alt" . "\n");
        fwrite($file, '$alarm_pre = $nr_of_alarms' . "\n");
        fwrite($file, "st EutranCellTDD=" . "\n");
        fwrite($file, "hget . earfcn|channelBandwidth" . "\n");
        fwrite($file, "pr EutranFrequency = " . "\n");
        fwrite($file, "pr EUtranFreqRelation=" . "\n");
        fwrite($file, "pr EUtranCellRelation = " . "\n");
        fwrite($file, "# Disable duct detection feature" . "\n");
        fwrite($file, "set EUtranCellTDD=.* ductIntOpMode 0" . "\n");
        fwrite($file, "set ENodeBFunction=1 ductIntFlexibleDetectionEnabled false" . "\n");
    }

    private function writeFileFooter($file, $eNB)
    {
        fwrite($file, "##### FILE FOOTER" . "\n");
        fwrite($file, "# Enable duct detection feature" . "\n");
        fwrite($file, "set EUtranCellTDD=.* ductIntOpMode 2" . "\n");
        fwrite($file, "set ENodeBFunction=1 ductIntFlexibleDetectionEnabled true" . "\n");
        fwrite($file, "# Post checks" . "\n");
        fwrite($file, "st EutranCellTDD =" . "\n");
        fwrite($file, "pr EutranFrequency = " . "\n");
        fwrite($file, "pr EUtranFreqRelation = " . "\n");
        fwrite($file, "pr EUtranCellRelation =" . "\n");
        fwrite($file, "ue print –admitted" . "\n");
        fwrite($file, "hget . earfcn|channelBandwidth" . "\n");
        fwrite($file, "#CV packup POST" . "\n");
        fwrite($file, "cvms $eNB"."_POST_Retunes_\$datetime" . "\n");
        fwrite($file, "alt" . "\n");
        fwrite($file, "\$alarms_post = \$nr_of_alarms" . "\n");

        fwrite($file, "if \$alarm_pre != \$alarms_post" . "\n");
        fwrite($file,'    l echo "$nodename alarm count mismatch" >> $central_log' . "\n");
        fwrite($file, "    \$error_cnt = \$error_cnt + 1" . "\n");
        fwrite($file, "fi" . "\n");
        fwrite($file, "if \$error_cnt = 0" . "\n");
        fwrite($file,'    l echo "$nodename completed without errors" >> $central_log_OK' . "\n");
        fwrite($file, "fi" . "\n");
        fwrite($file, "gs-" . "\n");
        fwrite($file, "confbl-" . "\n");
        fwrite($file, "l-" . "\n");
        fwrite($file, "\n");
    }

    private function writeFreqTuning($file, $row ,$parameters)
    {
        $earfcn = [];
        $channelBandwidth = [];
        $cellCapMaxCellSubCap = [];
        $cellCapMinCellSubCap = [];
        $cellSubscriptionCapacity = [];
        $caFreqProportion = [];
        $ductIntFlexibleDetectionOffset = [];
        foreach ($parameters as $item)
        {
            if($item['A'] == $row['E'])
            {
                $earfcn[] = $item['B'];
                $channelBandwidth[] = $item['D'];
                $cellCapMaxCellSubCap[] = $item['E'];
                $cellCapMinCellSubCap[] = $item['F'];
                $cellSubscriptionCapacity[] = $item['G'];
                $caFreqProportion[] = $item['H'];
                $ductIntFlexibleDetectionOffset[] = $item['C'];
            }
        }

        if(count($earfcn) != 0)
        {
            fwrite($file,"##### change cell " .$row['C']." earfcn " . "\n");
            fwrite($file,"acc EUtranCellTDD=" .$row['C']." changeFrequency" . "\n");
            fwrite($file,$earfcn[0] ."\n");
            fwrite($file,"wait 2" . "\n");
            fwrite($file,"lset ENodeBFunction=1,EUtranCellTDD=".$row['C']."$ channelBandwidth ".$channelBandwidth[0]. "\n");
            fwrite($file,"lset ENodeBFunction=1,EUtranCellTDD=".$row['C']."$ cellCapMaxCellSubCap ". $cellCapMaxCellSubCap[0]."\n");
            fwrite($file,"lset ENodeBFunction=1,EUtranCellTDD=".$row['C']."$ cellCapMinCellSubCap ".$cellCapMinCellSubCap[0]."\n");
            fwrite($file,"lset ENodeBFunction=1,EUtranCellTDD=".$row['C']."$ cellSubscriptionCapacity ".$cellSubscriptionCapacity[0]."\n");
            fwrite($file,"lt EUtranFreqRelation =" . "\n");
            fwrite($file,"lset ENodeBFunction=1,EUtranCellTDD=".$row['C'].",EUtranFreqRelation=".$earfcn[0]."$ ".$caFreqProportion[0]." \n");
            fwrite($file,"set EUtranCellTDD=".$row['C']." ductIntFlexibleDetectionOffset ".$ductIntFlexibleDetectionOffset[0]. " \n");
            fwrite($file,"\n");
        }
    }

    private function doRelationCheck($file)
    {
        fwrite($file,"##### Handle F2-F3b issues" . "\n");
        fwrite($file,"## For all F1 Cells, block F3 (ULCA pref)" . "\n");
        fwrite($file,"## For all F2 Cells, block F3" . "\n");
        fwrite($file,"## For all F3 Cells, block F2" . "\n");
        fwrite($file,"## For all other cells:" . "\n");
        fwrite($file,"##     If NumberOfRelF2 > NumberOfRelF3" . "\n");
        fwrite($file,"##         BlockF2thatCell" . "\n" . "\n");
        fwrite($file,"\$F1 = 38770" . "\n");
        fwrite($file,"\$F2 = 38968" . "\n");
        fwrite($file,"\$F3 = 39166" . "\n");
        fwrite($file,"\$F4 = 39364" . "\n");
        fwrite($file,"\$F5 = 39527" . "\n");
        fwrite($file,"\$F3b = 39154" . "\n");
        fwrite($file,"\$F4b = 39352" . "\n");
        fwrite($file,"\$F5b = 39550" . "\n");
        fwrite($file,"\$F5ab = 39523" . "\n");
        fwrite($file,"$4418DLFreqUpper = 2395000" . "\n");
        fwrite($file,"$8863DLFreqUpper = 2400000" . "\n");
        fwrite($file,"lt all" . "\n" . "\n");
    
        fwrite($file,"ma F1_Cells EUtranCellTDD earfcn \$F1" . "\n");
        fwrite($file,"ma F2_Cells EUtranCellTDD earfcn \$F2" . "\n");
        fwrite($file,"ma F3_Cells EUtranCellTDD earfcn \$F3b" . "\n" . "\n");
    
        fwrite($file,"# !CHECK" . "\n");
        fwrite($file,"# Loop to find F3b relations" . "\n");
        fwrite($file,"for \$cell in F1_Cells" . "\n");
        fwrite($file,"    \$cellrdn = rdn(\$cell)" . "\n");
        fwrite($file,"    lhget \$cellrdn eUtranFreqRelationId \$F3b" . "\n");
        fwrite($file,"    # Group of frequency F3b FrequencyRelations under an F1 Cell" . "\n");
        fwrite($file,"    ma Freq_rels_disable hget_group" . "\n");
        fwrite($file,"done" . "\n" . "\n");
    
        fwrite($file,"# Loop to find F3b relations" . "\n");
        fwrite($file,"for \$cell in F2_Cells" . "\n");
        fwrite($file,"    \$cellrdn = rdn(\$cell)" . "\n");
        fwrite($file,"    lhget \$cellrdn eUtranFreqRelationId \$F3b" . "\n");
        fwrite($file,"    # Group of frequency F3b FrequencyRelations under an F2 Cell" . "\n");
        fwrite($file,"    ma Freq_rels_disable hget_group" . "\n");
        fwrite($file,"done" . "\n" . "\n");
    
        fwrite($file,"# Loop to find F2 relations" . "\n");
        fwrite($file,"for \$cell in F3_Cells" . "\n");
        fwrite($file,"    \$cellrdn = rdn(\$cell)" . "\n");
        fwrite($file,"    lhget \$cellrdn eUtranFreqRelationId \$F2" . "\n");
        fwrite($file,"    # Group of frequency F2 FrequencyRelations under an F3b Cell" . "\n");
        fwrite($file,"    ma Freq_rels_disable hget_group" . "\n");
        fwrite($file,"done" . "\n" . "\n");
    
        fwrite($file,"# All other cells" . "\n");
        fwrite($file,"ma Non_F1F2F3_Cells EUtranCellTDD earfcn !(\$F1 | \$F2 | \$F3b)" . "\n");
        fwrite($file,"for \$cell in Non_F1F2F3_Cells" . "\n" . "\n");
    
        fwrite($file,"    # Clear Groups" . "\n");
        fwrite($file,"    mr F2_Freq_Rels" . "\n");
        fwrite($file,"    mr F3b_Freq_Rels" . "\n" . "\n");
    
        fwrite($file,"    \$cellrdn = rdn(\$cell)" . "\n" . "\n");
    
        fwrite($file,"    # Count and group of F2 relations from this cell" . "\n");
        fwrite($file,"    lhget \$cellrdn eUtranFreqRelationId \$F2" . "\n");
        fwrite($file,"    \$cellRelCount = \$nr_of_mos" . "\n");
        fwrite($file,"    ma F2_Freq_Rels hget_group" . "\n" . "\n");
    
        fwrite($file,"    # Count of F3b relations from this cell" . "\n");
        fwrite($file,"    lhget \$cellrdn eUtranFreqRelationId \$F3b" . "\n");
        fwrite($file,"    \$cellRelCount = \$cellRelCount + \$nr_of_mos" . "\n" . "\n");
    
        fwrite($file,"    # If there are both F2 and F3b rels, then block some" ."\n");
        fwrite($file,"    if \$cellRelCount = 2" . "\n");
        fwrite($file,"        ma Freq_rels_disable F2_Freq_Rels" . "\n");
        fwrite($file,"    fi" . "\n" . "\n");
    
        fwrite($file,"done" . "\n" . "\n");
    
        fwrite($file,"# Disable SCells for chosen freq relations" . "\n");
        fwrite($file,"for \$freqrel in Freq_rels_disable" . "\n");
        fwrite($file,"    \$freqldn = ldn(\$freqrel)" . "\n");
        fwrite($file,"    lset \$freqldn sCellCandidate 0" . "\n");
        fwrite($file,"done" . "\n" . "\n");
    }

    private function B40_list()
    {
        return ['F1', 'Geraldton-F1', 'F2', 'Geraldton-F2', 'F3', 'Geraldton-F3', 'F3b', 'F4', 'Geraldton-F4', 'F4b', 'F5', 'F5b', 'F5ab'];
    }
}
