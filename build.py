
def main():
    import os
    import shutil
    from pathlib import Path
    mainDir = os.path.dirname(os.path.realpath(__file__))
    print("Copy pagedList.js to docs\example\static\js")
    shutil.copy(os.path.join(mainDir, 'python', '__target__', 'bundle', 'pagedList.js'), os.path.join(mainDir, 'docs','example','static', 'js', 'pagedList.js'))
    shutil.copy(os.path.join(mainDir, 'python', '__target__', 'bundle', 'pagedList.js.map'), os.path.join(mainDir, 'docs','example','static', 'js', 'pagedList.js.map'))
    
try:
    main()
except Exception as e:
    print("Something went wrong...")
    print(e)
    input()