#!/usr/bin/python
import os
import sys
import json
import getpass
import tempfile
import subprocess
import aesjsonfile

def editfile(fn, password):
    db = aesjsonfile.load(fn, password)
    f = tempfile.NamedTemporaryFile()
    json.dump(db, f, indent=2)
    f.flush()
    while True:
        subprocess.call([os.getenv("EDITOR") or "vi", f.name])
        try:
            f.seek(0)
            db = json.load(f)
            f.close()
            aesjsonfile.dump(fn, db, password)
            return
        except Exception, e:
            print "Error in json"
            print e
            print "Try again (y/n)? ",
            input = sys.stdin.readline()
            if not input.lower().startswith("y"):
                return

if __name__ == "__main__":
    if len(sys.argv) < 2:
        sys.exit(1)
    fn = sys.argv[1]
    password = getpass.getpass()
    editfile(fn, password)
