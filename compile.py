import json
import os
from pathlib import Path
import textwrap

SOURCE_DIR = Path("src/data/categories")
OUTPUT_DIR = Path("src/generated")


#each unit file
UNIT_TEMPLATE = """{unitName}: {{
    singular: '{singular}',
    plural: '{plural}',
    toBase: '{toBase}',
    fromBase: '{fromBase}',{additionalFields}
}}"""

def include_field(key, value):
    return f"\n    {key}: '{value}',"

def compile_unit(unit_json):
    optional_fields = ["abbr"]

    additionalFields = ""
    for field in optional_fields:
        if field in unit_json:
            additionalFields = f"{additionalFields}{include_field(field, unit_json[field])}"

    return UNIT_TEMPLATE.format(
        **unit_json,
        additionalFields=additionalFields
    )


#groups of units
GROUP_TEMPLATE = """{{
    label: '{label}',
    units: {{
{units}
    }}
}}"""

def compile_group(group_json, unit_list):
    concatenated_units = ",\n".join(unit_list)
    indented_units = textwrap.indent(concatenated_units, ' '*8)
    return GROUP_TEMPLATE.format(
        **group_json,
        units=indented_units
    )


#categories
CAT_TEMPLATE = """import type {{ CategoryData }} from "../data/constants.ts";

export const {catName}: CategoryData = {{
    label: '{label}',
    initialUnits: {{
        from: '{initialFromUnitName}', 
        to: '{initialToUnitName}'
    }},
    unitGroups: [
{unitGroups}
    ]
}};"""

def compile_cat(cat_json, group_list):
    concatenated_groups = ",\n".join(group_list)
    indented_groups = textwrap.indent(concatenated_groups, ' '*8)
    return CAT_TEMPLATE.format(
        **cat_json,
        unitGroups=indented_groups
    )



#write
def write_ts_file(output_dir, cat_json, content):
    cat_name = cat_json["catName"]
    file_name = f"{cat_name}.ts"
    file_path = output_dir / file_name

    try:
        with open(file_path, "w", encoding="utf-8") as f:
            f.write(content)
        print(f"Successfully wrote: {file_path}")
    except IOError as e:
        print(f"Failed to write to {file_path}: {e}")



def validate_get_info(dir):
    """
    Checks for info.json in the directory.
    Returns parsed data if successful, otherwise None
    """
    info_file = dir / "info.json"
    if not info_file.exists():
        return None
    
    with open(info_file, "r") as f:
        try:
            return json.load(f)
        except:
            return None
    
def compile():
    OUTPUT_DIR.mkdir(parents=True, exist_ok=True)

    #categories
    for cat_dir in SOURCE_DIR.iterdir():

        if not cat_dir.is_dir():
            continue

        cat_json = validate_get_info(cat_dir)
        if not cat_json:
            print(f"Skipping {cat_dir.name}, missing info.json")
            continue

        #unitGroups
        group_list = []
        for group_dir in cat_dir.iterdir():
            if not group_dir.is_dir():
                continue

            group_json = validate_get_info(group_dir)
            if not group_json:
                print(f"Skipping {group_dir.name}, missing info.json")
                continue

            #unit
            unit_list = []
            unit_files = (f for f in group_dir.glob("*.json") if f.name != "info.json") #skip info file
            for unit_file in unit_files:
                
                with open(unit_file, "r") as uf:
                    try:
                        unit_json = json.load(uf)

                        compiled_unit = compile_unit(unit_json)
                        unit_list.append(compiled_unit)
                    except json.JSONDecodeError:
                        print(f"Error: {unit_file.name} is not valid JSON.")
                    except KeyError as e:
                        print(f"Error: {unit_file.name} is missing the required field: {e}")

            try:
                compiled_group = compile_group(group_json, unit_list)

                priority = group_json.get("priority", 100)
                group_list.append((priority, compiled_group))
            except KeyError as e:
                print(f"Error: {group_dir.name} is missing a required field: {e}")

        try:
            group_list.sort(key=lambda x: x[0])
            sorted_group_list = [item[1] for item in group_list]
            compiled_cat = compile_cat(cat_json, sorted_group_list)
        except KeyError as e:
            print(f"Error: {cat_dir.name} is missing a required field: {e}")


        write_ts_file(OUTPUT_DIR, cat_json, compiled_cat)
        
compile()
