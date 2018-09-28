import logging
import os
import shutil
import subprocess
import sys
import time
from pathlib import Path

from watchdog.events import FileSystemEventHandler
from watchdog.observers import Observer

moduleName = 'pagedList'

def executeFile(filename):
    try:
        p = subprocess.Popen(args="cmd.exe /k", stdin=subprocess.PIPE, stderr=None)
        command = f'call "{filename}"\n'
        p.stdin.write(command.encode('utf-8'))
        stdout_data, stderr_data = p.communicate(timeout=10)
        print(stdout_data)
        p.stdin.close()
        p.wait(timeout=3)
    except Exception as e:
        print("Something went wrong")
        print(e)

class CompileEventHandler(FileSystemEventHandler):
    def __init__(self):
        self.timespan = 2.0 # minimum time needed between filesystem events, to trigger compilation
        self.lastTime = time.time() - self.timespan * 2.0

    def on_any_event(self, event):
        if time.time() > self.lastTime + self.timespan:
            os.system('cls') # clear screen
            print(f"Compiling (at {time.strftime('%H:%M:%S', time.localtime(time.time()))})")
            # note: gets automatically called from current virtual environment:
            args = ''
            r = subprocess.Popen(args=f"transcrypt --build --nomin --map python/{moduleName}", stdout=subprocess.PIPE)
            r.wait()
            returncode = r.returncode
            if returncode == 0:
                print("Success")
                executeFile("5 webpack bundle.bat")
                executeFile("5b build.bat")
            else:
                for line in r.stdout:
                    print("".join(line.decode("utf-8").split("\n")))
            self.lastTime = time.time()


if __name__ == "__main__":
    path = os.path.join('.', 'python')
    event_handler = CompileEventHandler()
    # fire directly:
    event_handler.on_any_event(None)
    
    observer = Observer()
    observer.schedule(event_handler, path, recursive=False) # todo: make sure __target__ folder is not watched
    observer.start()
    print("Listening for file-system events")
    try:
        while True:
            time.sleep(1)
        observer.stop()
    except KeyboardInterrupt:
        observer.stop()
    observer.join()
