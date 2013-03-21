import sys
import os
import shutil
import json
import subprocess

from distutils import dir_util

if len(sys.argv) == 1:
    sys.exit('Usage: %s [path to manifest.json]' % sys.argv[0])

path = sys.argv[1]
manifest_orig = path + '/manifest.json'; 
 
if not os.path.exists(manifest_orig):
    sys.exit('Error: manifest file "%s" not exists.' % manifest_orig)

deploy_path = '.deploy'
dir_util.copy_tree(path, deploy_path, preserve_mode=0, preserve_times=0)

manifest_path = deploy_path + '/manifest.json'; 
manifest_raw = open(manifest_path, encoding='utf-8').read()
manifest = json.loads(manifest_raw)

i = 1
for content_scripts_part in manifest['content_scripts']:
    merged_js_path = 'scripts/merged-' + str(++i) + '.js';
    with open(deploy_path + '/' + merged_js_path, encoding='utf-8', mode='w+') as merged_js:
        scripts = content_scripts_part['js']
        content_scripts_part['js'] = []
        for script in scripts:
            if not ('3rd-party' in script):
                script_path = deploy_path + '/' + script;
                merged_js.write(open(script_path, encoding='utf-8').read() + '\r\n')
                os.unlink(script_path)
            else:
                content_scripts_part['js'].append(script)
        merged_js.close()
        merged_js_full_path = deploy_path + '/' + merged_js_path
        content_scripts_part['js'].append(merged_js_path)

with open(deploy_path + '/manifest.json', encoding='utf-8', mode='w+') as manifest_merged:
    json.dump(manifest, manifest_merged)
