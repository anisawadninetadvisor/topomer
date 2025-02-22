ionic cordova plugin rm $(ionic cordova plugin ls --json | jq -r '.[] | .id')
