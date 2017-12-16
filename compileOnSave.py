# standard lib
import sys
import time
import os
import shutil
import logging
import subprocess
from pathlib import Path
# externals
from watchdog.observers import Observer
from watchdog.events import FileSystemEventHandler

modulename = 'pagedList'

def copyJs():
    try:
        mainDir = os.path.dirname(os.path.realpath(__file__))
        
        print("Copy pagedList.js to docs/example/static/js")
        shutil.copy(os.path.join(mainDir, "python", "__javascript__", "pagedList.js"), os.path.join(str(mainDir), "docs", "example", 'static', 'js'))
        shutil.copy(os.path.join(mainDir, "python", "__javascript__", "pagedList.min.js"), os.path.join(str(mainDir), "docs", "example", 'static', 'js'))

    except:
        print("Copy failed")

class CompileEventHandler(FileSystemEventHandler):
    def __init__(self):
        self.lastTime = time.time()
        self.timespan = 2.0 # minimum time [s] needed between filesystem events, to trigger compilation

    def on_any_event(self, event):
        if time.time() > self.lastTime + self.timespan:
            os.system('cls') # clear screen
            print("Compiling")
            # note: gets automatically called from current virtual environment:
            if True:
                r = subprocess.Popen(args=f"transcrypt python/{modulename}.py", stdout=subprocess.PIPE)
            else:
                r = subprocess.Popen(args=f"transcrypt -n python/{modulename}.py", stdout=subprocess.PIPE)
            r.wait()
            returncode = r.returncode
            #returncode = os.system(f'transcrypt -n python/{modulename}.py')
            if returncode == 0:
                print("Success")
                copyJs()
            else:
                for line in r.stdout:
                    print("".join(line.decode("utf-8").split("\n")))
            self.lastTime = time.time()


if __name__ == "__main__":
    path = os.path.join('.', 'python')
    event_handler = CompileEventHandler()
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False) # TODO: exclude __javascript__ folder for watching changes
    observer.start()
    print("Listening for file-system events")
    try:
        while True:
            time.sleep(1)
        observer.stop()
    except KeyboardInterrupt:
        observer.stop()
    observer.join()


    
   


    
    
