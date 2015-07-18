from __future__ import print_function
from sys import argv
import subprocess as sp
import os
import json 

success = lambda: print("Success")
running = lambda n, submitted: print("Running exercise {}.\nReceived value {}".format(n, submitted))
failed = lambda exp: print("Failed: Expected {}".format(exp))
EXERCISES = 7 #Number of exercises
DEVNULL = open(os.devnull, 'w')

#List of exercises
exercises = map(int,argv[1:]) if len(argv) > 1 else range(1, EXERCISES+1)
#Converts array to string with comma delimited elements
# and without the '[', ']'
# Convenient for node to parse into an array 
toStr = lambda arr: str(arr)[1:-1]

def test(n, args):
    """
    n:- test number
    args:- arguments to be passed in
    """
    submitted = sp.Popen(["node", "./ex{}.js".format(i)] + args, stdout=DEVNULL, stderr=DEVNULL).communicate()[0]
    solution = sp.Popen(["node",  "./sol{}.js".format(i)] + args, stdout=sp.PIPE).communicate()[0]

    running(i, submitted)
    if submitted != solution:
        failed(solution)
    else:
        success()

def run(n, args):
    solution = sp.Popen(["node",  "./sol{}.js".format(i)] + args, stdout=sp.PIPE).communicate()[0]
    print(solution)

for i in exercises:
    if i == 1:
        test(1, [])  
    elif i == 2:
        test(2, [])
    elif i == 3:
        test(3, [])
    elif i == 4:
        test(4, [])
    elif i == 5:
        test(5, [])
    elif i == 6:
        test(6, [])
    elif i == 7:
        run(7, [json.dumps(['a','b','c','a','d','a']), json.dumps(['a','d','a'])])

