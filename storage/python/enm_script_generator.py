import pandas as pd
import os
import sys
import json

import warnings
warnings.filterwarnings("ignore")
_ = os.system('cls')
version = "v1"

def write_file_header(file):
    file.write("##### FILE HEADER" + "\n")
    file.write("$datetime = `date +%y%m%d%H%M`" + "\n")
    file.write("$central_log = ~/nodes_to_check_$datetime" + "\n")
    file.write("$central_log_OK = ~/nodes_OK_$datetime" + "\n")
    file.write("$error_cnt = 0" + "\n")
    file.write(fr"l+ ~/{eNB}_$datetime" + "\n")
    file.write(fr"gs+" + "\n")
    file.write(fr"confbl+" + "\n")
    file.write(fr"lt all" + "\n")
    file.write("#CV packup PRE" + "\n")
    file.write(fr"cvms {eNB}_PRE_Retunes_$datetime" + "\n")
    file.write(fr"# Prechecks" + "\n")
    file.write(fr"ue print –admitted" + "\n")
    file.write(fr"alt" + "\n")
    file.write(fr"$alarm_pre = $nr_of_alarms" + "\n")
    file.write(fr"st EutranCellTDD=" + "\n")
    file.write(fr"hget . earfcn|channelBandwidth" + "\n")
    file.write(fr"pr EutranFrequency =" + "\n")
    file.write(fr"pr EUtranFreqRelation =" + "\n")
    file.write(fr"pr EUtranCellRelation =" + "\n")
    file.write(fr"# Disable duct detection feature" + "\n")
    file.write(fr"set EUtranCellTDD=.* ductIntOpMode 0" + "\n")
    file.write(fr"set ENodeBFunction=1 ductIntFlexibleDetectionEnabled false" + "\n")
    file.write("\n")


def write_file_footer(file):
    file.write("##### FILE FOOTER" + "\n")
    file.write(fr"# Enable duct detection feature" + "\n")
    file.write(fr"set EUtranCellTDD=.* ductIntOpMode 2" + "\n")
    file.write(fr"set ENodeBFunction=1 ductIntFlexibleDetectionEnabled true" + "\n" + "\n")
    file.write(fr"# Post checks" + "\n")
    file.write(fr"st EutranCellTDD =" + "\n")
    file.write(fr"pr EutranFrequency =" + "\n")
    file.write(fr"pr EUtranFreqRelation =" + "\n")
    file.write(fr"pr EUtranCellRelation =" + "\n")
    file.write(fr"ue print –admitted" + "\n")
    file.write(fr"hget . earfcn|channelBandwidth" + "\n")
    file.write("#CV packup POST" + "\n")
    file.write(fr"cvms {eNB}_POST_Retunes_$datetime" + "\n")
    file.write(fr"alt" + "\n")
    file.write(fr"$alarms_post = $nr_of_alarms" + "\n")

    file.write(fr"if $alarm_pre != $alarms_post" + "\n")
    file.write(fr'    l echo "$nodename alarm count mismatch" >> $central_log' + "\n")
    file.write(fr"    $error_cnt = $error_cnt + 1" + "\n")
    file.write(fr"fi" + "\n")
    file.write(fr"if $error_cnt = 0" + "\n")
    file.write(fr'    l echo "$nodename completed without errors" >> $central_log_OK' + "\n")
    file.write(fr"fi" + "\n")
    file.write(fr"gs-" + "\n")
    file.write(fr"confbl-" + "\n")
    file.write(fr"l-" + "\n")
    file.write("\n")


def write_freq_tuning(row):
    earfcn = parameters.loc[parameters['Freq name'] == row['New Frequency']]['earfcn'].tolist()[0]
    channelBandwidth = parameters.loc[parameters['Freq name'] == row['New Frequency']]['channelBandwidth'].tolist()[0]
    cellCapMaxCellSubCap = parameters.loc[parameters['Freq name'] == row['New Frequency']]['cellCapMaxCellSubCap'].tolist()[0]
    cellCapMinCellSubCap = parameters.loc[parameters['Freq name'] == row['New Frequency']]['cellCapMinCellSubCap'].tolist()[0]
    cellSubscriptionCapacity = parameters.loc[parameters['Freq name'] == row['New Frequency']]['cellSubscriptionCapacity'].tolist()[0]
    caFreqProportion = parameters.loc[parameters['Freq name'] == row['New Frequency']]['caFreqProportion'].tolist()[0]
    ductIntFlexibleDetectionOffset = parameters.loc[parameters['Freq name'] == row['New Frequency']]['ductIntFlexibleDetectionOffset'].tolist()[0]

    f.write(fr"##### change cell {row['EutranCellTddId']} earfcn" + "\n")
    f.write(fr"acc EUtranCellTDD={row['EutranCellTddId']} changeFrequency" + "\n")
    f.write(fr"{earfcn}" + "\n")
    f.write(fr"wait 2" + "\n")
    f.write(fr"lset ENodeBFunction=1,EUtranCellTDD={row['EutranCellTddId']}$ channelBandwidth {channelBandwidth}" + "\n")
    f.write(fr"lset ENodeBFunction=1,EUtranCellTDD={row['EutranCellTddId']}$ cellCapMaxCellSubCap {cellCapMaxCellSubCap}" + "\n")
    f.write(fr"lset ENodeBFunction=1,EUtranCellTDD={row['EutranCellTddId']}$ cellCapMinCellSubCap {cellCapMinCellSubCap}" + "\n")
    f.write(fr"lset ENodeBFunction=1,EUtranCellTDD={row['EutranCellTddId']}$ cellSubscriptionCapacity {cellSubscriptionCapacity}" + "\n")
    f.write(fr"lt EUtranFreqRelation =" + "\n")
    f.write(fr"lset ENodeBFunction=1,EUtranCellTDD={row['EutranCellTddId']},EUtranFreqRelation={earfcn}$ {caFreqProportion}" + "\n")
    f.write(fr"set EUtranCellTDD={row['EutranCellTddId']} ductIntFlexibleDetectionOffset {ductIntFlexibleDetectionOffset}" + "\n")
    f.write("\n")



def do_relation_check(file):
    file.write(fr"##### Handle F2-F3b issues" + "\n")
    file.write(fr"## For all F1 Cells, block F3 (ULCA pref)" + "\n")
    file.write(fr"## For all F2 Cells, block F3" + "\n")
    file.write(fr"## For all F3 Cells, block F2" + "\n")
    file.write(fr"## For all other cells:" + "\n")
    file.write(fr"##     If NumberOfRelF2 > NumberOfRelF3" + "\n")
    file.write(fr"##         BlockF2thatCell" + "\n" + "\n")
    file.write(fr"$F1 = 38770" + "\n")
    file.write(fr"$F2 = 38968" + "\n")
    file.write(fr"$F3 = 39166" + "\n")
    file.write(fr"$F4 = 39364" + "\n")
    file.write(fr"$F5 = 39527" + "\n")
    file.write(fr"$F3b = 39154" + "\n")
    file.write(fr"$F4b = 39352" + "\n")
    file.write(fr"$F5b = 39550" + "\n")
    file.write(fr"$F5ab = 39523" + "\n")
    file.write(fr"$4418DLFreqUpper = 2395000" + "\n")
    file.write(fr"$8863DLFreqUpper = 2400000" + "\n")
    file.write(fr"lt all" + "\n" + "\n")

    file.write(fr"ma F1_Cells EUtranCellTDD earfcn $F1" + "\n")
    file.write(fr"ma F2_Cells EUtranCellTDD earfcn $F2" + "\n")
    file.write(fr"ma F3_Cells EUtranCellTDD earfcn $F3b" + "\n" + "\n")

    file.write(fr"# !CHECK" + "\n")
    file.write(fr"# Loop to find F3b relations" + "\n")
    file.write(fr"for $cell in F1_Cells" + "\n")
    file.write(fr"    $cellrdn = rdn($cell)" + "\n")
    file.write(fr"    lhget $cellrdn eUtranFreqRelationId $F3b" + "\n")
    file.write(fr"    # Group of frequency F3b FrequencyRelations under an F1 Cell" + "\n")
    file.write(fr"    ma Freq_rels_disable hget_group" + "\n")
    file.write(fr"done" + "\n" + "\n")

    file.write(fr"# Loop to find F3b relations" + "\n")
    file.write(fr"for $cell in F2_Cells" + "\n")
    file.write(fr"    $cellrdn = rdn($cell)" + "\n")
    file.write(fr"    lhget $cellrdn eUtranFreqRelationId $F3b" + "\n")
    file.write(fr"    # Group of frequency F3b FrequencyRelations under an F2 Cell" + "\n")
    file.write(fr"    ma Freq_rels_disable hget_group" + "\n")
    file.write(fr"done" + "\n" + "\n")

    file.write(fr"# Loop to find F2 relations" + "\n")
    file.write(fr"for $cell in F3_Cells" + "\n")
    file.write(fr"    $cellrdn = rdn($cell)" + "\n")
    file.write(fr"    lhget $cellrdn eUtranFreqRelationId $F2" + "\n")
    file.write(fr"    # Group of frequency F2 FrequencyRelations under an F3b Cell" + "\n")
    file.write(fr"    ma Freq_rels_disable hget_group" + "\n")
    file.write(fr"done" + "\n" + "\n")

    file.write(fr"# All other cells" + "\n")
    file.write(fr"ma Non_F1F2F3_Cells EUtranCellTDD earfcn !($F1 | $F2 | $F3b)" + "\n")
    file.write(fr"for $cell in Non_F1F2F3_Cells" + "\n" + "\n")

    file.write(fr"    # Clear Groups" + "\n")
    file.write(fr"    mr F2_Freq_Rels" + "\n")
    file.write(fr"    mr F3b_Freq_Rels" + "\n" + "\n")

    file.write(fr"    $cellrdn = rdn($cell)" + "\n" + "\n")

    file.write(fr"    # Count and group of F2 relations from this cell" + "\n")
    file.write(fr"    lhget $cellrdn eUtranFreqRelationId $F2" + "\n")
    file.write(fr"    $cellRelCount = $nr_of_mos" + "\n")
    file.write(fr"    ma F2_Freq_Rels hget_group" + "\n" + "\n")

    file.write(fr"    # Count of F3b relations from this cell" + "\n")
    file.write(fr"    lhget $cellrdn eUtranFreqRelationId $F3b" + "\n")
    file.write(fr"    $cellRelCount = $cellRelCount + $nr_of_mos" + "\n" + "\n")

    file.write(fr"    # If there are both F2 and F3b rels, then block some" + "\n")
    file.write(fr"    if $cellRelCount = 2" + "\n")
    file.write(fr"        ma Freq_rels_disable F2_Freq_Rels" + "\n")
    file.write(fr"    fi" + "\n" + "\n")

    file.write(fr"done" + "\n" + "\n")

    file.write(fr"# Disable SCells for chosen freq relations" + "\n")
    file.write(fr"for $freqrel in Freq_rels_disable" + "\n")
    file.write(fr"    $freqldn = ldn($freqrel)" + "\n")
    file.write(fr"    lset $freqldn sCellCandidate 0" + "\n")
    file.write(fr"done" + "\n" + "\n")


freq_with_15mhz = ['F5', 'F5ab', 'Wa10a', 'Wa11a', 'Wa12a', 'Wa13a', 'Wa9a']
B40_list = ['F1',	'Geraldton-F1',	'F2',	'Geraldton-F2',	'F3',	'Geraldton-F3',	'F3b',	'F4',	'Geraldton-F4',	'F4b',	'F5',	'F5b',	'F5ab']

if len(sys.argv) != 2:
    print("Usage: python freq_tuning_script.py <input_excel_file>")
    sys.exit(1)
    
input_excel_file = sys.argv[1]
try:
    freq_tuning_input = pd.read_excel(input_excel_file, sheet_name='input')
    parameters = pd.read_excel(input_excel_file, sheet_name='parameters')
except Exception as e:
    print(f"Error reading Excel file: {e}")
    sys.exit(1)
filePath=[]
for eNB in freq_tuning_input['eNB'].sort_values().unique().tolist():
    f = open(str(eNB) + fr"_freq_tuning_script_{version}.mos", "w")
    write_file_header(f)
    freq_tuning_input.loc[freq_tuning_input['eNB'] == eNB].apply(write_freq_tuning, axis=1)
    for freq in freq_tuning_input.loc[freq_tuning_input['eNB'] == eNB]['New Frequency'].unique().tolist():
        if freq in B40_list:
            do_relation_check(f)
            break
    write_file_footer(f)
    filePath.append(str(eNB) + fr"_freq_tuning_script_{version}.mos")

print(json.dumps({"filePaths": filePath}))
